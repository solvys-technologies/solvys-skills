"use client"

import * as React from "react"

import { Pagination } from "@/registry/pro/ui/pagination"

export default function PaginationCompactPager() {
  const [page, setPage] = React.useState(9)

  return (
    <div className="flex justify-center">
      <Pagination
        variant="compact-pager"
        page={page}
        totalPages={24}
        onPageChange={setPage}
      />
    </div>
  )
}
