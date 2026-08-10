"use client"

import * as React from "react"

import type {
  UploadFile,
  UploadHandlers,
} from "@/registry/hooks/use-file-upload"
import { FileUpload, FileUploadList } from "@/registry/pro/ui/file-upload"
import { DropzoneTrigger } from "@/registry/ui/dropzone"

export default function FileUploadTrigger() {
  const onUpload = React.useCallback(
    (files: UploadFile[], handlers: UploadHandlers) => {
      for (const file of files) {
        let pct = 0
        const id = window.setInterval(() => {
          pct = Math.min(pct + 8, 100)
          handlers.onProgress(file.id, pct)
          if (pct >= 100) {
            window.clearInterval(id)
            window.setTimeout(() => handlers.onSuccess(file.id), 700)
          }
        }, 60)
      }
    },
    []
  )

  return (
    <div className="w-full max-w-[400px]">
      <FileUpload
        className="items-center"
        multiple
        accept=".zip,.pdf"
        maxSize={25 * 1024 * 1024}
        onUpload={onUpload}
      >
        <DropzoneTrigger size="sm">Upload File</DropzoneTrigger>
        <FileUploadList />
      </FileUpload>
    </div>
  )
}
