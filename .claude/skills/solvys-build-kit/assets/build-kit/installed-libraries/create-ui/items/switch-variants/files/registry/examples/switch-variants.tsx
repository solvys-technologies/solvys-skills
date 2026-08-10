import { Switch } from "@/registry/ui/switch"

export default function SwitchVariants() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Switch variant="primary" defaultChecked />
        <Switch variant="primary" />
      </div>
      <div className="flex items-center gap-3">
        <Switch variant="info" defaultChecked />
        <Switch variant="info" />
      </div>
      <div className="flex items-center gap-3">
        <Switch variant="neutral" defaultChecked />
        <Switch variant="neutral" />
      </div>
      <div className="bg-strongest -mx-4 rounded-lg px-4 py-3">
        <div className="flex items-center gap-3">
          <Switch variant="inverse" defaultChecked />
          <Switch variant="inverse" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Switch variant="semantic" defaultChecked />
        <Switch variant="semantic" />
      </div>
    </div>
  )
}
