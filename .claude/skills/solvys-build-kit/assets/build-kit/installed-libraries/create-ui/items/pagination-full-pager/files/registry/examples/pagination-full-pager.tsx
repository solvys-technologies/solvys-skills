"use client"

import * as React from "react"

import { Pagination } from "@/registry/pro/ui/pagination"

export default function PaginationFullPager() {
  const [page, setPage] = React.useState(9)

  return (
    <div className="w-full max-w-md">
      <Pagination
        variant="full-pager"
        page={page}
        totalPages={24}
        onPageChange={setPage}
      />
    </div>
  )
}
