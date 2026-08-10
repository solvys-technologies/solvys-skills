import { Button } from "@/registry/ui/button"

export default function ButtonAppearance() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button appearance="solid">Solid</Button>
      <Button appearance="outline">Outline</Button>
      <Button appearance="soft">Soft</Button>
      <Button appearance="ghost">Ghost</Button>
    </div>
  )
}
