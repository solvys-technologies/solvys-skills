"use client";

import { Download, Plus, Search, ShoppingBag, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useDeferredValue, useMemo, useState } from "react";
import { Button } from "@/components/motion/button/base";
import { Table, type TableColumn } from "@/components/motion/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { buildOrders, type Order } from "./data";

const STATUS_LABELS = {
  all: "All orders",
  paid: "Paid",
  processing: "Processing",
  refunded: "Refunded",
} as const;

type StatusFilter = keyof typeof STATUS_LABELS;

function OrderStatus({ status }: { status: Order["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 font-medium text-xs capitalize",
        status === "paid"
          ? "bg-primary/10 text-foreground"
          : "bg-muted text-muted-foreground",
      )}
    >
      {status}
    </span>
  );
}

export type DataTableOperationsProps = {
  data?: Order[];
  className?: string;
};

export function DataTableOperations({
  data,
  className,
}: DataTableOperationsProps) {
  const reduce = useReducedMotion();
  const rows = useMemo(() => data ?? buildOrders(), [data]);
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
          row.customer.toLowerCase().includes(normalizedQuery) ||
          row.product.toLowerCase().includes(normalizedQuery) ||
          row.id.toLowerCase().includes(normalizedQuery)),
    );
  }, [deferredQuery, rows, status]);

  const columns = useMemo<TableColumn<Order>[]>(
    () => [
      {
        key: "id",
        header: "Order",
        sortable: true,
        width: "15%",
        cell: (row) => (
          <span className="font-medium text-muted-foreground">{row.id}</span>
        ),
      },
      {
        key: "customer",
        header: "Customer",
        sortable: true,
        width: "25%",
        cell: (row) => (
          <div className="min-w-0">
            <p className="truncate font-medium">{row.customer}</p>
            <p className="truncate text-muted-foreground text-xs">
              {row.email}
            </p>
          </div>
        ),
      },
      {
        key: "product",
        header: "Product",
        sortable: true,
        width: "22%",
        cell: (row) => (
          <div>
            <p className="truncate">{row.product}</p>
            <p className="text-muted-foreground text-xs">
              {row.items} {row.items === 1 ? "item" : "items"}
            </p>
          </div>
        ),
      },
      {
        key: "placed",
        header: "Placed",
        sortable: true,
        align: "center",
        width: "15%",
        cell: (row) => (
          <time dateTime={row.placed} className="text-muted-foreground">
            {new Intl.DateTimeFormat("en", {
              month: "short",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            }).format(new Date(row.placed))}
          </time>
        ),
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        align: "center",
        width: "13%",
        cell: (row) => <OrderStatus status={row.status} />,
      },
      {
        key: "total",
        header: "Total",
        sortable: true,
        align: "right",
        width: "12%",
        cell: (row) => (
          <span className="font-medium tabular-nums">
            ${row.total.toLocaleString()}
          </span>
        ),
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
        <header className="flex flex-col gap-6 px-2 py-5 sm:px-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-2 font-medium text-muted-foreground text-xs">
              <ShoppingBag className="size-3.5" />
              Orders
            </p>
            <h2 className="mt-3 font-semibold text-3xl text-foreground tracking-[-0.04em] sm:text-4xl">
              Recent orders
            </h2>
            <p className="mt-2 text-muted-foreground">
              Review purchases, payments, and customer details.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary">
              <Download className="size-4" />
              Export
            </Button>
            <Button variant="primary">
              <Plus className="size-4" />
              Add order
            </Button>
          </div>
        </header>

        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-background">
          <div className="flex flex-col gap-3 border-border border-b p-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex h-11 min-w-0 items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <Tabs
                value={status}
                onValueChange={(value) => setStatus(value as StatusFilter)}
                variant="pill"
                className="min-w-max shrink-0"
              >
                <TabsList className="bg-muted/65">
                  {(Object.keys(STATUS_LABELS) as StatusFilter[]).map(
                    (item) => (
                      <TabsTrigger
                        key={item}
                        value={item}
                        className="min-h-9 text-xs"
                      >
                        {STATUS_LABELS[item]}
                      </TabsTrigger>
                    ),
                  )}
                </TabsList>
              </Tabs>
              {selected.length > 0 ? (
                <div className="flex h-11 shrink-0 items-center">
                  <button
                    type="button"
                    aria-label="Clear selected orders"
                    onClick={() => setSelected([])}
                    className="inline-flex h-9 w-auto items-center justify-center gap-2 whitespace-nowrap rounded-full bg-muted px-3 font-medium text-foreground text-xs leading-none transition-colors hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {selected.length.toLocaleString()} selected
                    <X className="size-3.5 shrink-0 text-muted-foreground" />
                  </button>
                </div>
              ) : null}
            </div>
            <label className="flex min-h-11 min-w-0 items-center gap-2 rounded-xl bg-muted/65 px-3 lg:w-72">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <span className="sr-only">Search orders</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search orders"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </label>
          </div>

          <Table
            data={filteredRows}
            columns={columns}
            getRowId={(row) => row.id}
            selectable
            selectedRowIds={selected}
            onSelectionChange={setSelected}
            defaultSort={{ key: "placed", direction: "desc" }}
            rowHeight={64}
            height={448}
            className="border-0 [&_thead]:bg-muted/25"
          />

          <footer className="flex min-h-12 items-center justify-between border-border border-t px-4 text-muted-foreground text-xs">
            <span>
              Showing {filteredRows.length.toLocaleString()} of{" "}
              {rows.length.toLocaleString()} orders
            </span>
            <span className="hidden sm:inline">Updated just now</span>
          </footer>
        </div>
      </motion.div>
    </section>
  );
}
