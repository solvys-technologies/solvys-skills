"use client"

import * as React from "react"

import {
  formatBytes,
  getFileRejectionReason,
} from "@/registry/hooks/use-dropzone"

type FileUploadStatus =
  | "queued"
  | "uploading"
  | "paused"
  | "completed"
  | "error"

type UploadFile = {
  id: string
  file?: File
  name: string
  size: number
  status: FileUploadStatus
  progress: number
  error?: string
  format: string
  url?: string
}

type UploadHandlers = {
  onProgress: (id: string, progress: number) => void
  onSuccess: (id: string) => void
  onError: (id: string, error: string) => void
}

type UseFileUploadOptions = {
  defaultFiles?: UploadFile[]
  files?: UploadFile[]
  onFilesChange?: (files: UploadFile[]) => void
  multiple?: boolean
  accept?: string
  maxSize?: number
  maxFiles?: number
  disabled?: boolean
  onFileAccept?: (file: UploadFile) => void
  onFileReject?: (file: File, reason: string) => void
  onRemove?: (file: UploadFile) => void
  // Pause/resume keeps the current progress, so the upload continues in place.
  onPause?: (file: UploadFile) => void
  onResume?: (file: UploadFile) => void
  onUpload?: (
    files: UploadFile[],
    handlers: UploadHandlers
  ) => void | Promise<void>
}

function clampPercentage(value: number) {
  return Math.min(Math.max(value, 0), 100)
}

let idCounter = 0
function generateId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  idCounter += 1
  return `file-${idCounter}`
}

function getFormat(name: string) {
  const ext = name.includes(".") ? name.split(".").pop() : ""
  return ext ? ext.toUpperCase() : "FILE"
}

function toUploadFile(file: File): UploadFile {
  return {
    id: generateId(),
    file,
    name: file.name,
    size: file.size,
    status: "queued",
    progress: 0,
    format: getFormat(file.name),
  }
}

// Duplicate + maxFiles validation, layered on top of the dropzone's accept and
// size checks. Returns a rejection reason, or null if the file is allowed.
function getListRejectionReason(
  file: File,
  opts: {
    maxFiles?: number
    existing: { name: string; size: number }[]
    count: number
  }
): string | null {
  if (opts.maxFiles != null && opts.count >= opts.maxFiles) {
    return `Only ${opts.maxFiles} file(s) allowed`
  }
  if (opts.existing.some((o) => o.name === file.name && o.size === file.size)) {
    return "File already added"
  }
  return null
}

function useFileUpload(options: UseFileUploadOptions = {}) {
  const {
    defaultFiles,
    files: controlledFiles,
    multiple = false,
    accept,
    maxSize,
    disabled = false,
  } = options

  const isControlled = controlledFiles !== undefined
  const [internalFiles, setInternalFiles] = React.useState<UploadFile[]>(
    defaultFiles ?? []
  )
  const files = isControlled ? controlledFiles : internalFiles

  const filesRef = React.useRef(files)
  const optionsRef = React.useRef(options)
  React.useEffect(() => {
    filesRef.current = files
    optionsRef.current = options
  })

  const [rejectionMessage, setRejectionMessage] = React.useState<string | null>(
    null
  )

  const setFiles = React.useCallback(
    (updater: (prev: UploadFile[]) => UploadFile[]) => {
      const next = updater(filesRef.current)
      filesRef.current = next
      if (!isControlled) setInternalFiles(next)
      optionsRef.current.onFilesChange?.(next)
    },
    [isControlled]
  )

  const startUpload = React.useCallback(
    (batch: UploadFile[]) => {
      const { onUpload } = optionsRef.current
      if (!onUpload || batch.length === 0) return
      const ids = new Set(batch.map((file) => file.id))
      setFiles((prev) =>
        prev.map((file) =>
          ids.has(file.id)
            ? { ...file, status: "uploading", progress: 0, error: undefined }
            : file
        )
      )
      onUpload(
        batch.map((file) => ({
          ...file,
          status: "uploading" as const,
          progress: 0,
          error: undefined,
        })),
        {
          onProgress: (id, progress) =>
            setFiles((prev) =>
              prev.map((file) =>
                file.id === id
                  ? { ...file, progress: clampPercentage(progress) }
                  : file
              )
            ),
          onSuccess: (id) =>
            setFiles((prev) =>
              prev.map((file) =>
                file.id === id
                  ? { ...file, status: "completed", progress: 100 }
                  : file
              )
            ),
          onError: (id, error) =>
            setFiles((prev) =>
              prev.map((file) =>
                file.id === id ? { ...file, status: "error", error } : file
              )
            ),
        }
      )
    },
    [setFiles]
  )

  const commit = React.useCallback(
    (accepted: UploadFile[]) => {
      if (accepted.length === 0) return
      setFiles((prev) =>
        optionsRef.current.multiple ? [...prev, ...accepted] : accepted
      )
      startUpload(accepted)
    },
    [setFiles, startUpload]
  )

  // Files that already cleared the dropzone's accept and size checks; here we
  // only layer on the list rules (duplicate, maxFiles) before uploading.
  const onFilesAccepted = React.useCallback(
    (incoming: File[]) => {
      const opts = optionsRef.current
      const accepted: UploadFile[] = []
      let rejection: string | null = null
      let count = opts.multiple ? filesRef.current.length : 0
      for (const file of incoming) {
        const reason = getListRejectionReason(file, {
          maxFiles: opts.maxFiles,
          existing: [...filesRef.current, ...accepted],
          count,
        })
        if (reason) {
          rejection = reason
          opts.onFileReject?.(file, reason)
          continue
        }
        const uploadFile = toUploadFile(file)
        accepted.push(uploadFile)
        count += 1
        opts.onFileAccept?.(uploadFile)
      }
      setRejectionMessage(rejection)
      commit(accepted)
    },
    [commit]
  )

  // Headless entry point (no dropzone): run the full accept, size and list checks.
  const addFiles = React.useCallback(
    (input: FileList | File[]) => {
      const opts = optionsRef.current
      if (opts.disabled) return
      const accepted: UploadFile[] = []
      let rejection: string | null = null
      let count = opts.multiple ? filesRef.current.length : 0
      const incoming = opts.multiple
        ? Array.from(input)
        : Array.from(input).slice(0, 1)
      for (const file of incoming) {
        const reason =
          getFileRejectionReason(file, {
            accept: opts.accept,
            maxSize: opts.maxSize,
          }) ??
          getListRejectionReason(file, {
            maxFiles: opts.maxFiles,
            existing: [...filesRef.current, ...accepted],
            count,
          })
        if (reason) {
          rejection = reason
          opts.onFileReject?.(file, reason)
          continue
        }
        const uploadFile = toUploadFile(file)
        accepted.push(uploadFile)
        count += 1
        opts.onFileAccept?.(uploadFile)
      }
      setRejectionMessage(rejection)
      commit(accepted)
    },
    [commit]
  )

  const removeFile = React.useCallback(
    (id: string) => {
      const target = filesRef.current.find((file) => file.id === id)
      setFiles((prev) => prev.filter((file) => file.id !== id))
      if (target) optionsRef.current.onRemove?.(target)
    },
    [setFiles]
  )

  const retryFile = React.useCallback(
    (id: string) => {
      const target = filesRef.current.find((file) => file.id === id)
      if (target) startUpload([target])
    },
    [startUpload]
  )

  const pauseFile = React.useCallback(
    (id: string) => {
      setFiles((prev) =>
        prev.map((file) =>
          file.id === id ? { ...file, status: "paused" } : file
        )
      )
      const target = filesRef.current.find((file) => file.id === id)
      if (target) optionsRef.current.onPause?.(target)
    },
    [setFiles]
  )

  const resumeFile = React.useCallback(
    (id: string) => {
      setFiles((prev) =>
        prev.map((file) =>
          file.id === id
            ? { ...file, status: "uploading", error: undefined }
            : file
        )
      )
      const target = filesRef.current.find((file) => file.id === id)
      if (target) optionsRef.current.onResume?.(target)
    },
    [setFiles]
  )

  const clearFiles = React.useCallback(() => setFiles(() => []), [setFiles])

  const clearRejection = React.useCallback(() => setRejectionMessage(null), [])

  // Open a picker and replace the file in place, then re-upload.
  const replaceFile = React.useCallback(
    (id: string) => {
      const opts = optionsRef.current
      if (opts.disabled) return
      const input = document.createElement("input")
      input.type = "file"
      if (opts.accept) input.accept = opts.accept
      input.onchange = () => {
        const picked = input.files?.[0]
        if (!picked) return
        // Skip maxFiles (the count is unchanged) and exclude this row from the
        // duplicate check so re-picking the same file is allowed.
        const reason =
          getFileRejectionReason(picked, {
            accept: opts.accept,
            maxSize: opts.maxSize,
          }) ??
          getListRejectionReason(picked, {
            existing: filesRef.current.filter((file) => file.id !== id),
            count: 0,
          })
        if (reason) {
          setRejectionMessage(reason)
          opts.onFileReject?.(picked, reason)
          return
        }
        const replacement = toUploadFile(picked)
        setFiles((prev) =>
          prev.map((file) => (file.id === id ? replacement : file))
        )
        setRejectionMessage(null)
        startUpload([replacement])
        opts.onFileAccept?.(replacement)
      }
      input.click()
    },
    [setFiles, startUpload]
  )

  return {
    files,
    disabled,
    accept,
    maxSize,
    multiple,
    rejectionMessage,
    addFiles,
    onFilesAccepted,
    removeFile,
    retryFile,
    pauseFile,
    resumeFile,
    clearFiles,
    clearRejection,
    replaceFile,
  }
}

export { useFileUpload, formatBytes, clampPercentage, getFormat }
export type {
  UploadFile,
  UploadHandlers,
  UseFileUploadOptions,
  FileUploadStatus,
}
