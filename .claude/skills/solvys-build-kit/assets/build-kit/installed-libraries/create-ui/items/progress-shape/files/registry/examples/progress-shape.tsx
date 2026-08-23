import { Progress } from "@/registry/ui/progress"

export default function ProgressShape() {
  return (
    <div className="flex items-center gap-10">
      <div className="flex w-64 flex-col gap-4">
        <Progress shape="sharp" value={40} />
        <Progress shape="round" value={40} />
        <Progress shape="pill" value={40} />
      </div>
      <div className="flex items-center gap-6">
        <Progress type="circle" size="lg" shape="sharp" value={40} />
        <Progress type="circle" size="lg" shape="pill" value={40} />
      </div>
    </div>
  )
}
