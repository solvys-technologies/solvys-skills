import { Radio } from "@/registry/ui/radio"
import { RadioGroup } from "@/registry/ui/radio-group"

export default function RadioInGroup() {
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup variant="neutral" size="md" defaultValue="b">
        <Radio value="a" aria-label="Option A" />
        <Radio value="b" aria-label="Option B" />
        <Radio value="c" aria-label="Option C" />
      </RadioGroup>
      <p className="text-placeholder text-ui-control-sm">
        Children inherit <code>variant</code> and <code>size</code> from the
        group via context. Set them once on the group, not on each child.
      </p>
    </div>
  )
}
