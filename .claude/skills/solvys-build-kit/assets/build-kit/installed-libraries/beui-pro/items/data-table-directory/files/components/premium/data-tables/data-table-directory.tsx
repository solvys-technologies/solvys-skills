"use client";

import { ListFilter, Plus, Search, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useDeferredValue, useMemo, useState } from "react";
import { Button } from "@/components/motion/button/base";
import { Table, type TableColumn } from "@/components/motion/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { buildTeam, type TeamMember } from "./data";

const TEAMS = [
  "All teams",
  "Design",
  "Engineering",
  "Data",
  "Product",
  "Success",
];

function PersonCell({ person }: { person: TeamMember }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted font-semibold text-[11px] text-foreground">
        {person.initials}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-medium">{person.name}</span>
        <span className="block truncate text-muted-foreground text-xs">
          {person.email}
        </span>
      </span>
    </div>
  );
}

function Presence({ status }: { status: TeamMember["status"] }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs capitalize">
      <span
        className={cn(
          "size-2 rounded-full border border-background ring-1 ring-border",
          status === "active" ? "bg-primary" : "bg-muted-foreground/45",
        )}
      />
      {status}
    </span>
  );
}

export type DataTableDirectoryProps = {
  data?: TeamMember[];
  className?: string;
};

export function DataTableDirectory({
  data,
  className,
}: DataTableDirectoryProps) {
  const reduce = useReducedMotion();
  const rows = useMemo(() => data ?? buildTeam(), [data]);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [team, setTeam] = useState("All teams");

  const filteredRows = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    return rows.filter(
      (row) =>
        (team === "All teams" || row.team === team) &&
        (!normalizedQuery ||
          row.name.toLowerCase().includes(normalizedQuery) ||
          row.email.includes(normalizedQuery) ||
          row.role.toLowerCase().includes(normalizedQuery)),
    );
  }, [deferredQuery, rows, team]);

  const columns = useMemo<TableColumn<TeamMember>[]>(
    () => [
      {
        key: "name",
        header: "Person",
        sortable: true,
        width: "31%",
        cell: (row) => <PersonCell person={row} />,
      },
      {
        key: "role",
        header: "Role",
        sortable: true,
        width: "22%",
        cell: (row) => (
          <div>
            <p>{row.role}</p>
            <p className="text-muted-foreground text-xs">{row.team}</p>
          </div>
        ),
      },
      {
        key: "location",
        header: "Location",
        sortable: true,
        width: "17%",
      },
      {
        key: "joined",
        header: "Joined",
        sortable: true,
        align: "center",
        width: "16%",
        cell: (row) => (
          <time
            dateTime={row.joined}
            className="text-muted-foreground tabular-nums"
          >
            {new Intl.DateTimeFormat("en", {
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            }).format(new Date(row.joined))}
          </time>
        ),
      },
      {
        key: "status",
        header: "Presence",
        sortable: true,
        align: "center",
        width: "14%",
        cell: (row) => <Presence status={row.status} />,
      },
    ],
    [],
  );

  return (
    <section
      className={cn("w-full bg-background px-4 py-16 sm:px-8", className)}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: reduce ? 0 : 0.6, ease: EASE_OUT }}
        className="w-full"
      >
        <header className="flex flex-col gap-7 px-2 py-5 sm:px-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-2 font-medium text-muted-foreground text-xs">
              <Users className="size-3.5" />
              People
            </p>
            <h2 className="mt-3 max-w-lg text-balance font-serif text-4xl text-foreground tracking-[-0.04em] sm:text-5xl">
              The people behind the work.
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground leading-7">
              A calm, searchable directory for a team that works across time
              zones.
            </p>
          </div>
          <Button variant="primary">
            <Plus className="size-4" />
            Invite person
          </Button>
        </header>

        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-background">
          <div className="flex flex-col gap-3 border-border border-b p-3 xl:flex-row xl:items-center xl:justify-between">
            <label className="flex min-h-11 min-w-0 items-center gap-2 rounded-xl bg-muted/65 px-3 xl:w-80">
              <Search className="size-4 text-muted-foreground" />
              <span className="sr-only">Search team directory</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find a person or role"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </label>
            <div className="flex min-w-0 items-center overflow-x-auto">
              <ListFilter className="mx-2 size-4 shrink-0 text-muted-foreground" />
              <Tabs
                value={team}
                onValueChange={setTeam}
                variant="pill"
                className="min-w-max"
              >
                <TabsList className="bg-transparent p-0">
                  {TEAMS.map((item) => (
                    <TabsTrigger
                      key={item}
                      value={item}
                      className="min-h-9 text-xs"
                    >
                      {item}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          <Table
            data={filteredRows}
            columns={columns}
            getRowId={(row) => row.id}
            defaultSort={{ key: "name", direction: "asc" }}
            rowHeight={68}
            height={476}
            className="border-0 [&_tbody_tr]:border-border/55 [&_thead]:bg-muted/25"
          />

          <footer className="flex min-h-12 items-center justify-between border-border border-t px-4 text-muted-foreground text-xs">
            <span>
              Showing {filteredRows.length.toLocaleString()} of{" "}
              {rows.length.toLocaleString()} people
            </span>
            <span className="hidden sm:inline">Updated a few seconds ago</span>
          </footer>
        </div>
      </motion.div>
    </section>
  );
}
