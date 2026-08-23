import { Rating, type RatingContainer } from "@/registry/pro/ui/rating"

const containers: RatingContainer[] = ["none", "rounded", "circle"]

export default function RatingContainers() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      {containers.map((container) => (
        <Rating key={container} container={container} readOnly value={3} />
      ))}
    </div>
  )
}
