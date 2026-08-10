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

export default function PaginationDisabled() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationFirst disabled />
        <PaginationPrevious disabled />
        <PaginationLink isActive>1</PaginationLink>
        <PaginationLink>2</PaginationLink>
        <PaginationLink>3</PaginationLink>
        <PaginationEllipsis />
        <PaginationLink>10</PaginationLink>
        <PaginationNext />
        <PaginationLast />
      </PaginationContent>
    </Pagination>
  )
}
