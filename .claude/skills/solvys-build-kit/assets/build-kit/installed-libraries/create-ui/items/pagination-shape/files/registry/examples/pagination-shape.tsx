import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/ui/pagination"

export default function PaginationShape() {
  return (
    <div className="flex flex-col items-center gap-8">
      <Pagination shape="rounded">
        <PaginationContent>
          <PaginationPrevious />
          <PaginationLink>1</PaginationLink>
          <PaginationLink isActive>2</PaginationLink>
          <PaginationLink>3</PaginationLink>
          <PaginationEllipsis />
          <PaginationLink>10</PaginationLink>
          <PaginationNext />
        </PaginationContent>
      </Pagination>
      <Pagination shape="pill">
        <PaginationContent>
          <PaginationPrevious />
          <PaginationLink>1</PaginationLink>
          <PaginationLink isActive>2</PaginationLink>
          <PaginationLink>3</PaginationLink>
          <PaginationEllipsis />
          <PaginationLink>10</PaginationLink>
          <PaginationNext />
        </PaginationContent>
      </Pagination>
    </div>
  )
}
