"use client"

import * as React from "react"

import { SectionFrame } from "@/registry/components/example"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/pro/ui/pagination"

const shapes = ["rounded", "pill"] as const
type Shape = (typeof shapes)[number]

function Shapes({ render }: { render: (shape: Shape) => React.ReactNode }) {
  return (
    <div className="flex flex-col gap-8">
      {shapes.map((s) => (
        <div key={s} className="space-y-2">
          <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
            {s}
          </p>
          {render(s)}
        </div>
      ))}
    </div>
  )
}

// Every variant below is driven entirely by data props — the variant builds
// its own links/windowing, status and select. defaultPage makes them live
// (click to navigate).

function CompactSection() {
  return (
    <SectionFrame title="compact / compact-grouped — data-driven (totalPages + page)">
      <Shapes
        render={(s) => (
          <div className="flex flex-col gap-4">
            <Pagination
              variant="compact"
              shape={s}
              defaultPage={3}
              totalPages={10}
            />
            <Pagination
              variant="compact-grouped"
              shape={s}
              defaultPage={3}
              totalPages={10}
            />
          </div>
        )}
      />
    </SectionFrame>
  )
}

function FullSection() {
  return (
    <SectionFrame title="full — status + page-jump select">
      <Shapes
        render={(s) => (
          <Pagination
            variant="full"
            shape={s}
            defaultPage={9}
            totalPages={24}
          />
        )}
      />
    </SectionFrame>
  )
}

function SplitSection() {
  return (
    <SectionFrame title="split">
      <Shapes
        render={(s) => (
          <Pagination
            variant="split"
            shape={s}
            defaultPage={9}
            totalPages={24}
          />
        )}
      />
    </SectionFrame>
  )
}

function DataTableSection() {
  return (
    <SectionFrame title="data-table — page input + per-page select">
      <Shapes
        render={(s) => (
          <Pagination
            variant="data-table"
            shape={s}
            defaultPage={9}
            totalPages={24}
            defaultPageSize={30}
          />
        )}
      />
    </SectionFrame>
  )
}

function GroupedSection() {
  return (
    <SectionFrame title="grouped">
      <Shapes
        render={(s) => (
          <Pagination
            variant="grouped"
            shape={s}
            defaultPage={9}
            totalPages={24}
          />
        )}
      />
    </SectionFrame>
  )
}

function FullPagerSection() {
  return (
    <SectionFrame title="full-pager — compact prev/next clusters around a page count">
      <Shapes
        render={(s) => (
          <div className="w-full">
            <Pagination
              variant="full-pager"
              shape={s}
              defaultPage={9}
              totalPages={24}
            />
          </div>
        )}
      />
    </SectionFrame>
  )
}

function CompactPagerSection() {
  return (
    <SectionFrame title="compact-pager — controls and page count in one group">
      <Shapes
        render={(s) => (
          <div className="flex justify-center">
            <Pagination
              variant="compact-pager"
              shape={s}
              defaultPage={9}
              totalPages={24}
            />
          </div>
        )}
      />
    </SectionFrame>
  )
}

function NavModesSection() {
  const [page, setPage] = React.useState(3)
  return (
    <SectionFrame title="Navigation modes — getPageHref (SSR) vs onPageChange (client)">
      <div className="flex flex-col gap-8">
        <div className="space-y-2">
          <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
            getPageHref → anchor links (no JS)
          </p>
          <Pagination
            variant="compact"
            shape="rounded"
            page={3}
            totalPages={10}
            getPageHref={(n) => `?page=${n}`}
          />
        </div>
        <div className="space-y-2">
          <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
            onPageChange → controlled state (page {page})
          </p>
          <Pagination
            variant="compact"
            shape="rounded"
            page={page}
            totalPages={10}
            onPageChange={setPage}
          />
        </div>
      </div>
    </SectionFrame>
  )
}

// The primitives stay exported as an escape hatch for fully custom layouts.
function EscapeHatchSection() {
  return (
    <SectionFrame title="Escape hatch — compose the primitives by hand (asChild links)">
      <Pagination variant="compact" shape="rounded">
        <PaginationContent>
          <PaginationFirst asChild>
            <a href="?page=1" aria-label="First page" />
          </PaginationFirst>
          <PaginationPrevious asChild>
            <a href="?page=2" aria-label="Previous page" />
          </PaginationPrevious>
          <PaginationLink asChild>
            <a href="?page=1">1</a>
          </PaginationLink>
          <PaginationLink asChild>
            <a href="?page=2">2</a>
          </PaginationLink>
          <PaginationLink asChild isActive>
            <a href="?page=3">3</a>
          </PaginationLink>
          <PaginationEllipsis />
          <PaginationLink asChild>
            <a href="?page=10">10</a>
          </PaginationLink>
          <PaginationNext asChild>
            <a href="?page=4" aria-label="Next page" />
          </PaginationNext>
          <PaginationLast asChild>
            <a href="?page=10" aria-label="Last page" />
          </PaginationLast>
        </PaginationContent>
      </Pagination>
    </SectionFrame>
  )
}

export default function PaginationExample() {
  return (
    <div className="flex max-w-full min-w-0 flex-col gap-16">
      <CompactSection />
      <FullSection />
      <SplitSection />
      <DataTableSection />
      <GroupedSection />
      <FullPagerSection />
      <CompactPagerSection />
      <NavModesSection />
      <EscapeHatchSection />
    </div>
  )
}
