import { notFound } from "next/navigation";
import { updateTicket } from "@/app/tickets/actions";
import { TicketForm } from "@/components/ticket-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditTicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);

  if (!Number.isInteger(id)) {
    notFound();
  }

  const [ticket, users, projects] = await Promise.all([
    prisma.ticket.findUnique({ where: { id } }),
    prisma.user.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
    prisma.project.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!ticket) {
    notFound();
  }

  const action = updateTicket.bind(null, ticket.id);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Ticket #{ticket.id}</p>
        <h1 className="text-3xl font-semibold tracking-tight">Edit ticket</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Ticket details</CardTitle>
        </CardHeader>
        <CardContent>
          <TicketForm
            action={action}
            users={users}
            projects={projects}
            defaults={ticket}
            submitLabel="Save changes"
          />
        </CardContent>
      </Card>
    </div>
  );
}
