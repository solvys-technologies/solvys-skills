"use client"

import * as React from "react"
import {
  RiCheckLine,
  RiRefreshLine,
  RiUploadCloud2Line,
} from "@create-ui/assets/icons"

import { Button, ButtonLabel } from "@/registry/ui/button"
import { Progress } from "@/registry/ui/progress"

const DURATION_MS = 2000

type Status = "idle" | "uploading" | "done" | "error"

export default function ProgressUpload() {
  const [attempt, setAttempt] = React.useState(0)
  const [status, setStatus] = React.useState<Status>("idle")
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    if (status !== "uploading") return

    // First attempt fails to demo the retry flow, later attempts succeed.
    const willFail = attempt === 1
    const target = willFail ? 40 : 100

    const raf = requestAnimationFrame(() => setProgress(target))
    const timeout = setTimeout(
      () => setStatus(willFail ? "error" : "done"),
      DURATION_MS
    )

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timeout)
    }
  }, [status, attempt])

  function startUpload() {
    setProgress(0)
    setAttempt((a) => a + 1)
    setStatus("uploading")
  }

  const isUploading = status === "uploading"
  const isDone = status === "done"
  const isError = status === "error"

  const variant = isDone ? "success" : isError ? "danger" : "primary"

  return (
    <div className="flex w-80 items-center gap-4">
      <Progress
        key={attempt}
        value={progress}
        duration={DURATION_MS}
        variant={variant}
      />
      <Button
        variant={variant}
        loading={isUploading}
        onClick={startUpload}
        className="w-32 shrink-0"
      >
        {!isUploading &&
          (isDone ? (
            <RiCheckLine />
          ) : isError ? (
            <RiRefreshLine />
          ) : (
            <RiUploadCloud2Line />
          ))}
        <ButtonLabel>
          {isDone
            ? "Done"
            : isError
              ? "Retry"
              : isUploading
                ? "Uploading"
                : "Upload"}
        </ButtonLabel>
      </Button>
    </div>
  )
}
