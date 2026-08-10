"use client"

import * as React from "react"
import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiDeleteBin5Fill,
  RiErrorWarningFill,
  RiFlashlightFill,
  RiInformationFill,
  RiTimeFill,
} from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import {
  Toast,
  ToastAction,
  ToastBody,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastProgress,
  ToastTitle,
} from "@/registry/ui/toast"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const variants = [
  "primary",
  "danger",
  "success",
  "info",
  "warning",
  "away",
  "neutral",
] as const

const appearances = ["default", "solid", "soft", "outline"] as const

const variantIcons: Record<(typeof variants)[number], React.ElementType> = {
  primary: RiFlashlightFill,
  danger: RiErrorWarningFill,
  success: RiCheckboxCircleFill,
  info: RiInformationFill,
  warning: RiAlertFill,
  away: RiTimeFill,
  neutral: RiInformationFill,
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function ToastExample() {
  return (
    <div className="flex flex-col gap-16 p-4 sm:p-6 lg:p-12">
      <VariantAppearanceMatrix />
      <ProgressSection />
      <MinimalSection />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Variant × Appearance matrix
// ---------------------------------------------------------------------------

function VariantAppearanceMatrix() {
  return (
    <SectionFrame title="Variants × Appearances">
      <table className="border-separate border-spacing-x-6 border-spacing-y-4">
        <thead>
          <tr>
            <th />
            {appearances.map((appearance) => (
              <th
                key={appearance}
                className="text-body pb-2 text-left text-xs font-medium capitalize"
              >
                {appearance}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => {
            const Icon = variantIcons[variant]
            return (
              <tr key={variant}>
                <td className="text-body pr-2 text-right align-middle text-xs font-medium capitalize">
                  {variant}
                </td>
                {appearances.map((appearance) => (
                  <td key={appearance} className="align-top">
                    <Toast variant={variant} appearance={appearance}>
                      <ToastBody>
                        <ToastIcon>
                          <Icon />
                        </ToastIcon>
                        <ToastContent>
                          <ToastTitle>System Notification</ToastTitle>
                          <ToastDescription>
                            Please review the details and take action
                          </ToastDescription>
                        </ToastContent>
                        <ToastAction>Undo</ToastAction>
                      </ToastBody>
                      <ToastClose />
                      <ToastProgress value={15} />
                    </Toast>
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Progress
// ---------------------------------------------------------------------------

const PROGRESS_STEPS = [0, 25, 45, 75, 100]
const PROGRESS_TWEEN_MS = 1200

function useSteppedProgress(intervalMs: number) {
  const [value, setValue] = React.useState(PROGRESS_STEPS[0])
  const [cycle, setCycle] = React.useState(0)

  React.useEffect(() => {
    let stepIndex = 0
    const timer = setInterval(() => {
      stepIndex = (stepIndex + 1) % PROGRESS_STEPS.length
      if (stepIndex === 0) {
        setCycle((c) => c + 1)
      }
      setValue(PROGRESS_STEPS[stepIndex])
    }, intervalMs)
    return () => clearInterval(timer)
  }, [intervalMs])

  return { value, cycle }
}

function ProgressSection() {
  const uploading = useSteppedProgress(800)
  const almostDone = useSteppedProgress(1000)
  const processing = useSteppedProgress(1200)

  return (
    <SectionFrame title="Progress">
      <div className="flex flex-wrap items-start gap-3">
        <Toast variant="info" appearance="solid">
          <ToastBody>
            <ToastIcon>
              <RiInformationFill />
            </ToastIcon>
            <ToastContent>
              <ToastTitle>Uploading...</ToastTitle>
              <ToastDescription>{uploading.value}% complete</ToastDescription>
            </ToastContent>
          </ToastBody>
          <ToastClose />
          <ToastProgress
            key={uploading.cycle}
            value={uploading.value}
            duration={PROGRESS_TWEEN_MS}
          />
        </Toast>

        <Toast variant="success" appearance="soft">
          <ToastBody>
            <ToastIcon>
              <RiCheckboxCircleFill />
            </ToastIcon>
            <ToastContent>
              <ToastTitle>Almost done</ToastTitle>
              <ToastDescription>{almostDone.value}% complete</ToastDescription>
            </ToastContent>
          </ToastBody>
          <ToastClose />
          <ToastProgress
            key={almostDone.cycle}
            value={almostDone.value}
            duration={PROGRESS_TWEEN_MS}
          />
        </Toast>

        <Toast variant="primary" appearance="default">
          <ToastBody>
            <ToastIcon>
              <RiFlashlightFill />
            </ToastIcon>
            <ToastContent>
              <ToastTitle>Processing</ToastTitle>
              <ToastDescription>{processing.value}% complete</ToastDescription>
            </ToastContent>
          </ToastBody>
          <ToastClose />
          <ToastProgress
            key={processing.cycle}
            value={processing.value}
            duration={PROGRESS_TWEEN_MS}
          />
        </Toast>
      </div>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Minimal (title only)
// ---------------------------------------------------------------------------

function MinimalSection() {
  return (
    <SectionFrame title="Minimal">
      <div className="flex flex-wrap items-start gap-3">
        <Toast variant="success" appearance="solid">
          <ToastBody>
            <ToastIcon>
              <RiCheckboxCircleFill />
            </ToastIcon>
            <ToastContent>
              <ToastTitle>Changes saved successfully</ToastTitle>
            </ToastContent>
          </ToastBody>
          <ToastClose />
        </Toast>

        <Toast variant="danger" appearance="default">
          <ToastBody>
            <ToastIcon>
              <RiErrorWarningFill />
            </ToastIcon>
            <ToastContent>
              <ToastTitle>Something went wrong</ToastTitle>
            </ToastContent>
            <ToastAction>Retry</ToastAction>
          </ToastBody>
          <ToastClose />
        </Toast>

        <Toast variant="neutral" appearance="soft">
          <ToastBody>
            <ToastIcon>
              <RiDeleteBin5Fill />
            </ToastIcon>
            <ToastContent>
              <ToastTitle>Item moved to trash</ToastTitle>
            </ToastContent>
            <ToastAction>Undo</ToastAction>
          </ToastBody>
          <ToastClose />
        </Toast>
      </div>
    </SectionFrame>
  )
}
