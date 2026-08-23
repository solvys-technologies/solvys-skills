import { Switch } from "@/registry/ui/switch"

export default function SwitchIoTrigger() {
  return (
    <div className="flex items-center gap-4">
      <Switch ioTrigger defaultChecked />
      <Switch ioTrigger />
    </div>
  )
}
