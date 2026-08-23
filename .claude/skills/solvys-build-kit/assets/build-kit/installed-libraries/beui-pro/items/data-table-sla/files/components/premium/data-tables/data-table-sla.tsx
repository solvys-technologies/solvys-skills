"use client";

import {
  Check,
  CircleDot,
  EllipsisVertical,
  Filter,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useDeferredValue, useMemo, useState } from "react";
import {
  AnimatedBadge,
  type AnimatedBadgeStatus,
} from "@/components/motion/animated-badge";
import { Button } from "@/components/motion/button/base";
import {
  AnimatedDropdown,
  AnimatedDropdownContent,
  AnimatedDropdownItem,
  AnimatedDropdownSeparator,
  AnimatedDropdownTrigger,
} from "@/components/premium/animated-dropdown";
import {
  type DataTableColumn,
  PaginatedDataTable,
} from "@/components/premium/data-table-pagination";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import {
  buildSlaTickets,
  type SlaTicket,
  type SlaTicketPriority,
  type SlaTicketStatus,
} from "./sla-data";

const STATUS_LABELS: Record<SlaTicketStatus, string> = {
  "in-review": "In review",
  "in-progress": "In progress",
  resolved: "Resolved",
  waiting: "Waiting",
};

const PRIORITY_LABELS: Record<SlaTicketPriority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

const BADGE_STATUSES: Record<SlaTicketStatus, AnimatedBadgeStatus> = {
  "in-review": "info",
  "in-progress": "warning",
  resolved: "success",
  waiting: "neutral",
};

const BADGE_CLASSES: Record<SlaTicketStatus, string> = {
  "in-review": "border-accent/5 bg-accent/15 text-foreground",
  "in-progress": "border-warning/5 bg-warning/15 text-foreground",
  resolved: "border-success/5 bg-success/10 text-foreground",
  waiting: "border-border/20 bg-muted/70 text-muted-foreground",
};

type StatusFilter = "all" | SlaTicketStatus;

function StatusBadge({ status }: { status: SlaTicketStatus }) {
  return (
    <AnimatedBadge
      status={BADGE_STATUSES[status]}
      size="sm"
      contentKey={status}
      className={cn("rounded-md", BADGE_CLASSES[status])}
    >
      {STATUS_LABELS[status]}
    </AnimatedBadge>
  );
}

function Priority({ priority }: { priority: SlaTicketPriority }) {
  const bars = priority === "high" ? 3 : priority === "medium" ? 2 : 1;

  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span
        aria-hidden
        className="flex h-4 items-end gap-0.5 text-muted-foreground"
      >
        {[6, 10, 14].map((height, index) => (
          <span
            key={height}
            className={cn(
              "w-0.5 rounded-full bg-current",
              index >= bars && "opacity-20",
            )}
            style={{ height }}
          />
        ))}
      </span>
      {PRIORITY_LABELS[priority]}
    </span>
  );
}

function TicketActions({ ticket }: { ticket: SlaTicket }) {
  return (
    <AnimatedDropdown>
      <AnimatedDropdownTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Actions for ticket ${ticket.id}`}
          className="group size-10 rounded-none hover:bg-transparent"
        >
          <span className="grid size-7 place-items-center rounded-md transition-colors group-hover:bg-muted">
            <EllipsisVertical className="size-4" />
          </span>
        </Button>
      </AnimatedDropdownTrigger>
      <AnimatedDropdownContent
        align="end"
        side="bottom"
        sideOffset={6}
        collisionPadding={12}
        className="w-40"
      >
        <AnimatedDropdownItem>Open ticket</AnimatedDropdownItem>
        <AnimatedDropdownItem>Assign owner</AnimatedDropdownItem>
        <AnimatedDropdownItem>Change priority</AnimatedDropdownItem>
        <AnimatedDropdownSeparator />
        <AnimatedDropdownItem>Mark resolved</AnimatedDropdownItem>
      </AnimatedDropdownContent>
    </AnimatedDropdown>
  );
}

export type DataTableSlaProps = {
  data?: SlaTicket[];
  className?: string;
};

export function DataTableSla({ data, className }: DataTableSlaProps) {
  const reduce = useReducedMotion();
  const rows = useMemo(() => data ?? buildSlaTickets(), [data]);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [selected, setSelected] = useState<string[]>([]);

  const filteredRows = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    return rows.filter(
      (row) =>
        (status === "all" || row.status === status) &&
        (!normalizedQuery ||
          row.id.toLowerCase().includes(normalizedQuery) ||
          row.subject.toLowerCase().includes(normalizedQuery) ||
          row.account.toLowerCase().includes(normalizedQuery) ||
          row.owner.toLowerCase().includes(normalizedQuery)),
    );
  }, [deferredQuery, rows, status]);

  const columns = useMemo<DataTableColumn<SlaTicket>[]>(
    () => [
      {
        key: "id",
        header: "Ticket",
        sortable: true,
        width: "11%",
        cell: (row) => (
          <span className="font-medium text-muted-foreground tabular-nums">
            {row.id}
          </span>
        ),
      },
      {
        key: "subject",
        header: "Subject",
        sortable: true,
        width: "26%",
        cell: (row) => (
          <span className="truncate font-medium">{row.subject}</span>
        ),
      },
      {
        key: "account",
        header: "Account",
        sortable: true,
        width: "15%",
        cell: (row) => (
          <span className="flex min-w-0 items-center gap-2">
            <span
              aria-hidden
              className="grid size-7 shrink-0 place-items-center rounded-md bg-muted font-semibold text-[10px] text-muted-foreground"
            >
              {row.account.slice(0, 2).toUpperCase()}
            </span>
            <span className="truncate">{row.account}</span>
          </span>
        ),
      },
      {
        key: "owner",
        header: "Owner",
        sortable: true,
        width: "14%",
        cell: (row) => <span className="truncate">{row.owner}</span>,
      },
      {
        key: "priority",
        header: "Priority",
        sortable: true,
        width: "11%",
        cell: (row) => <Priority priority={row.priority} />,
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        width: "15%",
        cell: (row) => <StatusBadge status={row.status} />,
      },
      {
        key: "actions",
        header: <span className="sr-only">Actions</span>,
        align: "right",
        width: "8%",
        cell: (row) => <TicketActions ticket={row} />,
      },
    ],
    [],
  );

  return (
    <section
      className={cn("w-full bg-background px-4 py-12 sm:px-6", className)}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE_OUT }}
        className="mx-auto w-full max-w-[1500px]"
      >
        <header className="flex flex-col gap-4 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid size-9 place-items-center rounded-xl bg-muted text-muted-foreground"
            >
              <CircleDot className="size-4" />
            </span>
            <div>
              <h2 className="font-semibold text-base text-foreground tracking-tight">
                SLA monitoring
              </h2>
              <p className="mt-0.5 text-muted-foreground text-xs">
                Track ownership, response time, and resolution status.
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-2 lg:max-w-[460px]">
            <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-background px-3 transition-colors focus-within:border-ring">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <span className="sr-only">Search tickets</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search subject, ID, or owner"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </label>

            <AnimatedDropdown>
              <AnimatedDropdownTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Filter tickets"
                  className="relative size-10 shrink-0 rounded-xl"
                >
                  <Filter className="size-4" />
                  {status !== "all" ? (
                    <span className="absolute top-2 right-2 size-1.5 rounded-full bg-primary" />
                  ) : null}
                </Button>
              </AnimatedDropdownTrigger>
              <AnimatedDropdownContent
                align="end"
                side="bottom"
                sideOffset={6}
                collisionPadding={12}
                className="w-44"
              >
                {(
                  [
                    ["all", "All statuses"],
                    ...Object.entries(STATUS_LABELS),
                  ] as [StatusFilter, string][]
                ).map(([value, label]) => (
                  <AnimatedDropdownItem
                    key={value}
                    onSelect={() => setStatus(value)}
                  >
                    {label}
                    {status === value ? (
                      <Check className="ml-auto size-3.5" />
                    ) : null}
                  </AnimatedDropdownItem>
                ))}
              </AnimatedDropdownContent>
            </AnimatedDropdown>

            <AnimatedDropdown>
              <AnimatedDropdownTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Table options"
                  className="size-10 shrink-0 rounded-xl"
                >
                  <SlidersHorizontal className="size-4" />
                </Button>
              </AnimatedDropdownTrigger>
              <AnimatedDropdownContent
                align="end"
                side="bottom"
                sideOffset={6}
                collisionPadding={12}
                className="w-44"
              >
                <AnimatedDropdownItem>Customize columns</AnimatedDropdownItem>
                <AnimatedDropdownItem>Export current view</AnimatedDropdownItem>
                <AnimatedDropdownItem>Save filter</AnimatedDropdownItem>
              </AnimatedDropdownContent>
            </AnimatedDropdown>
          </div>
        </header>

        <PaginatedDataTable
          data={filteredRows}
          columns={columns}
          getRowId={(row) => row.id}
          selectable
          selectedRowIds={selected}
          onSelectionChange={setSelected}
          defaultPageSize={6}
          pageSizeOptions={[6, 10, 15]}
          rowHeight={60}
          rangeLabel={(start, end, total) =>
            `Showing ${start}–${end} of ${total} tickets`
          }
          className="overflow-visible rounded-2xl"
          tableClassName="md:[&_table]:min-w-full [&_thead]:bg-muted/65"
          emptyState="No tickets match this view"
        />
      </motion.div>
    </section>
  );
}
