"use client";

import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/motion/button/base";
import {
  AnimatedDropdown,
  AnimatedDropdownContent,
  AnimatedDropdownItem,
  AnimatedDropdownTrigger,
} from "@/components/premium/animated-dropdown";
import {
  DataTable,
  type DataTableColumn,
  type DataTableProps,
} from "@/components/premium/data-table";
import { cn } from "@/lib/utils";

export type { DataTableColumn } from "@/components/premium/data-table";

type SortState = NonNullable<DataTableProps<unknown>["sort"]>;

export type PaginatedDataTableProps<T> = Omit<
  DataTableProps<T>,
  "className" | "data" | "defaultSort" | "onSortChange" | "sort"
> & {
  data: T[];
  columns: DataTableColumn<T>[];
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
  sort?: SortState | null;
  defaultSort?: SortState | null;
  onSortChange?: (sort: SortState | null) => void;
  className?: string;
  tableClassName?: string;
  rangeLabel?: (start: number, end: number, total: number) => string;
};

function readSortValue<T>(row: T, column: DataTableColumn<T>) {
  if (column.sortValue) return column.sortValue(row);
  const value = (row as Record<string, unknown>)[column.key];
  return typeof value === "number" ? value : String(value ?? "").toLowerCase();
}

function pageItems(currentPage: number, pageCount: number) {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  if (currentPage <= 3) return [1, 2, 3, "ellipsis", pageCount] as const;
  if (currentPage >= pageCount - 2) {
    return [1, "ellipsis", pageCount - 2, pageCount - 1, pageCount] as const;
  }

  return [1, "ellipsis-start", currentPage, "ellipsis-end", pageCount] as const;
}

export function PaginatedDataTable<T>({
  data,
  columns,
  page: controlledPage,
  defaultPage = 1,
  onPageChange,
  pageSize: controlledPageSize,
  defaultPageSize = 10,
  pageSizeOptions = [10, 25, 50],
  onPageSizeChange,
  sort: controlledSort,
  defaultSort = null,
  onSortChange,
  className,
  tableClassName,
  rangeLabel = (start, end, total) =>
    `${start.toLocaleString()}–${end.toLocaleString()} of ${total.toLocaleString()}`,
  rowHeight = 56,
  height,
  ...tableProps
}: PaginatedDataTableProps<T>) {
  const [internalPage, setInternalPage] = useState(defaultPage);
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);
  const [internalSort, setInternalSort] = useState<SortState | null>(
    defaultSort,
  );

  const pageSize = Math.max(1, controlledPageSize ?? internalPageSize);
  const sort = controlledSort === undefined ? internalSort : controlledSort;

  const sortedData = useMemo(() => {
    if (!sort) return data;
    const column = columns.find((item) => item.key === sort.key);
    if (!column) return data;

    return [...data].sort((leftRow, rightRow) => {
      const left = readSortValue(leftRow, column);
      const right = readSortValue(rightRow, column);
      const result =
        typeof left === "number" && typeof right === "number"
          ? left - right
          : String(left).localeCompare(String(right), undefined, {
              numeric: true,
              sensitivity: "base",
            });
      return sort.direction === "asc" ? result : -result;
    });
  }, [columns, data, sort]);

  const pageCount = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const requestedPage = controlledPage ?? internalPage;
  const page = Math.min(Math.max(1, requestedPage), pageCount);
  const startIndex = (page - 1) * pageSize;
  const visibleData = sortedData.slice(startIndex, startIndex + pageSize);
  const start = sortedData.length === 0 ? 0 : startIndex + 1;
  const end = Math.min(startIndex + pageSize, sortedData.length);
  const availablePageSizes = Array.from(
    new Set([...pageSizeOptions, pageSize]),
  ).sort((left, right) => left - right);

  const publishPage = (nextPage: number) => {
    const clampedPage = Math.min(Math.max(1, nextPage), pageCount);
    if (controlledPage === undefined) setInternalPage(clampedPage);
    onPageChange?.(clampedPage);
  };

  const changePageSize = (nextPageSize: number) => {
    const firstVisibleIndex = (page - 1) * pageSize;
    const nextPageCount = Math.max(
      1,
      Math.ceil(sortedData.length / nextPageSize),
    );
    const nextPage = Math.min(
      Math.floor(firstVisibleIndex / nextPageSize) + 1,
      nextPageCount,
    );

    if (controlledPageSize === undefined) {
      setInternalPageSize(nextPageSize);
    }
    onPageSizeChange?.(nextPageSize);

    if (controlledPage === undefined) setInternalPage(nextPage);
    onPageChange?.(nextPage);
  };

  const changeSort = (nextSort: SortState | null) => {
    if (controlledSort === undefined) setInternalSort(nextSort);
    onSortChange?.(nextSort);
    publishPage(1);
  };

  return (
    <div
      className={cn(
        "w-full overflow-visible border border-border bg-background text-sm",
        className,
      )}
    >
      <DataTable
        {...tableProps}
        data={visibleData}
        columns={columns}
        sort={sort}
        onSortChange={changeSort}
        rowHeight={rowHeight}
        height={height ?? Math.min(pageSize * rowHeight + 44, 604)}
        className={cn("rounded-t-[inherit] border-0", tableClassName)}
      />

      <footer className="flex min-h-16 flex-col gap-3 rounded-b-[inherit] border-border border-t bg-background px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <span className="text-muted-foreground text-xs tabular-nums">
          {rangeLabel(start, end, sortedData.length)}
        </span>

        <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
          <nav
            aria-label="Table pagination"
            className="flex items-center justify-end gap-0.5"
          >
            <Button
              variant="ghost"
              size="icon"
              disabled={page === 1}
              aria-label="Previous page"
              onClick={() => publishPage(page - 1)}
              className="size-10 rounded-lg"
            >
              <ChevronLeft className="size-4" />
            </Button>

            <div className="flex items-center gap-0.5">
              {pageItems(page, pageCount).map((item) =>
                typeof item === "number" ? (
                  <Button
                    key={item}
                    variant="ghost"
                    size="icon"
                    aria-label={`Page ${item}`}
                    aria-current={item === page ? "page" : undefined}
                    onClick={() => publishPage(item)}
                    className="group size-10 rounded-lg hover:bg-transparent"
                  >
                    <span
                      className={cn(
                        "grid size-7 place-items-center rounded-md text-xs tabular-nums transition-colors",
                        item === page
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground group-hover:bg-muted group-hover:text-foreground",
                      )}
                    >
                      {item}
                    </span>
                  </Button>
                ) : (
                  <span
                    key={item}
                    aria-hidden
                    className="grid size-8 place-items-center text-muted-foreground"
                  >
                    <MoreHorizontal className="size-4" />
                  </span>
                ),
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              disabled={page === pageCount}
              aria-label="Next page"
              onClick={() => publishPage(page + 1)}
              className="size-10 rounded-lg"
            >
              <ChevronRight className="size-4" />
            </Button>
          </nav>

          <AnimatedDropdown>
            <AnimatedDropdownTrigger
              aria-label="Rows per page"
              className="group inline-flex h-9 w-[112px] items-center justify-between gap-2 whitespace-nowrap rounded-xl border border-border bg-background px-3 font-medium text-foreground text-xs tabular-nums transition-colors hover:bg-muted/45"
            >
              {pageSize} / page
              <ChevronDown className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </AnimatedDropdownTrigger>
            <AnimatedDropdownContent
              side="bottom"
              align="end"
              sideOffset={6}
              collisionPadding={12}
              className="w-[112px] min-w-[112px] p-1"
            >
              {availablePageSizes.map((size) => (
                <AnimatedDropdownItem
                  key={size}
                  onSelect={() => changePageSize(size)}
                  className="min-h-9 px-2 text-xs"
                >
                  <span className="whitespace-nowrap">{size} / page</span>
                  {size === pageSize ? (
                    <Check className="ml-auto size-3.5 shrink-0" />
                  ) : null}
                </AnimatedDropdownItem>
              ))}
            </AnimatedDropdownContent>
          </AnimatedDropdown>
        </div>
      </footer>
    </div>
  );
}
