import { Slider } from "@/registry/pro/ui/slider"

export default function SliderTrack() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-8">
      {/* bar (default) — thin rule, thumb floats above */}
      <Slider defaultValue={[42]} track="bar" />
      {/* rail — thick track, thumb inset into the fill */}
      <Slider defaultValue={[42]} track="rail" />
      {/* neutral rail — thumb stays legible on the strong fill in both themes */}
      <Slider defaultValue={[42]} track="rail" variant="neutral" />
    </div>
  )
}
