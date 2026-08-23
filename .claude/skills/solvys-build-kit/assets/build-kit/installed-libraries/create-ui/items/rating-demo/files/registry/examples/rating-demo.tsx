import { Rating } from "@/registry/pro/ui/rating"

export default function RatingDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Rating defaultValue={3} />
    </div>
  )
}
