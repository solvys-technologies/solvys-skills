"use client"

import * as React from "react"

import type { UploadFile } from "@/registry/hooks/use-file-upload"
import { FileUpload, FileUploadList } from "@/registry/pro/ui/file-upload"
import { Dropzone } from "@/registry/ui/dropzone"

const SEED: UploadFile = {
  id: "seed",
  name: "product-demo.mp4",
  size: 24 * 1024 * 1024,
  format: "MP4",
  status: "uploading",
  progress: 0,
}

function durationFor(file: UploadFile) {
  return Math.min(Math.max((file.size / 1_000_000) * 1200, 2200), 7000)
}

export default function FileUploadDemo() {
  const [files, setFiles] = React.useState<UploadFile[]>(() => [SEED])
  const timers = React.useRef(new Map<string, number>())

  const drive = React.useCallback((id: string, durationMs: number) => {
    const tickMs = 40
    const step = (100 * tickMs) / durationMs
    const existing = timers.current.get(id)
    if (existing) window.clearInterval(existing)
    const timerId = window.setInterval(() => {
      setFiles((prev) => {
        const file = prev.find((f) => f.id === id)
        if (!file || file.status !== "uploading") {
          window.clearInterval(timerId)
          timers.current.delete(id)
          return prev
        }
        const next = Math.min(file.progress + step, 100)
        if (next >= 100) {
          window.clearInterval(timerId)
          timers.current.delete(id)
          window.setTimeout(
            () =>
              setFiles((current) =>
                current.map((f) =>
                  f.id === id ? { ...f, status: "completed", progress: 100 } : f
                )
              ),
            900
          )
        }
        return prev.map((f) => (f.id === id ? { ...f, progress: next } : f))
      })
    }, tickMs)
    timers.current.set(id, timerId)
  }, [])

  React.useEffect(() => {
    const active = timers.current
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === "seed" ? { ...f, status: "completed", progress: 100 } : f
        )
      )
    } else {
      drive("seed", durationFor(SEED))
    }
    return () => {
      for (const id of active.values()) window.clearInterval(id)
      active.clear()
    }
  }, [drive])

  const onUpload = React.useCallback(
    (batch: UploadFile[]) => {
      for (const file of batch) drive(file.id, durationFor(file))
    },
    [drive]
  )

  const stopTimer = React.useCallback((file: UploadFile) => {
    const timer = timers.current.get(file.id)
    if (timer) {
      window.clearInterval(timer)
      timers.current.delete(file.id)
    }
  }, [])

  const onResume = React.useCallback(
    (file: UploadFile) => drive(file.id, durationFor(file)),
    [drive]
  )

  return (
    <div className="w-full max-w-[400px]">
      <FileUpload
        multiple
        accept=".zip,.pdf,.ai,.cdr,.csv,.jpg,.mp4"
        maxSize={2500 * 1024 * 1024}
        files={files}
        onFilesChange={setFiles}
        onUpload={onUpload}
        onPause={stopTimer}
        onResume={onResume}
        onRemove={stopTimer}
      >
        <Dropzone />
        <FileUploadList />
      </FileUpload>
    </div>
  )
}
