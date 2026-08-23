import { Progress } from "@/registry/ui/progress"

export default function ProgressVariants() {
  return (
    <div className="flex w-64 flex-col gap-3.5">
      <Progress variant="primary" value={45} />
      <Progress variant="info" value={45} />
      <Progress variant="success" value={45} />
      <Progress variant="warning" value={45} />
      <Progress variant="danger" value={45} />
      <Progress variant="away" value={45} />
      <Progress variant="neutral" value={45} />
      <Progress variant="neutral-soft" value={45} />
      <div className="bg-strongest -mx-3.5 flex flex-col gap-3.5 rounded-md p-3.5">
        <Progress variant="inverse" value={45} />
        <Progress variant="inverse-soft" value={45} />
      </div>
    </div>
  )
}
