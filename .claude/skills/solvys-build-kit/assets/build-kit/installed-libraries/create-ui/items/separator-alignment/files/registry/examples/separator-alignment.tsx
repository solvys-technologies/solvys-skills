import { Separator } from "@/registry/ui/separator"

export default function SeparatorAlignment() {
  return (
    <div className="flex w-[420px] max-w-full flex-col gap-6">
      <Separator align="start">Start</Separator>
      <Separator align="center">Center</Separator>
      <Separator align="end">End</Separator>
    </div>
  )
}
