import { Badge } from "@/components/ui/badge";
import {
  type TicketPriority,
  type TicketStatus,
  type TicketType,
  ticketPriorityLabels,
  ticketStatusLabels,
  ticketTypeLabels,
} from "@/lib/tickets";

export function StatusBadge({ status }: { status: TicketStatus }) {
  const variant =
    status === "OPEN" ? "default" : status === "IN_PROGRESS" ? "secondary" : "outline";

  return <Badge variant={variant}>{ticketStatusLabels[status]}</Badge>;
}

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  const variant = priority === "HIGH" ? "destructive" : "outline";

  return <Badge variant={variant}>{ticketPriorityLabels[priority]}</Badge>;
}

export function TypeBadge({ type }: { type: TicketType }) {
  return <Badge variant="secondary">{ticketTypeLabels[type]}</Badge>;
}
