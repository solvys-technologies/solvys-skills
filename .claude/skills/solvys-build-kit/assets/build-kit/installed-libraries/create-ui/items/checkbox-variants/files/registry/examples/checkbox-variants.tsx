import { Checkbox } from "@/registry/ui/checkbox"

export default function CheckboxVariants() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Checkbox variant="primary" defaultChecked aria-label="Primary" />
      <Checkbox variant="neutral" defaultChecked aria-label="Neutral" />
      <Checkbox variant="danger" defaultChecked aria-label="Danger" />
      <Checkbox variant="success" defaultChecked aria-label="Success" />
      <Checkbox variant="info" defaultChecked aria-label="Info" />
      <div className="bg-strongest flex items-center rounded-md p-3">
        <Checkbox variant="inverse" defaultChecked aria-label="Inverse" />
      </div>
    </div>
  )
}
