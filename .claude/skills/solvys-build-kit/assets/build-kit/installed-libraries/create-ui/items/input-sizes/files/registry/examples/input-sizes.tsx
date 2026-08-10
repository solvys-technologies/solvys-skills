import { Input } from "@/registry/ui/input"

export default function InputSizes() {
  return (
    <div className="flex w-xs flex-col gap-4">
      <Input size="xs" type="email" placeholder="Email (xs)" />
      <Input size="sm" type="email" placeholder="Email (sm)" />
      <Input size="md" type="email" placeholder="Email (md)" />
    </div>
  )
}
