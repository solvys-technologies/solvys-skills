import { AspectRatio } from "@/registry/ui/aspect-ratio"

export default function AspectRatioPortrait() {
  return (
    <div className="w-full max-w-[150px]">
      <AspectRatio
        ratio={9 / 16}
        className="from-light to-weak rounded-lg bg-gradient-to-br"
      />
    </div>
  )
}
