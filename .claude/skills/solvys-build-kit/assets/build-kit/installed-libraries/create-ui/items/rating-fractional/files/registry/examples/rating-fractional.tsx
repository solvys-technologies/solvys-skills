import { Rating } from "@/registry/pro/ui/rating"

export default function RatingFractional() {
  return (
    <div className="flex flex-col gap-4">
      <Rating readOnly precision="full" value={4.2} />
      <Rating readOnly precision="half" value={4.2} />
    </div>
  )
}
