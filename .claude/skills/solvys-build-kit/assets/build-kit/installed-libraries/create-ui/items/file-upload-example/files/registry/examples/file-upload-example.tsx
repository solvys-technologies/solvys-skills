"use client"

import * as React from "react"
import { RiImageAddLine } from "@create-ui/assets/icons"

import type {
  UploadFile,
  UploadHandlers,
} from "@/registry/hooks/use-file-upload"
import {
  FileUpload,
  FileUploadItem,
  FileUploadItemBackground,
  FileUploadItemContent,
  FileUploadItemFooter,
  FileUploadItemHeader,
  FileUploadItemIcon,
  FileUploadItemMain,
  FileUploadItemMeta,
  FileUploadItemName,
  FileUploadItemProgress,
  FileUploadItemStatus,
  FileUploadList,
} from "@/registry/pro/ui/file-upload"
import {
  Dropzone,
  DropzoneDescription,
  DropzoneHeader,
  DropzoneHeading,
  DropzoneIcon,
  DropzoneSeparator,
  DropzoneTitle,
  DropzoneTrigger,
} from "@/registry/ui/dropzone"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-body text-xs font-medium">{title}</p>
      {children}
    </div>
  )
}

// Static rows for visual inspection — one per upload status, always visible.
const ROW_STATES: UploadFile[] = [
  {
    id: "1",
    name: "annual-report.pdf",
    size: 2.3 * 1024 * 1024,
    format: "PDF",
    status: "uploading",
    progress: 16,
  },
  {
    id: "2",
    name: "design-assets.zip",
    size: 12 * 1024 * 1024,
    format: "ZIP",
    status: "queued",
    progress: 0,
  },
  {
    id: "3",
    name: "promo-video.mp4",
    size: 8 * 1024 * 1024,
    format: "MP4",
    status: "paused",
    progress: 45,
  },
  {
    id: "4",
    name: "logo.png",
    size: 480 * 1024,
    format: "PNG",
    status: "completed",
    progress: 100,
  },
  {
    id: "5",
    name: "huge-archive.zip",
    size: 30 * 1024 * 1024,
    format: "ZIP",
    status: "error",
    progress: 0,
    error: "File exceeds the 25MB limit",
  },
]

export default function FileUploadExample() {
  // The component owns the file list and renders each row. A real consumer would
  // POST to their server and report progress here; this demo simulates it with a
  // per-file timer. Every live section below reuses the same handlers.
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
      // Increment by a fixed amount per tick (not wall-clock based) so a
      // backgrounded tab simply slows down instead of jumping to 100% when it
      // regains focus. ~40ms keeps the conic-gradient status circle smooth.
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
          // Hold at 100% so the full bar is seen, then the fill + bar slide off
          // to the right before the row flips to completed (~850ms total).
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

  // Pause freezes the timer at its current progress; resume continues from there.
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
    <div className="flex w-full max-w-[400px] flex-col gap-16">
      {/* Zero-config managed: the dropzone and list do everything. The
          description is derived automatically from accept + maxSize. */}
      <Section title="Default">
        <FileUpload
          multiple
          accept=".zip,.pdf,.ai,.cdr,.csv,.jpg,.mp4"
          maxSize={2500 * 1024 * 1024}
          {...uploadProps}
        >
          <Dropzone />
          <FileUploadList />
        </FileUpload>
      </Section>
      {/* md size — a compact horizontal bar: icon + a left-aligned text block whose
          title carries the inline "choose file(s)" CTA. The size + format hints fold
          into one line, and the same idle/error/disabled colours as lg apply. */}
      <Section title="Dropzone size md">
        <FileUpload
          multiple
          accept=".zip,.pdf,.ai,.cdr"
          maxSize={25 * 1024 * 1024}
          {...uploadProps}
        >
          <Dropzone size="md" />
          <FileUploadList />
        </FileUpload>
        <FileUpload multiple accept=".zip,.pdf" maxSize={25 * 1024 * 1024}>
          <Dropzone
            size="md"
            error
            errorMessage="File exceeds the 25MB limit"
          />
        </FileUpload>
        <FileUpload
          disabled
          multiple
          accept=".zip,.pdf"
          maxSize={25 * 1024 * 1024}
        >
          <Dropzone size="md" />
        </FileUpload>
      </Section>
      {/* sm size — a single dense row: bare icon + title + a compact Choose button.
          On error the message drops to a second line; states match lg otherwise. */}
      <Section title="Dropzone size sm">
        <FileUpload
          size="sm"
          completedActions
          multiple
          accept=".zip,.pdf,.ai,.cdr"
          maxSize={25 * 1024 * 1024}
          {...uploadProps}
        >
          <Dropzone size="sm" />
          <FileUploadList />
        </FileUpload>
        <FileUpload multiple accept=".zip,.pdf" maxSize={25 * 1024 * 1024}>
          <Dropzone
            size="sm"
            error
            errorMessage="File exceeds the 25MB limit"
          />
        </FileUpload>
        <FileUpload
          disabled
          multiple
          accept=".zip,.pdf"
          maxSize={25 * 1024 * 1024}
        >
          <Dropzone size="sm" />
        </FileUpload>
      </Section>
      {/* Live upload with completed actions — upload a file, and once it finishes
          the Change/Download bar appears. completedActions wires both for free:
          Change re-picks and replaces in place, Download saves the file. */}
      <Section title="Completed actions (live)">
        <FileUpload
          completedActions
          accept=".zip,.pdf,.jpg,.mp4"
          maxSize={2500 * 1024 * 1024}
          {...uploadProps}
        >
          <Dropzone />
          <FileUploadList />
        </FileUpload>
      </Section>
      {/* Same live flow at sm — once a file finishes, the inline change / download /
          delete icon buttons replace the pause + close (no full-width bar). */}
      <Section title="Completed actions (live) SM">
        <FileUpload
          size="sm"
          completedActions
          accept=".zip,.pdf,.jpg,.mp4"
          maxSize={2500 * 1024 * 1024}
          {...uploadProps}
        >
          <Dropzone size="sm" />
          <FileUploadList />
        </FileUpload>
      </Section>
      {/* Static rows — every upload status shown at once, no upload needed.
          completedActions shows the Change/Download bar on the completed row. */}
      <Section title="File rows">
        <FileUpload multiple completedActions>
          <FileUploadList>
            {ROW_STATES.map((file) => (
              <FileUploadItem key={file.id} file={file} />
            ))}
          </FileUploadList>
        </FileUpload>
      </Section>
      {/* Static rows at sm — a single dense line per status: inline circle + percent
          / label, the check beside the name, and inline change/download/delete on the
          completed row (no full-width action bar). */}
      <Section title="File rows (size sm)">
        <FileUpload size="sm" multiple completedActions>
          <FileUploadList>
            {ROW_STATES.map((file) => (
              <FileUploadItem key={file.id} file={file} />
            ))}
          </FileUploadList>
        </FileUpload>
      </Section>
      {/* Composed rows — pass children to FileUploadItem and include only the
          parts you want. Omitting a part removes it. */}
      <Section title="Composed (omit parts)">
        <FileUpload multiple>
          <FileUploadList>
            {/* No action buttons */}
            <FileUploadItem status="uploading" value={40}>
              <FileUploadItemBackground />
              <FileUploadItemMain>
                <FileUploadItemIcon format="PDF" />
                <FileUploadItemContent>
                  <FileUploadItemHeader>
                    <FileUploadItemName>report.pdf</FileUploadItemName>
                  </FileUploadItemHeader>
                  <FileUploadItemFooter>
                    <FileUploadItemStatus />
                    <FileUploadItemMeta>0.9 MB of 2.3 MB</FileUploadItemMeta>
                  </FileUploadItemFooter>
                </FileUploadItemContent>
              </FileUploadItemMain>
              <FileUploadItemProgress />
            </FileUploadItem>

            {/* No background fill and no progress bar */}
            <FileUploadItem status="uploading" value={40}>
              <FileUploadItemMain>
                <FileUploadItemIcon format="ZIP" />
                <FileUploadItemContent>
                  <FileUploadItemHeader>
                    <FileUploadItemName>assets.zip</FileUploadItemName>
                  </FileUploadItemHeader>
                  <FileUploadItemFooter>
                    <FileUploadItemStatus />
                    <FileUploadItemMeta>0.9 MB of 2.3 MB</FileUploadItemMeta>
                  </FileUploadItemFooter>
                </FileUploadItemContent>
              </FileUploadItemMain>
            </FileUploadItem>

            {/* Minimal — icon, name and status only */}
            <FileUploadItem status="completed">
              <FileUploadItemMain>
                <FileUploadItemIcon format="PNG" />
                <FileUploadItemContent>
                  <FileUploadItemHeader>
                    <FileUploadItemName>logo.png</FileUploadItemName>
                  </FileUploadItemHeader>
                  <FileUploadItemFooter>
                    <FileUploadItemStatus />
                  </FileUploadItemFooter>
                </FileUploadItemContent>
              </FileUploadItemMain>
            </FileUploadItem>
          </FileUploadList>
        </FileUpload>
      </Section>
      {/* No dropzone — a single trigger button feeds the same managed list. */}
      <Section title="Trigger only">
        <FileUpload
          multiple
          accept=".zip,.pdf"
          maxSize={25 * 1024 * 1024}
          {...uploadProps}
        >
          <DropzoneTrigger size="sm">Upload File</DropzoneTrigger>
          <FileUploadList />
        </FileUpload>
      </Section>
      {/* Custom content: own icon, title, description, separator and button. */}
      <Section title="Custom content">
        <FileUpload
          multiple
          accept="image/*"
          maxSize={10 * 1024 * 1024}
          {...uploadProps}
        >
          <Dropzone>
            <DropzoneHeader>
              <DropzoneIcon>
                <RiImageAddLine />
              </DropzoneIcon>
              <DropzoneHeading>
                <DropzoneTitle>Drop your images here</DropzoneTitle>
                <DropzoneDescription>
                  <span>PNG, JPG or GIF, up to 10 MB</span>
                </DropzoneDescription>
              </DropzoneHeading>
            </DropzoneHeader>
            <DropzoneSeparator>or</DropzoneSeparator>
            <DropzoneTrigger variant="primary">Browse images</DropzoneTrigger>
          </Dropzone>
          <FileUploadList />
        </FileUpload>
      </Section>
      {/* Minimal: no separator and no size/format hint — just title + button. */}
      <Section title="Minimal">
        <FileUpload
          multiple
          accept=".zip,.pdf"
          maxSize={25 * 1024 * 1024}
          {...uploadProps}
        >
          <Dropzone>
            <DropzoneHeader>
              <DropzoneIcon />
              <DropzoneHeading>
                <DropzoneTitle>Drag and drop file(s)</DropzoneTitle>
              </DropzoneHeading>
            </DropzoneHeader>
            <DropzoneTrigger>Choose File</DropzoneTrigger>
          </Dropzone>
          <FileUploadList />
        </FileUpload>
      </Section>
      {/* Error appearance — static, driven by the error + errorMessage props. */}
      <Section title="Error (static)">
        <FileUpload multiple accept=".zip,.pdf" maxSize={25 * 1024 * 1024}>
          <Dropzone error errorMessage="File exceeds the 25MB limit" />
        </FileUpload>
      </Section>
      {/* Live validation — rejections surface automatically, no wiring needed.
          Pick a file over 50 KB to see the error. */}
      <Section title="Error (live — max 50 KB)">
        <FileUpload accept=".pdf,.zip" maxSize={50 * 1024} onUpload={onUpload}>
          <Dropzone />
          <FileUploadList />
        </FileUpload>
      </Section>
      {/* Disabled state — driven by the disabled prop on the root. */}
      <Section title="Disabled">
        <FileUpload
          disabled
          multiple
          accept=".zip,.pdf"
          maxSize={25 * 1024 * 1024}
        >
          <Dropzone />
        </FileUpload>
      </Section>
    </div>
  )
}
