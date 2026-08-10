import { Rating, type RatingVariant } from "@/registry/pro/ui/rating"

const variants: RatingVariant[] = ["colorful", "primary", "neutral"]

export default function RatingVariants() {
  return (
    <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
      {variants.map((variant) => (
        <Rating key={variant} variant={variant} readOnly value={4} />
      ))}
    </div>
  )
}
