"use client"

import * as React from "react"
import { RiFileLine } from "@create-ui/assets/icons"

import { Chip } from "@/registry/ui/chip"
import { Dropzone } from "@/registry/ui/dropzone"

export default function DropzoneDemo() {
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-4">
      <Dropzone
        multiple
        accept=".pdf,.zip,image/*"
        maxSize={10 * 1024 * 1024}
        onFilesAccepted={(accepted) =>
          setFiles((prev) => [...prev, ...accepted])
        }
      />
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((file, index) => (
            <Chip
              key={`${file.name}-${index}`}
              size="sm"
              closable
              onClose={() =>
                setFiles((prev) => prev.filter((_, i) => i !== index))
              }
            >
              <RiFileLine />
              {file.name}
            </Chip>
          ))}
        </div>
      )}
    </div>
  )
}
