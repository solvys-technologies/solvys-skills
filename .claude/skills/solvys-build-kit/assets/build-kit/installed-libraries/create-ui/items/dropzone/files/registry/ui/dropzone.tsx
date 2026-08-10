"use client"

import * as React from "react"
import { RiErrorWarningFill, RiUploadCloud2Line } from "@create-ui/assets/icons"
import { cva, type VariantProps } from "class-variance-authority"

import {
  describeAccept,
  formatBytes,
  useDropzone,
} from "@/registry/hooks/use-dropzone"
import { cn } from "@/registry/lib/utils"
import { Button } from "@/registry/ui/button"

type DropzoneSize = "sm" | "md" | "lg"
type DropzoneState = "idle" | "dragging" | "error" | "disabled"

type DropzoneContextValue = {
  accept?: string
  maxSize?: number
  multiple?: boolean
  disabled?: boolean
  error?: boolean
  errorMessage?: React.ReactNode
  onFilesAccepted?: (files: File[]) => void
  onFileReject?: (file: File, reason: string) => void
}

const DropzoneContext = React.createContext<DropzoneContextValue | null>(null)

function useDropzoneContext() {
  return React.useContext(DropzoneContext)
}

type DropzoneTriggerContextValue = {
  openFileDialog: () => void
  disabled: boolean
}

const DropzoneTriggerContext =
  React.createContext<DropzoneTriggerContextValue | null>(null)

const DropzoneStateContext = React.createContext<DropzoneState>("idle")
const DropzoneSizeContext = React.createContext<DropzoneSize>("lg")

const DROPZONE_ICON_BOX: Record<DropzoneState, string> = {
  idle: "border-stable-weak bg-static text-stable-base border",
  dragging: "border-primary-weakest bg-static text-primary-base border",
  error: "bg-error-base text-white",
  disabled: "border-stable-weak bg-static text-stable-base border opacity-50",
}

const DROPZONE_TITLE_TEXT: Record<DropzoneState, string> = {
  idle: "text-body",
  dragging: "text-strongest",
  error: "text-strongest",
  disabled: "text-disabled",
}

const DROPZONE_DESCRIPTION_TEXT: Record<DropzoneState, string> = {
  idle: "text-placeholder",
  dragging: "text-body",
  error: "text-body",
  disabled: "text-disabled",
}

const DROPZONE_LINK_TEXT: Record<DropzoneState, string> = {
  idle: "text-primary-base",
  dragging: "text-primary-base",
  error: "text-primary-base",
  disabled: "text-disabled",
}

const dropzoneVariants = cva(
  [
    // base
    "relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed text-center transition-colors",
    // idle
    "border-medium bg-weak",
    // dragging
    "data-[state=dragging]:border-solid data-[state=dragging]:border-primary-base data-[state=dragging]:bg-primary-weakest",
    // error
    "data-[state=error]:border-error-base data-[state=error]:bg-error-weakest",
    // disabled
    "data-[state=disabled]:pointer-events-none",
  ],
  {
    variants: {
      size: {
        sm: "p-component-md",
        md: "min-h-[76px] p-component-lg",
        lg: "min-h-[268px] p-section-lg",
      },
    },
    defaultVariants: { size: "lg" },
  }
)

type DropzoneProps = Omit<React.ComponentProps<"div">, "onChange"> &
  VariantProps<typeof dropzoneVariants> & {
    accept?: string
    maxSize?: number
    multiple?: boolean
    disabled?: boolean
    error?: boolean
    errorMessage?: React.ReactNode
    title?: React.ReactNode
    description?: React.ReactNode
    onFilesAccepted?: (files: File[]) => void
    onFileReject?: (file: File, reason: string) => void
  }

function Dropzone({
  className,
  size = "lg",
  accept: acceptProp,
  maxSize: maxSizeProp,
  multiple: multipleProp,
  disabled: disabledProp,
  error,
  errorMessage,
  title,
  description,
  onFilesAccepted: onFilesAcceptedProp,
  onFileReject: onFileRejectProp,
  children,
  ...props
}: DropzoneProps) {
  const ctx = useDropzoneContext()
  const accept = acceptProp ?? ctx?.accept
  const maxSize = maxSizeProp ?? ctx?.maxSize
  const multiple = multipleProp ?? ctx?.multiple ?? false
  const disabled = disabledProp ?? ctx?.disabled ?? false
  const onFilesAccepted = onFilesAcceptedProp ?? ctx?.onFilesAccepted
  const onFileReject = onFileRejectProp ?? ctx?.onFileReject

  const dz = useDropzone({
    accept,
    maxSize,
    multiple,
    disabled,
    onFilesAccepted,
    onFileReject,
  })

  const isError =
    error ?? (dz.rejectionMessage != null || (ctx?.error ?? false))
  const message =
    errorMessage ?? dz.rejectionMessage ?? ctx?.errorMessage ?? null

  const state: DropzoneState = disabled
    ? "disabled"
    : dz.isDragging
      ? "dragging"
      : isError
        ? "error"
        : "idle"

  const sizeLine = maxSize != null ? `Max ${formatBytes(maxSize)} each` : null
  const formatLine = describeAccept(accept)

  const isMd = size === "md"
  const isSm = size === "sm"

  const resolvedTitle =
    title ??
    (isMd ? (
      <>
        Drag and drop file(s) or{" "}
        <button
          type="button"
          disabled={disabled}
          onClick={dz.openFileDialog}
          className={cn(
            "focus-visible:outline-primary-500 cursor-pointer outline-2 outline-offset-2 outline-transparent",
            DROPZONE_LINK_TEXT[state]
          )}
        >
          choose file(s)
        </button>
      </>
    ) : (
      "Drag and drop file(s)"
    ))

  const mdHint = [sizeLine, formatLine].filter(Boolean).join(", ")
  const mdHintNode =
    state === "error" ? (
      message && (
        <span role="alert" className="text-error-base">
          {message}
        </span>
      )
    ) : mdHint ? (
      <span>{mdHint}.</span>
    ) : null
  const mdDescription =
    description !== undefined ? (
      description ? (
        <DropzoneDescription>{description}</DropzoneDescription>
      ) : null
    ) : mdHintNode ? (
      <DropzoneDescription>{mdHintNode}</DropzoneDescription>
    ) : null

  return (
    <DropzoneTriggerContext.Provider
      value={{ openFileDialog: dz.openFileDialog, disabled }}
    >
      <DropzoneStateContext.Provider value={state}>
        <DropzoneSizeContext.Provider value={size ?? "lg"}>
          <div
            data-slot="dropzone"
            data-state={state}
            data-size={size}
            aria-disabled={disabled || undefined}
            aria-invalid={isError || undefined}
            onClick={(event) => {
              if (disabled) return
              if (
                (event.target as HTMLElement).closest(
                  "button, a, input, label, [role='button']"
                )
              ) {
                return
              }
              dz.openFileDialog()
            }}
            {...dz.getDropzoneProps()}
            className={cn(dropzoneVariants({ size }), className)}
            {...props}
          >
            <div
              className={
                isSm
                  ? "gap-component-sm flex w-full flex-col items-start"
                  : isMd
                    ? "gap-component-md flex w-full items-center"
                    : "flex w-full max-w-[300px] flex-col items-center gap-4"
              }
            >
              {children ??
                (isSm ? (
                  <>
                    <div className="gap-component-sm flex w-full items-center">
                      <div className="gap-component-sm flex min-w-0 flex-1 items-center">
                        <DropzoneIcon />
                        <DropzoneTitle>{resolvedTitle}</DropzoneTitle>
                      </div>
                      <DropzoneTrigger
                        size="xs"
                        appearance={state === "disabled" ? "outline" : "solid"}
                        className="shrink-0"
                      >
                        Choose
                      </DropzoneTrigger>
                    </div>
                    {state === "error" && message && (
                      <div className="gap-component-xs flex w-full items-center">
                        <RiErrorWarningFill className="text-error-base size-4 shrink-0" />
                        <p className="text-paragraph-xs text-error-base min-w-0 flex-1 text-left">
                          {message}
                        </p>
                      </div>
                    )}
                  </>
                ) : isMd ? (
                  <>
                    <DropzoneIcon />
                    <DropzoneHeading className="min-w-0 flex-1 items-start">
                      <DropzoneTitle>{resolvedTitle}</DropzoneTitle>
                      {mdDescription}
                    </DropzoneHeading>
                  </>
                ) : (
                  <>
                    <DropzoneHeader>
                      <DropzoneIcon />
                      <DropzoneHeading>
                        <DropzoneTitle>{resolvedTitle}</DropzoneTitle>
                        {description !== undefined ? (
                          description ? (
                            <DropzoneDescription>
                              {description}
                            </DropzoneDescription>
                          ) : null
                        ) : (
                          <DropzoneDescription>
                            {sizeLine && <span>{sizeLine}</span>}
                            {state === "error"
                              ? message && (
                                  <span
                                    role="alert"
                                    className="text-error-base"
                                  >
                                    {message}
                                  </span>
                                )
                              : formatLine && <span>{formatLine}</span>}
                          </DropzoneDescription>
                        )}
                      </DropzoneHeading>
                    </DropzoneHeader>
                    <DropzoneSeparator />
                    <DropzoneTrigger
                      appearance={state === "disabled" ? "outline" : "solid"}
                    >
                      {state === "error" ? "Choose Again" : "Choose File"}
                    </DropzoneTrigger>
                  </>
                ))}
            </div>
            <input {...dz.getInputProps()} />
          </div>
        </DropzoneSizeContext.Provider>
      </DropzoneStateContext.Provider>
    </DropzoneTriggerContext.Provider>
  )
}

function DropzoneHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropzone-header"
      className={cn("gap-component-md flex flex-col items-center", className)}
      {...props}
    />
  )
}

function DropzoneHeading({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropzone-heading"
      className={cn("gap-component-xs flex flex-col items-center", className)}
      {...props}
    />
  )
}

function DropzoneIcon({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const state = React.useContext(DropzoneStateContext)
  const size = React.useContext(DropzoneSizeContext)

  if (size === "sm") {
    return (
      <div
        data-slot="dropzone-icon"
        className={cn(
          "flex size-4 shrink-0 items-center justify-center [&>svg]:size-4",
          DROPZONE_TITLE_TEXT[state],
          className
        )}
        {...props}
      >
        {children ?? <RiUploadCloud2Line />}
      </div>
    )
  }

  return (
    <div
      data-slot="dropzone-icon"
      className={cn(
        "flex size-[42px] items-center justify-center overflow-clip rounded-lg [&>svg]:size-6",
        DROPZONE_ICON_BOX[state],
        className
      )}
      {...props}
    >
      {children ??
        (state === "error" ? <RiErrorWarningFill /> : <RiUploadCloud2Line />)}
    </div>
  )
}

function DropzoneTitle({ className, ...props }: React.ComponentProps<"p">) {
  const state = React.useContext(DropzoneStateContext)
  const size = React.useContext(DropzoneSizeContext)
  return (
    <p
      data-slot="dropzone-title"
      className={cn(
        "text-ui-control-md font-semibold",
        size === "lg" ? "text-center" : "text-left",
        DROPZONE_TITLE_TEXT[state],
        className
      )}
      {...props}
    />
  )
}

function DropzoneDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const state = React.useContext(DropzoneStateContext)
  const size = React.useContext(DropzoneSizeContext)
  return (
    <div
      data-slot="dropzone-description"
      className={cn(
        "text-body-sm flex flex-col gap-1",
        size === "lg" ? "text-center" : "text-left",
        DROPZONE_DESCRIPTION_TEXT[state],
        className
      )}
      {...props}
    />
  )
}

function DropzoneSeparator({
  className,
  children = "OR",
  ...props
}: React.ComponentProps<"div">) {
  const state = React.useContext(DropzoneStateContext)
  const lineClass = "border-light h-0 flex-1 border-t border-dashed"
  return (
    <div
      data-slot="dropzone-separator"
      role="separator"
      aria-orientation="horizontal"
      className={cn(
        "flex w-full items-center gap-3",
        state === "disabled" && "opacity-50",
        className
      )}
      {...props}
    >
      <span aria-hidden="true" className={lineClass} />
      <span className="text-placeholder text-ui-control-md inline-flex shrink-0 items-center [&>svg]:size-6">
        {children}
      </span>
      <span aria-hidden="true" className={lineClass} />
    </div>
  )
}

type DropzoneTriggerProps = React.ComponentProps<typeof Button> &
  Pick<
    DropzoneContextValue,
    "accept" | "maxSize" | "multiple" | "onFilesAccepted" | "onFileReject"
  >

function DropzoneTrigger({
  variant = "neutral-solid",
  size = "lg",
  onClick,
  disabled,
  accept,
  maxSize,
  multiple,
  onFilesAccepted,
  onFileReject,
  ...props
}: DropzoneTriggerProps) {
  const triggerCtx = React.useContext(DropzoneTriggerContext)
  const ctx = useDropzoneContext()
  const dz = useDropzone({
    accept: accept ?? ctx?.accept,
    maxSize: maxSize ?? ctx?.maxSize,
    multiple: multiple ?? ctx?.multiple,
    disabled: disabled ?? ctx?.disabled,
    onFilesAccepted: onFilesAccepted ?? ctx?.onFilesAccepted,
    onFileReject: onFileReject ?? ctx?.onFileReject,
  })

  const resolvedDisabled = triggerCtx?.disabled ?? disabled ?? ctx?.disabled
  const openFileDialog = triggerCtx?.openFileDialog ?? dz.openFileDialog

  return (
    <>
      <Button
        data-slot="dropzone-trigger"
        variant={variant}
        size={size}
        disabled={resolvedDisabled}
        onClick={(event) => {
          openFileDialog()
          onClick?.(event)
        }}
        {...props}
      />
      {!triggerCtx && <input {...dz.getInputProps()} />}
    </>
  )
}

export {
  Dropzone,
  DropzoneIcon,
  DropzoneTitle,
  DropzoneDescription,
  DropzoneHeader,
  DropzoneHeading,
  DropzoneSeparator,
  DropzoneTrigger,
  DropzoneContext,
  useDropzoneContext,
  dropzoneVariants,
}
export type { DropzoneProps, DropzoneSize, DropzoneContextValue }
