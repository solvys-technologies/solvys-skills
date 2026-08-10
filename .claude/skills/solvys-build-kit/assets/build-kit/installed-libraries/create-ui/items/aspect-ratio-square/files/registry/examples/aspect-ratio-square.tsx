import { AspectRatio } from "@/registry/ui/aspect-ratio"

export default function AspectRatioSquare() {
  return (
    <div className="w-full max-w-[260px]">
      <AspectRatio
        ratio={1}
        className="from-light to-weak rounded-lg bg-gradient-to-br"
      />
    </div>
  )
}
