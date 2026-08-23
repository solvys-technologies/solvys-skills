import { Progress } from "@/registry/ui/progress"

export default function ProgressAppearance() {
  return (
    <div className="flex items-center gap-10">
      <div className="flex w-64 flex-col gap-4">
        <Progress appearance="solid" value={40} />
        <Progress appearance="gradient" value={40} />
      </div>
      <div className="flex items-center gap-6">
        <Progress type="circle" size="lg" appearance="solid" value={40} />
        <Progress type="circle" size="lg" appearance="gradient" value={40} />
      </div>
    </div>
  )
}
