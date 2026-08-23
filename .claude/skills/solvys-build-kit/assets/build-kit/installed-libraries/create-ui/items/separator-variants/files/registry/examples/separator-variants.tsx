import { Separator } from "@/registry/pro/ui/separator"

export default function SeparatorVariants() {
  return (
    <div className="flex w-[420px] max-w-full flex-col gap-6">
      <Separator variant="solid" />
      <Separator variant="dashed" />
    </div>
  )
}
