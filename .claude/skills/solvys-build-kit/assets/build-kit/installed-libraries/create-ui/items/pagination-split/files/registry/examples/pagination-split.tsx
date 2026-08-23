"use client"

import * as React from "react"

import { Pagination } from "@/registry/pro/ui/pagination"

export default function PaginationSplit() {
  const [page, setPage] = React.useState(9)

  return (
    <div className="w-full">
      <Pagination
        variant="split"
        page={page}
        totalPages={24}
        onPageChange={setPage}
      />
    </div>
  )
}
