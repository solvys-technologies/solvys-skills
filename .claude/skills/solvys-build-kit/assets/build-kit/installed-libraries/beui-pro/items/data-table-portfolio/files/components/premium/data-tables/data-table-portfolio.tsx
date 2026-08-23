"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Plus,
  WalletCards,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { Button } from "@/components/motion/button/base";
import { Table, type TableColumn } from "@/components/motion/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { PORTFOLIO_ASSETS, type PortfolioAsset } from "./data";

function Sparkline({ values, rising }: { values: number[]; rising: boolean }) {
  const points = values
    .map(
      (value, index) => `${(index / (values.length - 1)) * 88},${52 - value}`,
    )
    .join(" ");
  return (
    <svg
      viewBox="0 0 88 28"
      className="h-7 w-[88px]"
      role="img"
      aria-label={rising ? "Rising price trend" : "Falling price trend"}
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        className={rising ? "text-foreground" : "text-muted-foreground"}
      />
    </svg>
  );
}

function Change({ value }: { value: number }) {
  const positive = value >= 0;
  const Icon = positive ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cn(
        "inline-flex items-center justify-end gap-1 font-medium tabular-nums",
        positive ? "text-foreground" : "text-muted-foreground",
      )}
    >
      <Icon className="size-3.5" />
      {Math.abs(value).toFixed(2)}%
    </span>
  );
}

const PERIODS = ["1D", "1W", "1M", "1Y"] as const;

export type DataTablePortfolioProps = {
  data?: PortfolioAsset[];
  className?: string;
};

export function DataTablePortfolio({
  data = PORTFOLIO_ASSETS,
  className,
}: DataTablePortfolioProps) {
  const reduce = useReducedMotion();
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>("1M");
  const total = useMemo(
    () => data.reduce((sum, asset) => sum + asset.value, 0),
    [data],
  );
  const dayChange = useMemo(
    () =>
      data.reduce((sum, asset) => sum + asset.value * (asset.change / 100), 0),
    [data],
  );

  const columns = useMemo<TableColumn<PortfolioAsset>[]>(
    () => [
      {
        key: "symbol",
        header: "Asset",
        sortable: true,
        width: "25%",
        cell: (row) => (
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-muted font-semibold text-[10px]">
              {row.symbol.slice(0, 2)}
            </span>
            <span className="min-w-0">
              <span className="block font-semibold">{row.symbol}</span>
              <span className="block truncate text-muted-foreground text-xs">
                {row.name}
              </span>
            </span>
          </div>
        ),
      },
      {
        key: "allocation",
        header: "Weight",
        sortable: true,
        align: "center",
        width: "14%",
        cell: (row) => (
          <span className="tabular-nums">{row.allocation.toFixed(1)}%</span>
        ),
      },
      {
        key: "trend",
        header: "Trend",
        width: "18%",
        align: "center",
        cell: (row) => (
          <span className="inline-flex justify-center">
            <Sparkline values={row.sparkline} rising={row.change >= 0} />
          </span>
        ),
      },
      {
        key: "price",
        header: "Last price",
        sortable: true,
        align: "right",
        width: "16%",
        cell: (row) => (
          <span className="tabular-nums">
            ${row.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        ),
      },
      {
        key: "change",
        header: "Change",
        sortable: true,
        align: "center",
        width: "13%",
        cell: (row) => <Change value={row.change} />,
      },
      {
        key: "value",
        header: "Market value",
        sortable: true,
        align: "right",
        width: "18%",
        cell: (row) => (
          <span className="font-medium tabular-nums">
            ${row.value.toLocaleString()}
          </span>
        ),
      },
    ],
    [],
  );

  return (
    <section
      className={cn("w-full bg-background px-4 py-14 sm:px-8", className)}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: reduce ? 0 : 0.55, ease: EASE_OUT }}
        className="w-full"
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-background">
          <header className="flex flex-col gap-6 border-border border-b p-5 sm:p-7 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="flex items-center gap-2 font-medium text-muted-foreground text-xs">
                <WalletCards className="size-3.5" />
                Portfolio overview
              </p>
              <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h2 className="font-semibold text-4xl text-foreground tracking-[-0.05em] sm:text-5xl">
                  ${total.toLocaleString()}
                </h2>
                <span className="inline-flex items-center gap-1 text-sm tabular-nums">
                  <ArrowUpRight className="size-4" />$
                  {Math.abs(dayChange).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}{" "}
                  today
                </span>
              </div>
              <p className="mt-3 max-w-lg text-muted-foreground text-sm">
                Public equity portfolio with allocation and intraday movement.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary">
                <Download className="size-4" />
                Statement
              </Button>
              <Button variant="primary">
                <Plus className="size-4" />
                Add asset
              </Button>
            </div>
          </header>

          <div className="grid gap-2 border-border border-b p-3 sm:grid-cols-3">
            {[
              ["Net deposits", "$612,400"],
              ["Unrealized gain", "$139,044"],
              ["Cash available", "$60,884"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl bg-muted/45 px-5 py-4 sm:px-6"
              >
                <p className="text-muted-foreground text-xs">{label}</p>
                <p className="mt-2 font-medium text-lg tabular-nums">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-border border-b px-3 py-2">
            <p className="px-2 font-medium text-sm">Holdings</p>
            <Tabs
              value={period}
              onValueChange={(value) =>
                setPeriod(value as (typeof PERIODS)[number])
              }
              variant="pill"
            >
              <TabsList className="bg-muted/65">
                {PERIODS.map((item) => (
                  <TabsTrigger
                    key={item}
                    value={item}
                    className="min-h-8 min-w-10 px-2 text-xs"
                  >
                    {item}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <Table
            data={data}
            columns={columns}
            getRowId={(row) => row.id}
            defaultSort={{ key: "value", direction: "desc" }}
            rowHeight={64}
            height={448}
            className="border-0 [&_thead]:bg-muted/25"
          />

          <footer className="flex flex-col gap-2 border-border border-t px-5 py-4 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between">
            <span>Prices delayed by 15 minutes</span>
            <span>
              {data.length} positions · {period} view
            </span>
          </footer>
        </div>
      </motion.div>
    </section>
  );
}
