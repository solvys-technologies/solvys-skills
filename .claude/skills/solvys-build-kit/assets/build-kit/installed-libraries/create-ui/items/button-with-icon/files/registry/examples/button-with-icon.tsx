import { RiAddCircleFill, RiArrowRightLine } from "@create-ui/assets/icons"

import { Button, ButtonLabel } from "@/registry/ui/button"

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>
        <RiAddCircleFill />
        <ButtonLabel>Leading</ButtonLabel>
      </Button>
      <Button>
        <ButtonLabel>Trailing</ButtonLabel>
        <RiArrowRightLine />
      </Button>
      <Button>
        <RiAddCircleFill />
        <ButtonLabel>Both</ButtonLabel>
        <RiArrowRightLine />
      </Button>
    </div>
  )
}
