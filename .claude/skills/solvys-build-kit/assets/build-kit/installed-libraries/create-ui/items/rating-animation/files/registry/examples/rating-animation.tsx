import { Rating } from "@/registry/pro/ui/rating"

export default function RatingAnimation() {
  return (
    <div className="flex flex-wrap items-center gap-12">
      <Rating animation="fade" defaultValue={2} />
      <Rating animation="sweep" defaultValue={2} />
    </div>
  )
}
