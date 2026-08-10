import { Progress } from "@/registry/ui/progress"

export default function ProgressDemo() {
  return (
    <div className="flex flex-col items-center gap-8">
      <Progress type="circle" size="lg" value={42} />
      <div className="w-64">
        <Progress value={42} />
      </div>
    </div>
  )
}
