import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StatusSummary } from "@/components/status-summary";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { countTicketsByStatus } from "@/lib/tickets";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const tickets = await prisma.ticket.findMany({ select: { status: true } });
  const counts = countTicketsByStatus(tickets);

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Overview</p>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/tickets">
            View tickets
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
      <StatusSummary counts={counts} />
    </div>
  );
}
