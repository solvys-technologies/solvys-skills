import { Progress } from "@/registry/ui/progress"

export default function ProgressType() {
  return (
    <div className="flex items-center gap-8">
      <div className="w-64">
        <Progress type="line" value={40} />
      </div>
      <Progress type="circle" size="lg" value={40} />
    </div>
  )
}
