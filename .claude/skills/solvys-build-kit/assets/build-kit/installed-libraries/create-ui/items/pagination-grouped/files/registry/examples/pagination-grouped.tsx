"use client"

import * as React from "react"

import { Pagination } from "@/registry/pro/ui/pagination"

export default function PaginationGrouped() {
  const [page, setPage] = React.useState(9)

  return (
    <div className="w-full">
      <Pagination
        variant="grouped"
        page={page}
        totalPages={24}
        onPageChange={setPage}
      />
    </div>
  )
}
