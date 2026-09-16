"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { parseTicketFormData, ticketStatuses } from "@/lib/tickets";

export type TicketActionState = {
  errors?: Record<string, string[] | undefined>;
  message?: string;
};

export async function createTicket(
  _previousState: TicketActionState,
  formData: FormData,
): Promise<TicketActionState> {
  const result = parseTicketFormData(formData);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const ticket = await prisma.ticket.create({ data: result.data });
  revalidatePath("/");
  revalidatePath("/tickets");
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

  await prisma.ticket.update({ where: { id }, data: result.data });
  revalidatePath("/");
  revalidatePath("/tickets");
  revalidatePath(`/tickets/${id}`);
  redirect(`/tickets/${id}`);
}

export async function changeTicketStatus(id: number, formData: FormData) {
  const result = z.enum(ticketStatuses).safeParse(formData.get("status"));

  if (!result.success) {
    return;
  }

  await prisma.ticket.update({
    where: { id },
    data: { status: result.data },
  });
  revalidatePath("/");
  revalidatePath("/tickets");
  revalidatePath(`/tickets/${id}`);
}
