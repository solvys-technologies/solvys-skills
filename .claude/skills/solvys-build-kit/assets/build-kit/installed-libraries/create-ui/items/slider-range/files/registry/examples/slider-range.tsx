import { Slider } from "@/registry/pro/ui/slider"

// Range across every track, shape, thumb, and variant combination.
export default function SliderRange() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-8">
      {/* two thumbs — bar and rail */}
      <Slider defaultValue={[20, 60]} track="bar" />
      <Slider defaultValue={[20, 60]} track="rail" />
      {/* three or more thumbs — bar and rail */}
      <Slider defaultValue={[15, 45, 80]} track="bar" />
      <Slider defaultValue={[15, 45, 80]} track="rail" />
      {/* pill shape — bar and rail */}
      <Slider defaultValue={[20, 60]} shape="pill" track="bar" />
      <Slider defaultValue={[20, 60]} shape="pill" track="rail" />
      {/* long thumb — bar and rail */}
      <Slider defaultValue={[20, 60]} thumbType="long" track="bar" />
      <Slider defaultValue={[20, 60]} thumbType="long" track="rail" />
      {/* neutral — bar and rail */}
      <Slider defaultValue={[20, 60]} variant="neutral" track="bar" />
      <Slider defaultValue={[20, 60]} variant="neutral" track="rail" />
    </div>
  )
}
