import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  type TicketStatus,
  ticketStatuses,
  ticketStatusLabels,
} from "@/lib/tickets";

export function StatusSummary({
  counts,
}: {
  counts: Record<TicketStatus, number>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {ticketStatuses.map((status) => (
        <Card key={status}>
          <CardHeader>
            <CardDescription>{ticketStatusLabels[status]}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{counts[status]}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
