import { Switch } from "@/registry/ui/switch"

export default function SwitchStates() {
  return (
    <div className="flex items-center gap-4">
      <Switch defaultChecked />
      <Switch />
      <Switch disabled defaultChecked />
      <Switch disabled />
    </div>
  )
}
