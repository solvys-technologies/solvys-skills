import { Button } from "@/registry/ui/button"

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-end gap-2">
      <Button size="xs">xs</Button>
      <Button size="sm">sm</Button>
      <Button size="md">md</Button>
      <Button size="lg">lg</Button>
      <Button size="xl">xl</Button>
    </div>
  )
}
