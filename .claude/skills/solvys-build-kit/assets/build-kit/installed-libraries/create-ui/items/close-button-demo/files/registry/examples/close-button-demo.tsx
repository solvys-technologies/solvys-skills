import * as React from "react"

import { CloseButton } from "@/registry/ui/close-button"
import { Separator } from "@/registry/ui/separator"

export default function CloseButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="shadow-neutral-xs bg-weakest h-60 w-40 rounded-xl">
        <div className="flex w-full justify-end p-3.5">
          <CloseButton size="lg" />
        </div>
        <div>
          <Separator />
        </div>
      </div>
      <div className="shadow-neutral-xs bg-weakest h-60 w-40 rounded-xl">
        <div className="flex w-full justify-end p-3.5">
          <CloseButton appearance="solid" shape="rounded" size="lg" />
        </div>
        <div>
          <Separator />
        </div>
      </div>
      <div className="shadow-neutral-xs bg-weakest h-60 w-40 rounded-xl">
        <div className="flex w-full justify-end p-3.5">
          <CloseButton appearance="outline" shape="square" size="lg" />
        </div>
        <div>
          <Separator />
        </div>
      </div>
      <div className="shadow-neutral-xs bg-weakest h-60 w-40 rounded-xl">
        <div className="flex w-full justify-end p-3.5">
          <CloseButton appearance="ghost" shape="square" size="lg" />
        </div>
        <div>
          <Separator />
        </div>
      </div>
    </div>
  )
}
