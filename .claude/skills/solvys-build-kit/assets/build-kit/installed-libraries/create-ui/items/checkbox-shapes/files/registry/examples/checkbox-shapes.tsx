import { Checkbox } from "@/registry/ui/checkbox"

export default function CheckboxShapes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Checkbox shape="rounded" defaultChecked aria-label="Rounded" />
      <Checkbox shape="pill" defaultChecked aria-label="Pill" />
      <Checkbox shape="square" defaultChecked aria-label="Square" />
    </div>
  )
}
