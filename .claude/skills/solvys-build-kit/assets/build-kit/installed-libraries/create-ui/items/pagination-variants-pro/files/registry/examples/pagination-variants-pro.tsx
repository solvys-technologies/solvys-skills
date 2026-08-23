"use client"

import * as React from "react"

import { Pagination } from "@/registry/pro/ui/pagination"

const variants = [
  { value: "full", label: "full" },
  { value: "split", label: "split" },
  { value: "grouped", label: "grouped" },
] as const

export default function PaginationVariantsPro() {
  return (
    <div className="flex w-full flex-col gap-10">
      {variants.map((v) => (
        <div key={v.value} className="flex flex-col gap-3">
          <p className="text-ui-control-sm text-placeholder font-medium">
            {v.label}
          </p>
          <Pagination variant={v.value} defaultPage={9} totalPages={24} />
        </div>
      ))}
    </div>
  )
}
