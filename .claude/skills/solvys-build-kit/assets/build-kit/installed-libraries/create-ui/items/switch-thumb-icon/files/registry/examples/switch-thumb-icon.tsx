import { Switch } from "@/registry/ui/switch"

export default function SwitchThumbIcon() {
  return (
    <div className="flex items-center gap-4">
      <Switch thumbIcon defaultChecked />
      <Switch thumbIcon />
    </div>
  )
}
