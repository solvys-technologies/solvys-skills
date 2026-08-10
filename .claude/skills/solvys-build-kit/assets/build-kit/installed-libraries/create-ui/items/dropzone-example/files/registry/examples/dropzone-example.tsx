"use client"

import * as React from "react"
import { RiImageAddLine } from "@create-ui/assets/icons"

import {
  Dropzone,
  DropzoneDescription,
  DropzoneHeader,
  DropzoneHeading,
  DropzoneIcon,
  DropzoneSeparator,
  DropzoneTitle,
  DropzoneTrigger,
  type DropzoneProps,
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

function AcceptedList({ files }: { files: File[] }) {
  if (files.length === 0) return null
  return (
    <ul className="text-body-sm text-body flex flex-col gap-1">
      {files.map((file, index) => (
        <li key={`${file.name}-${index}`} className="truncate">
          {file.name}
        </li>
      ))}
    </ul>
  )
}

// Standalone dropzone that echoes the files it accepts. The free component
// hands you File[] via onFilesAccepted; a real app would upload them here.
function LiveDropzone(props: DropzoneProps) {
  const [files, setFiles] = React.useState<File[]>([])
  return (
    <div className="flex flex-col gap-3">
      <Dropzone
        {...props}
        onFilesAccepted={(accepted) =>
          setFiles((prev) => [...prev, ...accepted])
        }
      />
      <AcceptedList files={files} />
    </div>
  )
}

function TriggerOnly() {
  const [files, setFiles] = React.useState<File[]>([])
  return (
    <div className="flex flex-col items-start gap-3">
      <DropzoneTrigger
        multiple
        accept=".zip,.pdf"
        maxSize={25 * 1024 * 1024}
        onFilesAccepted={(accepted) =>
          setFiles((prev) => [...prev, ...accepted])
        }
      >
        Upload File
      </DropzoneTrigger>
      <AcceptedList files={files} />
    </div>
  )
}

export default function DropzoneExample() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-16">
      {/* Default lg — drag or click; the accepted files are listed below.
          Description is derived automatically from accept + maxSize. */}
      <Section title="Default (lg)">
        <LiveDropzone
          multiple
          accept=".zip,.pdf,.ai,.cdr,.csv,.jpg,.mp4"
          maxSize={2500 * 1024 * 1024}
        />
      </Section>
      {/* md — compact inline bar; managed, static error, disabled. */}
      <Section title="Size md">
        <LiveDropzone
          size="md"
          multiple
          accept=".zip,.pdf,.ai,.cdr"
          maxSize={25 * 1024 * 1024}
        />
        <Dropzone
          size="md"
          accept=".zip,.pdf"
          maxSize={25 * 1024 * 1024}
          error
          errorMessage="File exceeds the 25MB limit"
        />
        <Dropzone
          size="md"
          disabled
          multiple
          accept=".zip,.pdf"
          maxSize={25 * 1024 * 1024}
        />
      </Section>
      {/* sm — dense single row; managed, static error, disabled. */}
      <Section title="Size sm">
        <LiveDropzone
          size="sm"
          multiple
          accept=".zip,.pdf,.ai,.cdr"
          maxSize={25 * 1024 * 1024}
        />
        <Dropzone
          size="sm"
          accept=".zip,.pdf"
          maxSize={25 * 1024 * 1024}
          error
          errorMessage="File exceeds the 25MB limit"
        />
        <Dropzone
          size="sm"
          disabled
          multiple
          accept=".zip,.pdf"
          maxSize={25 * 1024 * 1024}
        />
      </Section>
      {/* Custom content — own icon, title, description, separator and button. */}
      <Section title="Custom content">
        <LiveDropzone multiple accept="image/*" maxSize={10 * 1024 * 1024}>
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
        </LiveDropzone>
      </Section>
      {/* Minimal — no separator and no hint, just title + button. */}
      <Section title="Minimal">
        <LiveDropzone multiple accept=".zip,.pdf" maxSize={25 * 1024 * 1024}>
          <DropzoneHeader>
            <DropzoneIcon />
            <DropzoneHeading>
              <DropzoneTitle>Drag and drop file(s)</DropzoneTitle>
            </DropzoneHeading>
          </DropzoneHeader>
          <DropzoneTrigger>Choose File</DropzoneTrigger>
        </LiveDropzone>
      </Section>
      {/* Error appearance — static, driven by the error + errorMessage props. */}
      <Section title="Error (static)">
        <Dropzone
          multiple
          accept=".zip,.pdf"
          maxSize={25 * 1024 * 1024}
          error
          errorMessage="File exceeds the 25MB limit"
        />
      </Section>
      {/* Live validation — pick a file over 50 KB to see the rejection. */}
      <Section title="Error (live — max 50 KB)">
        <LiveDropzone accept=".pdf,.zip" maxSize={50 * 1024} />
      </Section>
      {/* Trigger only — a single button that opens the picker, no drop area. */}
      <Section title="Trigger only">
        <TriggerOnly />
      </Section>
      {/* Disabled — driven by the disabled prop. */}
      <Section title="Disabled">
        <Dropzone
          disabled
          multiple
          accept=".zip,.pdf"
          maxSize={25 * 1024 * 1024}
        />
      </Section>
    </div>
  )
}
