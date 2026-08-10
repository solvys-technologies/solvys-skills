import { RiAddCircleFill } from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"

export default function ButtonIconOnly() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs" iconOnly aria-label="Add">
        <RiAddCircleFill />
      </Button>
      <Button size="sm" iconOnly aria-label="Add">
        <RiAddCircleFill />
      </Button>
      <Button size="md" iconOnly aria-label="Add">
        <RiAddCircleFill />
      </Button>
      <Button size="lg" iconOnly aria-label="Add">
        <RiAddCircleFill />
      </Button>
      <Button size="xl" iconOnly aria-label="Add">
        <RiAddCircleFill />
      </Button>
    </div>
  )
}
