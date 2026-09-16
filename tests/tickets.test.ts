import { describe, expect, it } from "vitest";
import {
  countTicketsByStatus,
  parseTicketId,
  ticketSchema,
  ticketStatuses,
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

  it("accepts every supported status", () => {
    for (const status of ticketStatuses) {
      expect(ticketSchema.safeParse({ ...validTicket, status }).success).toBe(
        true,
      );
    }
  });

  it("rejects unknown enum values", () => {
    expect(ticketSchema.safeParse({ ...validTicket, type: "TASK" }).success).toBe(
      false,
    );
    expect(
      ticketSchema.safeParse({ ...validTicket, status: "BLOCKED" }).success,
    ).toBe(false);
  });

  it("accepts only canonical PostgreSQL integer IDs", () => {
    expect(parseTicketId("1")).toBe(1);
    expect(parseTicketId("01")).toBeNull();
    expect(parseTicketId("1e3")).toBeNull();
    expect(parseTicketId("2147483648")).toBeNull();
  });
});
