import { RiAddCircleFill } from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"

export default function ButtonLoading() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button loading>Saving</Button>
      <Button loading appearance="outline">
        Adding
      </Button>
      <Button loading iconOnly aria-label="Saving">
        <RiAddCircleFill />
      </Button>
    </div>
  )
}
