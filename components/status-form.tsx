"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type TicketStatus,
  ticketStatuses,
  ticketStatusLabels,
} from "@/lib/tickets";

export function StatusForm({
  action,
  status,
}: {
  action: (formData: FormData) => Promise<void>;
  status: TicketStatus;
}) {
  return (
    <form action={action} className="flex items-center gap-3">
      <Select name="status" defaultValue={status}>
        <SelectTrigger aria-label="Status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ticketStatuses.map((value) => (
            <SelectItem key={value} value={value}>
              {ticketStatusLabels[value]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" variant="outline">
        Update status
      </Button>
    </form>
  );
}
