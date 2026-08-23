import { Rating } from "@/registry/pro/ui/rating"

export default function RatingShape() {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center gap-10">
        <Rating shape="sharp" readOnly value={3} />
        <Rating shape="sharp" appearance="outline" readOnly value={3} />
        <Rating type="heart" shape="sharp" readOnly value={3} />
        <Rating
          type="heart"
          shape="sharp"
          appearance="outline"
          readOnly
          value={3}
        />
      </div>
      <div className="flex flex-col items-center gap-10">
        <Rating shape="rounded" readOnly value={3} />
        <Rating shape="rounded" appearance="outline" readOnly value={3} />
        <Rating type="heart" shape="rounded" readOnly value={3} />
        <Rating
          type="heart"
          shape="rounded"
          appearance="outline"
          readOnly
          value={3}
        />
      </div>
    </div>
  )
}
