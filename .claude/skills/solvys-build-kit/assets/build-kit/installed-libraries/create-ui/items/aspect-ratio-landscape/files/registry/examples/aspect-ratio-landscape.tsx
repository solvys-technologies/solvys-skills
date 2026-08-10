import { AspectRatio } from "@/registry/ui/aspect-ratio"

export default function AspectRatioLandscape() {
  return (
    <div className="w-full max-w-[480px]">
      <AspectRatio
        ratio={16 / 9}
        className="from-light to-weak rounded-lg bg-gradient-to-br"
      />
    </div>
  )
}
