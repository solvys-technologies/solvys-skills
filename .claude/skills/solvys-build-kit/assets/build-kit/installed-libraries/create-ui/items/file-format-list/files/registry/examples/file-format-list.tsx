"use client"

import * as React from "react"
import { RiDownload2Line } from "@create-ui/assets/icons"

import { FileFormat } from "@/registry/pro/ui/file-format"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { CloseButton } from "@/registry/ui/close-button"

type Attachment = {
  id: string
  name: string
  format: string
  size: string
  modified: string
  status?: "ready" | "scanning"
  color?: { strong: string; light: string }
}

const FILES: Attachment[] = [
  {
    id: "report",
    name: "Q3-financial-report.pdf",
    format: "PDF",
    size: "2.4 MB",
    modified: "Edited 3d ago",
    status: "ready",
  },
  {
    id: "spec",
    name: "product-spec.docx",
    format: "DOCX",
    size: "842 KB",
    modified: "Edited 6h ago",
    color: { strong: "var(--color-blue-500)", light: "var(--color-blue-400)" },
  },
  {
    id: "roadmap",
    name: "roadmap-2026.xlsx",
    format: "XLSX",
    size: "1.1 MB",
    modified: "Edited yesterday",
  },
  {
    id: "banner",
    name: "hero-banner.png",
    format: "PNG",
    size: "3.8 MB",
    modified: "Uploaded 12m ago",
    status: "scanning",
  },
]

const STATUS_BADGE = {
  ready: { variant: "success", label: "Ready" },
  scanning: { variant: "warning", label: "Scanning" },
} as const

export default function FileFormatList() {
  const [files, setFiles] = React.useState(FILES)

  return (
    <div className="bg-static shadow-neutral-xs border-weak w-full max-w-[440px] overflow-hidden rounded-xl border">
      <div className="gap-component-sm p-component-lg border-weak flex items-center justify-between border-b">
        <p className="text-ui-control-md text-strongest font-semibold">
          Attachments
        </p>
        <span className="text-paragraph-xs text-placeholder tabular-nums">
          {files.length} {files.length === 1 ? "file" : "files"}
        </span>
      </div>
      <ul>
        {files.map((file) => (
          <li
            key={file.id}
            className="gap-component-md p-component-lg border-weak flex items-center border-b last:border-b-0"
          >
            <FileFormat
              format={file.format}
              color={file.color}
              className="size-10"
            />
            <div className="gap-component-xs flex min-w-0 flex-1 flex-col">
              <div className="gap-component-sm flex items-center">
                <p className="text-ui-control-md text-strongest min-w-0 truncate font-semibold">
                  {file.name}
                </p>
                {file.status && (
                  <Badge
                    variant={STATUS_BADGE[file.status].variant}
                    appearance="soft"
                    size="sm"
                  >
                    {STATUS_BADGE[file.status].label}
                  </Badge>
                )}
              </div>
              <p className="text-paragraph-xs text-placeholder truncate tabular-nums">
                {file.size} · {file.modified}
              </p>
            </div>
            <div className="gap-component-xs flex shrink-0 items-center">
              <Button
                iconOnly
                variant="neutral-solid"
                appearance="ghost"
                size="sm"
                shape="pill"
                disabled={file.status === "scanning"}
                aria-label={`Download ${file.name}`}
              >
                <RiDownload2Line />
              </Button>
              <CloseButton
                size="lg"
                aria-label={`Remove ${file.name}`}
                onClick={() =>
                  setFiles((prev) => prev.filter((f) => f.id !== file.id))
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
