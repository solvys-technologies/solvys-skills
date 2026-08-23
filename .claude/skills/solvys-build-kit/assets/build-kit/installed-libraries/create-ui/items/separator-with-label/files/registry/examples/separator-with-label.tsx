import { Button } from "@/registry/ui/button"
import { Separator } from "@/registry/ui/separator"

export default function SeparatorWithLabel() {
  return (
    <div className="flex w-[360px] flex-col gap-4">
      <Button variant="primary" appearance="solid">
        Continue with email
      </Button>
      <Separator>OR</Separator>
      <Button variant="neutral-solid" appearance="outline">
        Create a free account
      </Button>
    </div>
  )
}
