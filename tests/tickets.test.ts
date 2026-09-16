import { describe, expect, it } from "vitest";
import {
  countTicketsByStatus,
  ticketSchema,
  withTicketStatus,
} from "@/lib/tickets";

const validTicket = {
  title: "Add a useful feature",
  description: "A clear description of the requested feature.",
  type: "FEATURE",
  priority: "MEDIUM",
  status: "OPEN",
  assigneeId: 1,
  projectId: 1,
} as const;

describe("ticket business logic", () => {
  it("counts tickets by status", () => {
    const counts = countTicketsByStatus([
      { status: "OPEN" },
      { status: "OPEN" },
      { status: "IN_PROGRESS" },
      { status: "DONE" },
    ]);

    expect(counts).toEqual({ OPEN: 2, IN_PROGRESS: 1, DONE: 1 });
  });

  it("validates ticket input", () => {
    expect(ticketSchema.safeParse(validTicket).success).toBe(true);
    expect(
      ticketSchema.safeParse({ ...validTicket, title: "", priority: "URGENT" })
        .success,
    ).toBe(false);
  });

  it("allows status to change freely", () => {
    const done = withTicketStatus(validTicket, "DONE");
    const reopened = withTicketStatus(done, "OPEN");

    expect(done.status).toBe("DONE");
    expect(reopened.status).toBe("OPEN");
  });

  it("rejects unknown enum values", () => {
    expect(ticketSchema.safeParse({ ...validTicket, type: "TASK" }).success).toBe(
      false,
    );
    expect(
      ticketSchema.safeParse({ ...validTicket, status: "BLOCKED" }).success,
    ).toBe(false);
  });
});
