import { Switch } from "@/registry/ui/switch"

export default function SwitchSizes() {
  return (
    <div className="flex items-center gap-4">
      <Switch size="md" defaultChecked />
      <Switch size="sm" defaultChecked />
      <Switch size="xs" defaultChecked />
    </div>
  )
}
