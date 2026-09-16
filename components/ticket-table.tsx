import Link from "next/link";
import type {
  TicketPriority,
  TicketStatus,
  TicketType,
} from "@/lib/tickets";
import { PriorityBadge, StatusBadge, TypeBadge } from "@/components/ticket-badges";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type TicketRow = {
  id: number;
  title: string;
  type: TicketType;
  priority: TicketPriority;
  status: TicketStatus;
  assignee: { name: string };
};

export function TicketTable({ tickets }: { tickets: TicketRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assignee</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>#{ticket.id}</TableCell>
              <TableCell>
                <Link
                  href={`/tickets/${ticket.id}`}
                  className="font-medium hover:underline"
                >
                  {ticket.title}
                </Link>
              </TableCell>
              <TableCell>
                <TypeBadge type={ticket.type} />
              </TableCell>
              <TableCell>
                <PriorityBadge priority={ticket.priority} />
              </TableCell>
              <TableCell>
                <StatusBadge status={ticket.status} />
              </TableCell>
              <TableCell>{ticket.assignee.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
