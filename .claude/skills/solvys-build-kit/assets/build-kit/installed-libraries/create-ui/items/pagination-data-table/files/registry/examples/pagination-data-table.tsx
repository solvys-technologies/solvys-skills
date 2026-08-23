"use client"

import * as React from "react"

import { Pagination } from "@/registry/pro/ui/pagination"

export default function PaginationDataTable() {
  const [page, setPage] = React.useState(9)
  const [pageSize, setPageSize] = React.useState(30)

  return (
    <div className="w-full">
      <Pagination
        variant="data-table"
        page={page}
        totalPages={24}
        onPageChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[10, 20, 30, 50]}
      />
    </div>
  )
}
