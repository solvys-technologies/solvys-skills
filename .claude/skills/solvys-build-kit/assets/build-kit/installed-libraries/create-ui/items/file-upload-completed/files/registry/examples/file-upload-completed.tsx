"use client"

import * as React from "react"

import type {
  UploadFile,
  UploadHandlers,
} from "@/registry/hooks/use-file-upload"
import { FileUpload, FileUploadList } from "@/registry/pro/ui/file-upload"
import { Dropzone } from "@/registry/ui/dropzone"

const SEED: UploadFile = {
  id: "seed",
  name: "brand-guidelines.pdf",
  size: 4.2 * 1024 * 1024,
  format: "PDF",
  status: "completed",
  progress: 100,
}

export default function FileUploadCompleted() {
  const timers = React.useRef(
    new Map<
      string,
      { id: number; pct: number; durationMs: number; handlers: UploadHandlers }
    >()
  )

  const runTimer = React.useCallback(
    (
      fileId: string,
      durationMs: number,
      handlers: UploadHandlers,
      from: number
    ) => {
      const tickMs = 40
      const step = (100 * tickMs) / durationMs
      const id = window.setInterval(() => {
        const entry = timers.current.get(fileId)
        if (!entry) {
          window.clearInterval(id)
          return
        }
        entry.pct = Math.min(entry.pct + step, 100)
        handlers.onProgress(fileId, entry.pct)
        if (entry.pct >= 100) {
          window.clearInterval(entry.id)
          timers.current.delete(fileId)
          window.setTimeout(() => handlers.onSuccess(fileId), 900)
        }
      }, tickMs)
      timers.current.set(fileId, { id, pct: from, durationMs, handlers })
    },
    []
  )

  const onUpload = React.useCallback(
    (files: UploadFile[], handlers: UploadHandlers) => {
      for (const file of files) {
        const durationMs = Math.min(
          Math.max((file.size / 1_000_000) * 1200, 2200),
          7000
        )
        runTimer(file.id, durationMs, handlers, 0)
      }
    },
    [runTimer]
  )

  const onPause = React.useCallback((file: UploadFile) => {
    const entry = timers.current.get(file.id)
    if (entry) window.clearInterval(entry.id)
  }, [])

  const onResume = React.useCallback(
    (file: UploadFile) => {
      const entry = timers.current.get(file.id)
      if (entry) runTimer(file.id, entry.durationMs, entry.handlers, entry.pct)
    },
    [runTimer]
  )

  const onRemove = React.useCallback((file: UploadFile) => {
    const entry = timers.current.get(file.id)
    if (entry) {
      window.clearInterval(entry.id)
      timers.current.delete(file.id)
    }
  }, [])

  const uploadProps = { onUpload, onPause, onResume, onRemove }

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-6">
      <FileUpload
        completedActions
        defaultFiles={[SEED]}
        accept=".pdf,.zip,.jpg,.mp4"
        maxSize={2500 * 1024 * 1024}
        {...uploadProps}
      >
        <Dropzone />
        <FileUploadList />
      </FileUpload>
      <FileUpload
        size="sm"
        completedActions
        defaultFiles={[{ ...SEED, id: "seed-sm" }]}
        accept=".pdf,.zip,.jpg,.mp4"
        maxSize={2500 * 1024 * 1024}
        {...uploadProps}
      >
        <Dropzone size="sm" />
        <FileUploadList />
      </FileUpload>
    </div>
  )
}
