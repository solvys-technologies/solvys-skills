"use client"

import * as React from "react"

import { Pagination } from "@/registry/pro/ui/pagination"

export default function PaginationFull() {
  const [page, setPage] = React.useState(9)

  return (
    <div className="w-full">
      <Pagination
        variant="full"
        shape="rounded"
        page={page}
        totalPages={24}
        onPageChange={setPage}
      />
    </div>
  )
}
