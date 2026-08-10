import { Checkbox } from "@/registry/ui/checkbox"

export default function CheckboxSizes() {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Checkbox size="xs" defaultChecked aria-label="Extra small" />
      <Checkbox size="sm" defaultChecked aria-label="Small" />
      <Checkbox size="md" defaultChecked aria-label="Medium" />
    </div>
  )
}
