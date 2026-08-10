import { Button } from "@/registry/ui/button"

export default function ButtonShape() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button shape="rounded">Rounded</Button>
      <Button shape="pill">Pill</Button>
      <Button shape="square">Square</Button>
    </div>
  )
}
