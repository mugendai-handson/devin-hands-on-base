"use client";

import { useActionState } from "react";
import {
  type TicketActionState,
} from "@/app/tickets/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  type TicketPriority,
  type TicketStatus,
  type TicketType,
  ticketPriorities,
  ticketPriorityLabels,
  ticketStatuses,
  ticketStatusLabels,
  ticketTypes,
  ticketTypeLabels,
} from "@/lib/tickets";

type Option = { id: number; name: string };

type TicketDefaults = {
  title: string;
  description: string;
  type: TicketType;
  priority: TicketPriority;
  status: TicketStatus;
  assigneeId: number;
  projectId: number;
};

const initialState: TicketActionState = {};

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) {
    return null;
  }

  return <p className="text-sm text-destructive">{errors[0]}</p>;
}

export function TicketForm({
  action,
  users,
  projects,
  defaults,
  submitLabel,
}: {
  action: (
    state: TicketActionState,
    formData: FormData,
  ) => Promise<TicketActionState>;
  users: Option[];
  projects: Option[];
  defaults?: TicketDefaults;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={defaults?.title} required />
        <FieldError errors={state.errors?.title} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={defaults?.description}
          required
        />
        <FieldError errors={state.errors?.description} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            name="type"
            defaultValue={defaults?.type ?? "FEATURE"}
          >
            <SelectTrigger id="type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ticketTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {ticketTypeLabels[type]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={state.errors?.type} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            name="priority"
            defaultValue={defaults?.priority ?? "MEDIUM"}
          >
            <SelectTrigger id="priority">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ticketPriorities.map((priority) => (
                <SelectItem key={priority} value={priority}>
                  {ticketPriorityLabels[priority]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={state.errors?.priority} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            name="status"
            defaultValue={defaults?.status ?? "OPEN"}
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ticketStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {ticketStatusLabels[status]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={state.errors?.status} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="assigneeId">Assignee</Label>
          <Select
            name="assigneeId"
            defaultValue={String(defaults?.assigneeId ?? users[0]?.id)}
          >
            <SelectTrigger id="assigneeId">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={String(user.id)}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={state.errors?.assigneeId} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectId">Project</Label>
          <Select
            name="projectId"
            defaultValue={String(defaults?.projectId ?? projects[0]?.id)}
          >
            <SelectTrigger id="projectId">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={String(project.id)}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={state.errors?.projectId} />
        </div>
      </div>

      {state.message ? (
        <p className="text-sm text-destructive">{state.message}</p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
