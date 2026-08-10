"use client"

import * as React from "react"

function formatBytes(bytes: number) {
  if (bytes <= 0) return "0 MB"
  const gb = bytes / 1024 ** 3
  if (gb >= 1) {
    return `${gb % 1 === 0 ? gb : gb.toFixed(1)} GB`
  }
  const mb = bytes / (1024 * 1024)
  if (mb >= 1) {
    return `${mb % 1 === 0 ? mb : mb.toFixed(1)} MB`
  }
  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

function matchesAccept(file: File, accept?: string) {
  if (!accept) return true
  const tokens = accept
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)
  if (tokens.length === 0) return true
  const name = file.name.toLowerCase()
  const mime = file.type.toLowerCase()
  return tokens.some((token) => {
    if (token.startsWith(".")) return name.endsWith(token)
    if (token.endsWith("/*")) return mime.startsWith(token.slice(0, -1))
    return mime === token
  })
}

// Accept + size validation, shared by the dropzone input, drop and replace flows.
// Returns a rejection reason, or null if the file is allowed.
function getFileRejectionReason(
  file: File,
  opts: { accept?: string; maxSize?: number }
): string | null {
  if (!matchesAccept(file, opts.accept)) return "File type is not allowed"
  if (opts.maxSize != null && file.size > opts.maxSize) {
    return `File exceeds the ${formatBytes(opts.maxSize)} limit`
  }
  return null
}

const MIME_WILDCARD_LABEL: Record<string, string> = {
  image: "Images",
  video: "Videos",
  audio: "Audio",
  text: "Text files",
}

function describeAccept(accept?: string) {
  if (!accept) return null
  const labels: string[] = []
  for (const raw of accept.split(",")) {
    const token = raw.trim().toLowerCase()
    if (!token) continue
    let label: string
    if (token.includes("/")) {
      const [type, subtype] = token.split("/")
      label =
        subtype === "*"
          ? (MIME_WILDCARD_LABEL[type] ??
            `${type.charAt(0).toUpperCase()}${type.slice(1)} files`)
          : subtype.replace(/^(x-|vnd\.)/, "").toUpperCase()
    } else {
      label = token.replace(/^\./, "").toUpperCase()
    }
    if (label && !labels.includes(label)) labels.push(label)
  }
  if (labels.length === 0) return null
  if (labels.length === 1) return `Only ${labels[0]}`
  return `Only ${labels.slice(0, -1).join(", ")} or ${labels[labels.length - 1]}`
}

type UseDropzoneOptions = {
  accept?: string
  maxSize?: number
  multiple?: boolean
  disabled?: boolean
  onFilesAccepted?: (files: File[]) => void
  onFileReject?: (file: File, reason: string) => void
}

function useDropzone(options: UseDropzoneOptions = {}) {
  const { multiple = false, accept, disabled = false } = options

  const optionsRef = React.useRef(options)
  React.useEffect(() => {
    optionsRef.current = options
  })

  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const dragDepthRef = React.useRef(0)
  const [rejectionMessage, setRejectionMessage] = React.useState<string | null>(
    null
  )

  const intake = React.useCallback((input: FileList | File[]) => {
    const opts = optionsRef.current
    if (opts.disabled) return
    const incoming = opts.multiple
      ? Array.from(input)
      : Array.from(input).slice(0, 1)
    const accepted: File[] = []
    let rejection: string | null = null
    for (const file of incoming) {
      const reason = getFileRejectionReason(file, {
        accept: opts.accept,
        maxSize: opts.maxSize,
      })
      if (reason) {
        rejection = reason
        opts.onFileReject?.(file, reason)
        continue
      }
      accepted.push(file)
    }
    setRejectionMessage(rejection)
    if (accepted.length > 0) opts.onFilesAccepted?.(accepted)
  }, [])

  const clearRejection = React.useCallback(() => setRejectionMessage(null), [])

  const openFileDialog = React.useCallback(() => {
    if (!optionsRef.current.disabled) inputRef.current?.click()
  }, [])

  const getInputProps = React.useCallback(
    () => ({
      ref: inputRef,
      type: "file" as const,
      hidden: true,
      multiple,
      accept,
      disabled,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) intake(event.target.files)
        event.target.value = ""
      },
    }),
    [accept, disabled, intake, multiple]
  )

  const getDropzoneProps = React.useCallback(
    () => ({
      onDragEnter: (event: React.DragEvent) => {
        if (optionsRef.current.disabled) return
        event.preventDefault()
        dragDepthRef.current += 1
        setIsDragging(true)
      },
      onDragOver: (event: React.DragEvent) => {
        // preventDefault is required for the drop to fire at all.
        if (optionsRef.current.disabled) return
        event.preventDefault()
      },
      onDragLeave: (event: React.DragEvent) => {
        if (optionsRef.current.disabled) return
        event.preventDefault()
        dragDepthRef.current = Math.max(0, dragDepthRef.current - 1)
        if (dragDepthRef.current === 0) setIsDragging(false)
      },
      onDrop: (event: React.DragEvent) => {
        if (optionsRef.current.disabled) return
        event.preventDefault()
        dragDepthRef.current = 0
        setIsDragging(false)
        if (event.dataTransfer.files) intake(event.dataTransfer.files)
      },
    }),
    [intake]
  )

  return {
    isDragging,
    rejectionMessage,
    clearRejection,
    openFileDialog,
    inputRef,
    getInputProps,
    getDropzoneProps,
  }
}

export {
  useDropzone,
  formatBytes,
  matchesAccept,
  describeAccept,
  getFileRejectionReason,
}
export type { UseDropzoneOptions }
