"use client"

import * as React from "react"

import { Pagination } from "@/registry/ui/pagination"

export default function PaginationAuto() {
  const [page, setPage] = React.useState(4)

  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination page={page} totalPages={12} onPageChange={setPage} />
      <p className="text-placeholder text-ui-control-sm">
        Page <span className="text-body font-medium">{page}</span> of 12
      </p>
    </div>
  )
}
