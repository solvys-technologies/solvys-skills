import { Rating, type RatingType } from "@/registry/pro/ui/rating"

const types: RatingType[] = ["star", "heart", "emoji", "number"]

export default function RatingTypes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
      {types.map((type) => (
        <Rating key={type} type={type} container="rounded" defaultValue={4} />
      ))}
    </div>
  )
}
