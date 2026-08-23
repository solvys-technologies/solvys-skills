"use client"

import * as React from "react"
import {
  RiCheckLine,
  RiDeleteBin6Line,
  RiDownloadLine,
  RiExternalLinkLine,
  RiFile2Line,
  RiFileCopy2Line,
  RiFileCopyLine,
} from "@create-ui/assets/icons"

import { ContextMenu } from "@/registry/ui/context-menu"

type FileRow = { id: number; name: string }

let nextId = 100

export default function ContextMenuFiles() {
  const [files, setFiles] = React.useState<FileRow[]>([
    { id: 1, name: "brand-guidelines.pdf" },
    { id: 2, name: "q3-report.xlsx" },
    { id: 3, name: "hero-illustration.png" },
  ])
  const [copiedId, setCopiedId] = React.useState<number | null>(null)

  async function copyName(file: FileRow) {
    await navigator.clipboard.writeText(file.name)
    setCopiedId(file.id)
    window.setTimeout(() => setCopiedId(null), 1600)
  }

  function duplicate(file: FileRow) {
    setFiles((prev) => {
      const index = prev.findIndex((f) => f.id === file.id)
      const copy = { id: (nextId += 1), name: `${file.name} (copy)` }
      const next = [...prev]
      next.splice(index + 1, 0, copy)
      return next
    })
  }

  function remove(file: FileRow) {
    setFiles((prev) => prev.filter((f) => f.id !== file.id))
  }

  return (
    <div className="border-light w-72 overflow-hidden rounded-2xl border">
      {files.length === 0 && (
        <p className="text-placeholder p-4 text-center text-sm">
          No files. All deleted.
        </p>
      )}
      {files.map((file) => (
        <ContextMenu key={file.id} size="sm">
          <ContextMenu.Trigger>
            <div className="hover:bg-weakest text-body border-light flex items-center gap-2 border-b px-3 py-2.5 text-sm select-none last:border-b-0">
              <RiFile2Line className="text-placeholder size-4 shrink-0" />
              <span className="min-w-0 flex-1 truncate">{file.name}</span>
              {copiedId === file.id && (
                <RiCheckLine className="text-success-base size-4 shrink-0" />
              )}
            </div>
          </ContextMenu.Trigger>
          <ContextMenu.Popover className="w-52">
            <ContextMenu.Menu aria-label={`Actions for ${file.name}`}>
              <ContextMenu.Item
                id="copy"
                textValue="Copy name"
                leading={<RiFileCopyLine />}
                onAction={() => copyName(file)}
              >
                Copy name
              </ContextMenu.Item>
              <ContextMenu.Item
                id="duplicate"
                textValue="Duplicate"
                leading={<RiFileCopy2Line />}
                onAction={() => duplicate(file)}
              >
                Duplicate
              </ContextMenu.Item>
              <ContextMenu.Item
                id="download"
                textValue="Download"
                leading={<RiDownloadLine />}
              >
                Download
              </ContextMenu.Item>
              <ContextMenu.Item
                id="open"
                textValue="Open in new tab"
                leading={<RiExternalLinkLine />}
              >
                Open in new tab
              </ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item
                id="delete"
                textValue="Delete"
                variant="danger"
                leading={<RiDeleteBin6Line />}
                onAction={() => remove(file)}
              >
                Delete
              </ContextMenu.Item>
            </ContextMenu.Menu>
          </ContextMenu.Popover>
        </ContextMenu>
      ))}
    </div>
  )
}
