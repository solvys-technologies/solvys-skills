import { Switch } from "@/registry/ui/switch"

export default function SwitchDemo() {
  return (
    <div className="flex items-center gap-3">
      <Switch defaultChecked />
      <Switch />
    </div>
  )
}
