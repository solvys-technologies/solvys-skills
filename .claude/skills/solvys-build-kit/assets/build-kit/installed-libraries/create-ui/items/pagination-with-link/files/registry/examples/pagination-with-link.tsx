"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/ui/pagination"

export default function PaginationWithLink() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious asChild>
          <a href="?page=2" />
        </PaginationPrevious>
        <PaginationLink asChild>
          <a href="?page=1">1</a>
        </PaginationLink>
        <PaginationLink asChild>
          <a href="?page=2">2</a>
        </PaginationLink>
        <PaginationLink asChild isActive>
          <a href="?page=3" aria-current="page">
            3
          </a>
        </PaginationLink>
        <PaginationEllipsis />
        <PaginationLink asChild>
          <a href="?page=10">10</a>
        </PaginationLink>
        <PaginationNext asChild>
          <a href="?page=4" />
        </PaginationNext>
      </PaginationContent>
    </Pagination>
  )
}
