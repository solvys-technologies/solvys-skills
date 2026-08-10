import { Progress } from "@/registry/ui/progress"

export default function ProgressSizes() {
  return (
    <div className="flex items-center gap-10">
      <div className="flex w-64 flex-col gap-4">
        <Progress size="xs" value={40} />
        <Progress size="sm" value={40} />
        <Progress size="md" value={40} />
        <Progress size="lg" value={40} />
      </div>
      <div className="flex items-end gap-6">
        <Progress type="circle" size="xs" value={40} />
        <Progress type="circle" size="sm" value={40} />
        <Progress type="circle" size="md" value={40} />
        <Progress type="circle" size="lg" value={40} />
      </div>
    </div>
  )
}
