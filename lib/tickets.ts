import { z } from "zod";

export const ticketTypes = ["BUG", "FEATURE", "IMPROVEMENT"] as const;
export const ticketPriorities = ["LOW", "MEDIUM", "HIGH"] as const;
export const ticketStatuses = ["OPEN", "IN_PROGRESS", "DONE"] as const;

export type TicketType = (typeof ticketTypes)[number];
export type TicketPriority = (typeof ticketPriorities)[number];
export type TicketStatus = (typeof ticketStatuses)[number];

export const ticketTypeLabels: Record<TicketType, string> = {
  BUG: "Bug",
  FEATURE: "Feature",
  IMPROVEMENT: "Improvement",
};

export const ticketPriorityLabels: Record<TicketPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

export const ticketStatusLabels: Record<TicketStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

export const ticketSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters.").max(100),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(1000),
  type: z.enum(ticketTypes),
  priority: z.enum(ticketPriorities),
  status: z.enum(ticketStatuses),
  assigneeId: z.coerce.number().int().positive(),
  projectId: z.coerce.number().int().positive(),
});

export type TicketInput = z.infer<typeof ticketSchema>;

export function countTicketsByStatus(
  tickets: ReadonlyArray<{ status: TicketStatus }>,
) {
  return tickets.reduce<Record<TicketStatus, number>>(
    (counts, ticket) => {
      counts[ticket.status] += 1;
      return counts;
    },
    { OPEN: 0, IN_PROGRESS: 0, DONE: 0 },
  );
}

export function withTicketStatus<T extends { status: TicketStatus }>(
  ticket: T,
  status: TicketStatus,
) {
  return { ...ticket, status };
}

export function parseTicketFormData(formData: FormData) {
  return ticketSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    type: formData.get("type"),
    priority: formData.get("priority"),
    status: formData.get("status"),
    assigneeId: formData.get("assigneeId"),
    projectId: formData.get("projectId"),
  });
}
