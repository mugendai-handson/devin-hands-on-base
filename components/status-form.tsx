"use client";

import { useActionState } from "react";
import type { TicketActionState } from "@/app/tickets/actions";
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
  action: (
    state: TicketActionState,
    formData: FormData,
  ) => Promise<TicketActionState>;
  status: TicketStatus;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-2">
      <div className="flex items-center gap-3">
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
        <Button type="submit" variant="outline" disabled={pending}>
          {pending ? "Updating..." : "Update status"}
        </Button>
      </div>
      {state.message ? (
        <p aria-live="polite" className="text-sm text-destructive">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
