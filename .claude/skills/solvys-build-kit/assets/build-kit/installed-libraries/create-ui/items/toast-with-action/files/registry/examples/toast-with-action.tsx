"use client"

import { RiDeleteBin5Fill } from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"
import { toast, ToastAction } from "@/registry/ui/toast"

export default function ToastWithAction() {
  return (
    <Button
      variant="neutral-light"
      appearance="outline"
      onClick={() =>
        toast({
          variant: "neutral",
          appearance: "solid",
          icon: <RiDeleteBin5Fill />,
          title: "Moved to trash",
          description: "“Q3 roadmap” is deleted permanently in 30 days.",
          action: <ToastAction>Undo</ToastAction>,
        })
      }
    >
      Show toast with action
    </Button>
  )
}
