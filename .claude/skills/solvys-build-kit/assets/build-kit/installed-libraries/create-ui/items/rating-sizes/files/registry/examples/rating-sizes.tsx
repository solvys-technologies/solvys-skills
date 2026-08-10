import { Rating, type RatingSize } from "@/registry/pro/ui/rating"

const sizes: RatingSize[] = ["xs", "md"]

export default function RatingSizes() {
  return (
    <div className="flex flex-col gap-6">
      {sizes.map((size) => (
        <div
          key={size}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          <Rating size={size} readOnly value={4} />
          <Rating size={size} container="rounded" readOnly value={4} />
        </div>
      ))}
    </div>
  )
}
