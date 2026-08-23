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

export default function PaginationModes() {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Data-driven: pass totalPages + a page binding and the component builds
          the window, ellipses, and first/prev/next/last controls for you. */}
      <Pagination variant="compact" defaultPage={3} totalPages={10} />

      {/* Composed: place the parts yourself for full control over exactly which
          controls render. Both snippets produce the same UI. */}
      <Pagination variant="compact">
        <PaginationContent>
          <PaginationFirst />
          <PaginationPrevious />
          <PaginationLink>1</PaginationLink>
          <PaginationLink>2</PaginationLink>
          <PaginationLink isActive>3</PaginationLink>
          <PaginationLink>4</PaginationLink>
          <PaginationEllipsis />
          <PaginationLink>10</PaginationLink>
          <PaginationNext />
          <PaginationLast />
        </PaginationContent>
      </Pagination>
    </div>
  )
}
