"use client"

import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/ui/pagination"

const TOTAL = 10

function getVisiblePages(current: number, total: number) {
  const pages: (number | "ellipsis")[] = []
  pages.push(1)
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  if (start > 2) pages.push("ellipsis")
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total - 1) pages.push("ellipsis")
  if (total > 1) pages.push(total)
  return pages
}

export default function PaginationControlled() {
  const [page, setPage] = React.useState(3)
  const pages = getVisiblePages(page, TOTAL)

  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination>
        <PaginationContent>
          <PaginationFirst disabled={page === 1} onClick={() => setPage(1)} />
          <PaginationPrevious
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          />
          {pages.map((p, i) =>
            p === "ellipsis" ? (
              <PaginationEllipsis key={`ellipsis-${i}`} />
            ) : (
              <PaginationLink
                key={p}
                isActive={p === page}
                onClick={() => setPage(p)}
              >
                {p}
              </PaginationLink>
            )
          )}
          <PaginationNext
            disabled={page === TOTAL}
            onClick={() => setPage((p) => Math.min(TOTAL, p + 1))}
          />
          <PaginationLast
            disabled={page === TOTAL}
            onClick={() => setPage(TOTAL)}
          />
        </PaginationContent>
      </Pagination>
      <p className="text-placeholder text-ui-control-sm">
        Page <span className="text-body font-medium">{page}</span> of {TOTAL}
      </p>
    </div>
  )
}
