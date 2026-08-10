import { Switch } from "@/registry/ui/switch"

export default function SwitchShape() {
  return (
    <div className="flex items-center gap-4">
      <Switch shape="pill" defaultChecked />
      <Switch shape="rounded" defaultChecked />
      <Switch shape="pill" />
      <Switch shape="rounded" />
    </div>
  )
}
