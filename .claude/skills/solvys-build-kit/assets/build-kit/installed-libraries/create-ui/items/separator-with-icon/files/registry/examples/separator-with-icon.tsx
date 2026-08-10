import { RiAddLine } from "@create-ui/assets/icons"

import { Separator } from "@/registry/ui/separator"

export default function SeparatorWithIcon() {
  return (
    <div className="flex w-[420px] max-w-full flex-col gap-6">
      <Separator align="start">
        <RiAddLine />
      </Separator>
      <Separator align="center">
        <RiAddLine />
      </Separator>
      <Separator align="end">
        <RiAddLine />
      </Separator>
    </div>
  )
}
