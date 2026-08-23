"use client"

import * as React from "react"

import { Pagination } from "@/registry/pro/ui/pagination"

export default function PaginationShapePro() {
  const [page, setPage] = React.useState(9)

  return (
    <div className="flex w-full flex-col gap-8">
      <Pagination
        variant="full"
        shape="rounded"
        page={page}
        totalPages={24}
        onPageChange={setPage}
      />
      <Pagination
        variant="full"
        shape="pill"
        page={page}
        totalPages={24}
        onPageChange={setPage}
      />
    </div>
  )
}
