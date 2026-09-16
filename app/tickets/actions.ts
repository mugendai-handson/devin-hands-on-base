"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  parseTicketFormData,
  type TicketInput,
  ticketStatuses,
} from "@/lib/tickets";

export type TicketActionState = {
  errors?: Partial<Record<keyof TicketInput, string[]>>;
  message?: string;
};

function getPrismaErrorCode(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code;
  }

  return null;
}

function databaseError(error: unknown): TicketActionState {
  console.error("Ticket operation failed:", error);

  if (getPrismaErrorCode(error) === "P2003") {
    return { message: "The selected assignee or project no longer exists." };
  }

  if (getPrismaErrorCode(error) === "P2025") {
    return { message: "This ticket no longer exists." };
  }

  return { message: "Unable to save the ticket. Please try again." };
}

export async function createTicket(
  _previousState: TicketActionState,
  formData: FormData,
): Promise<TicketActionState> {
  const result = parseTicketFormData(formData);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  let ticket;

  try {
    ticket = await prisma.ticket.create({ data: result.data });
  } catch (error) {
    return databaseError(error);
  }

  revalidatePath("/", "layout");
  redirect(`/tickets/${ticket.id}`);
}

export async function updateTicket(
  id: number,
  _previousState: TicketActionState,
  formData: FormData,
): Promise<TicketActionState> {
  const result = parseTicketFormData(formData);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    await prisma.ticket.update({ where: { id }, data: result.data });
  } catch (error) {
    return databaseError(error);
  }

  revalidatePath("/", "layout");
  redirect(`/tickets/${id}`);
}

export async function changeTicketStatus(
  id: number,
  _previousState: TicketActionState,
  formData: FormData,
): Promise<TicketActionState> {
  const result = z.enum(ticketStatuses).safeParse(formData.get("status"));

  if (!result.success) {
    return { message: "Choose a valid status." };
  }

  try {
    await prisma.ticket.update({
      where: { id },
      data: { status: result.data },
    });
  } catch (error) {
    return databaseError(error);
  }

  revalidatePath("/", "layout");
  return {};
}
