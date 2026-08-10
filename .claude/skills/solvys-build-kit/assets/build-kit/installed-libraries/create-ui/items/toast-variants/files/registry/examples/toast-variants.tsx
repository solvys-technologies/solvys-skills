"use client"

import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiFlashlightFill,
  RiInformationFill,
  RiTimeFill,
} from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"
import { toast, type ToastOptions } from "@/registry/ui/toast"

const variants: ToastOptions[] = [
  {
    variant: "primary",
    title: "Workspace upgraded",
    description: "Pro is now live for everyone on your team.",
    icon: <RiFlashlightFill />,
  },
  {
    variant: "neutral",
    title: "Preferences synced",
    description: "Your editor layout now matches this device.",
    icon: <RiInformationFill />,
  },
  {
    variant: "info",
    title: "Maintenance on Sunday",
    description: "Expect a short outage between 02:00 and 03:00 UTC.",
    icon: <RiInformationFill />,
  },
  {
    variant: "success",
    title: "Invite sent",
    description: "They'll get an email in the next few minutes.",
    icon: <RiCheckboxCircleFill />,
  },
  {
    variant: "warning",
    title: "Storage almost full",
    description: "You've used 92% of the 10 GB on this plan.",
    icon: <RiAlertFill />,
  },
  {
    variant: "danger",
    title: "Payment declined",
    description: "We couldn't charge the card ending in 4242.",
    icon: <RiErrorWarningFill />,
  },
  {
    variant: "away",
    title: "Paused while you were away",
    description: "Syncing resumes as soon as you're back.",
    icon: <RiTimeFill />,
  },
]

export default function ToastVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {variants.map((options) => (
        <Button
          key={options.variant}
          variant="neutral-light"
          appearance="outline"
          size="sm"
          className="capitalize"
          onClick={() => toast(options)}
        >
          {options.variant}
        </Button>
      ))}
    </div>
  )
}
