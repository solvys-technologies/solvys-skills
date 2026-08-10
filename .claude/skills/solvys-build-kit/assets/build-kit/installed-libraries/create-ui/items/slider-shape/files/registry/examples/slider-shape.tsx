import { Slider } from "@/registry/pro/ui/slider"

export default function SliderShape() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-8">
      {/* bar: rounded thumb vs fully-round pill thumb */}
      <Slider defaultValue={[42]} shape="rounded" />
      <Slider defaultValue={[42]} shape="pill" />
      {/* rail: rounded vs pill rounds both the thumb and the fill */}
      <Slider defaultValue={[42]} track="rail" shape="rounded" />
      <Slider defaultValue={[42]} track="rail" shape="pill" />
    </div>
  )
}
