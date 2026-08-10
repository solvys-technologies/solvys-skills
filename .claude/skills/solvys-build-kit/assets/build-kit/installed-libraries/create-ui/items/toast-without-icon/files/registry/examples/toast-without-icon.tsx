"use client"

import { Button } from "@/registry/ui/button"
import { toast } from "@/registry/ui/toast"

export default function ToastWithoutIcon() {
  return (
    <Button
      variant="neutral-light"
      appearance="outline"
      onClick={() =>
        toast({
          variant: "neutral",
          appearance: "soft",
          title: "Link copied",
          description: "Anyone with the link can open this page.",
        })
      }
    >
      Show toast without icon
    </Button>
  )
}
