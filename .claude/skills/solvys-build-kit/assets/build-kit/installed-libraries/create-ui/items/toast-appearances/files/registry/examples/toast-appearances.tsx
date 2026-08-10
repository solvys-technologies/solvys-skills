"use client"

import { RiInformationFill } from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"
import { toast } from "@/registry/ui/toast"

// Same variant and icon throughout, so the only thing that changes between the
// four cards is the surface treatment.
const appearances = [
  {
    appearance: "solid",
    title: "Deployment finished",
    description: "createui-web is live on production.",
  },
  {
    appearance: "soft",
    title: "Draft autosaved",
    description: "Last saved a few seconds ago.",
  },
  {
    appearance: "outline",
    title: "Export ready",
    description: "Your CSV is waiting in Downloads.",
  },
  {
    appearance: "default",
    title: "Comment posted",
    description: "Your note was added to the design review.",
  },
] as const

export default function ToastAppearances() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {appearances.map(({ appearance, title, description }) => (
        <Button
          key={appearance}
          variant="neutral-light"
          appearance="outline"
          size="sm"
          className="capitalize"
          onClick={() =>
            toast({
              variant: "info",
              appearance,
              icon: <RiInformationFill />,
              title,
              description,
            })
          }
        >
          {appearance}
        </Button>
      ))}
    </div>
  )
}
