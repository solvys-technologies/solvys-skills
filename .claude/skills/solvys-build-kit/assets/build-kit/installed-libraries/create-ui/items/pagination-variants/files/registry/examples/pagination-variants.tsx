import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/ui/pagination"

export default function PaginationVariants() {
  return (
    <div className="flex flex-col items-center gap-8">
      <Pagination variant="compact-grouped">
        <PaginationContent>
          <PaginationPrevious />
          <PaginationLink>1</PaginationLink>
          <PaginationLink>2</PaginationLink>
          <PaginationLink isActive>3</PaginationLink>
          <PaginationEllipsis />
          <PaginationLink>10</PaginationLink>
          <PaginationNext />
        </PaginationContent>
      </Pagination>
      <Pagination variant="compact">
        <PaginationContent>
          <PaginationPrevious />
          <PaginationLink>1</PaginationLink>
          <PaginationLink>2</PaginationLink>
          <PaginationLink isActive>3</PaginationLink>
          <PaginationEllipsis />
          <PaginationLink>10</PaginationLink>
          <PaginationNext />
        </PaginationContent>
      </Pagination>
    </div>
  )
}
