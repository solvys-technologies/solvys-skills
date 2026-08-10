"use client"

import { RiInformationFill } from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"
import { toast } from "@/registry/ui/toast"

export default function ToastWithProgress() {
  return (
    <Button
      variant="neutral-light"
      appearance="outline"
      onClick={() =>
        toast({
          variant: "info",
          appearance: "soft",
          icon: <RiInformationFill />,
          title: "Backup running",
          description: "The bar counts down what's left — hover to pause it.",
          progress: true,
        })
      }
    >
      Show toast with progress
    </Button>
  )
}
