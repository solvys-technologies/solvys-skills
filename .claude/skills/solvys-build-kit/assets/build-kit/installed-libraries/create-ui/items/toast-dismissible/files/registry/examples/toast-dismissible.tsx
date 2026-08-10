"use client"

import { RiAlertFill } from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"
import { toast } from "@/registry/ui/toast"

export default function ToastDismissible() {
  return (
    <Button
      variant="neutral-light"
      appearance="outline"
      onClick={() =>
        toast({
          variant: "warning",
          appearance: "solid",
          icon: <RiAlertFill />,
          title: "You're offline",
          description:
            "We'll keep retrying. This one waits until you close it.",
          duration: null,
        })
      }
    >
      Show sticky toast
    </Button>
  )
}
