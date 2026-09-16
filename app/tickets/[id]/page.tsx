import Link from "next/link";
import { notFound } from "next/navigation";
import { changeTicketStatus } from "@/app/tickets/actions";
import { StatusForm } from "@/components/status-form";
import { PriorityBadge, StatusBadge, TypeBadge } from "@/components/ticket-badges";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { parseTicketId } from "@/lib/tickets";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseTicketId((await params).id);

  if (id === null) {
    notFound();
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: { assignee: true, project: true },
  });

  if (!ticket) {
    notFound();
  }

  const statusAction = changeTicketStatus.bind(null, ticket.id);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Ticket #{ticket.id}</p>
          <h1 className="text-3xl font-semibold tracking-tight">{ticket.title}</h1>
        </div>
        <Button asChild variant="outline">
          <Link href={`/tickets/${ticket.id}/edit`}>Edit ticket</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
            <TypeBadge type={ticket.type} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h2 className="font-medium">Description</h2>
              <p className="mt-2 whitespace-pre-wrap text-muted-foreground">
                {ticket.description}
              </p>
            </div>
            <Separator />
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-muted-foreground">Assignee</dt>
                <dd>{ticket.assignee.name}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Project</dt>
                <dd>{ticket.project.name}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Created</dt>
                <dd>{formatDate(ticket.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Updated</dt>
                <dd>{formatDate(ticket.updatedAt)}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change status</CardTitle>
        </CardHeader>
        <CardContent>
          <StatusForm action={statusAction} status={ticket.status} />
        </CardContent>
      </Card>
    </div>
  );
}
