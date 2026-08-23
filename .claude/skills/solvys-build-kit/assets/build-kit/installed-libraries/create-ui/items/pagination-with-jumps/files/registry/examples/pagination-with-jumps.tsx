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

export default function PaginationWithJumps() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationFirst />
        <PaginationPrevious />
        <PaginationLink>1</PaginationLink>
        <PaginationEllipsis />
        <PaginationLink>24</PaginationLink>
        <PaginationLink isActive>25</PaginationLink>
        <PaginationLink>26</PaginationLink>
        <PaginationEllipsis />
        <PaginationLink>50</PaginationLink>
        <PaginationNext />
        <PaginationLast />
      </PaginationContent>
    </Pagination>
  )
}
