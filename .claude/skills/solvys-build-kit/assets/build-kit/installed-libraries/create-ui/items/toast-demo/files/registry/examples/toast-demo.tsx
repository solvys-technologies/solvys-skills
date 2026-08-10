"use client"

import { RiInformationFill } from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"
import { toast } from "@/registry/ui/toast"

export default function ToastDemo() {
  return (
    <Button
      variant="neutral-light"
      appearance="outline"
      onClick={() =>
        toast({
          variant: "info",
          icon: <RiInformationFill />,
          title: "New update available",
          description: "Version 2.1 is ready to install.",
        })
      }
    >
      Show toast
    </Button>
  )
}
