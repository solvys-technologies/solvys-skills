import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/ui/pagination"

export default function PaginationDemo() {
  return (
    <Pagination>
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
  )
}
