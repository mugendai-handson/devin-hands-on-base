import { createTicket } from "@/app/tickets/actions";
import { TicketForm } from "@/components/ticket-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewTicketPage() {
  const [users, projects] = await Promise.all([
    prisma.user.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
    prisma.project.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);
  const setupRequired = users.length === 0 || projects.length === 0;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Tickets</p>
        <h1 className="text-3xl font-semibold tracking-tight">Create ticket</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{setupRequired ? "Setup required" : "Ticket details"}</CardTitle>
        </CardHeader>
        <CardContent>
          {setupRequired ? (
            <p className="text-sm text-muted-foreground">
              Add at least one user and project first. For the hands-on seed
              data, run npm run db:seed.
            </p>
          ) : (
            <TicketForm
              action={createTicket}
              users={users}
              projects={projects}
              submitLabel="Create ticket"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
