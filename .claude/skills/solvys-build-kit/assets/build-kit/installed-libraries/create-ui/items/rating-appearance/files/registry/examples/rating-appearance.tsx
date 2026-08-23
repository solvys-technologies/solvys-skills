import { Rating } from "@/registry/pro/ui/rating"

export default function RatingAppearance() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-10">
        <Rating type="star" appearance="filled" defaultValue={3} />
        <Rating type="star" appearance="outline" defaultValue={3} />
      </div>
      <div className="flex flex-wrap items-center gap-10">
        <Rating type="heart" appearance="filled" defaultValue={3} />
        <Rating type="heart" appearance="outline" defaultValue={3} />
      </div>
    </div>
  )
}
