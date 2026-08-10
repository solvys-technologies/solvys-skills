import { Switch } from "@/registry/ui/switch"

export default function SwitchThumbType() {
  return (
    <div className="flex items-center gap-4">
      <Switch thumbType="short" defaultChecked />
      <Switch thumbType="long" defaultChecked />
      <Switch thumbType="short" />
      <Switch thumbType="long" />
    </div>
  )
}
