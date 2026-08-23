import { Progress } from "@/registry/ui/progress"

export default function ProgressValue() {
  return (
    <div className="flex w-64 flex-col gap-4">
      <Progress value={0} />
      <Progress value={40} />
      <Progress value={100} />
      <Progress value={3} max={5} />
    </div>
  )
}
