import Link from "next/link";
import { Plus } from "lucide-react";
import { StatusSummary } from "@/components/status-summary";
import { TicketTable } from "@/components/ticket-table";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { countTicketsByStatus } from "@/lib/tickets";

export const dynamic = "force-dynamic";

export default async function TicketsPage() {
  const tickets = await prisma.ticket.findMany({
    include: { assignee: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });
  const counts = countTicketsByStatus(tickets);

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Work items</p>
          <h1 className="text-3xl font-semibold tracking-tight">Tickets</h1>
        </div>
        <Button asChild>
          <Link href="/tickets/new">
            <Plus aria-hidden="true" />
            New ticket
          </Link>
        </Button>
      </div>
      <StatusSummary counts={counts} />
      <TicketTable tickets={tickets} />
    </div>
  );
}
