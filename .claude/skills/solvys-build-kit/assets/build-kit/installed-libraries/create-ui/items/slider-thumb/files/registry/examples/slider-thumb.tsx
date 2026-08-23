import { Slider } from "@/registry/pro/ui/slider"

// Every thumb form: track (bar / rail) × shape (rounded / pill) × thumbType
// (short / long).
export default function SliderThumb() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-8">
      {/* bar */}
      <Slider
        defaultValue={[42]}
        track="bar"
        shape="rounded"
        thumbType="short"
      />
      <Slider
        defaultValue={[42]}
        track="bar"
        shape="rounded"
        thumbType="long"
      />
      <Slider defaultValue={[42]} track="bar" shape="pill" thumbType="short" />
      <Slider defaultValue={[42]} track="bar" shape="pill" thumbType="long" />
      {/* rail */}
      <Slider
        defaultValue={[42]}
        track="rail"
        shape="rounded"
        thumbType="short"
      />
      <Slider
        defaultValue={[42]}
        track="rail"
        shape="rounded"
        thumbType="long"
      />
      <Slider defaultValue={[42]} track="rail" shape="pill" thumbType="short" />
      <Slider defaultValue={[42]} track="rail" shape="pill" thumbType="long" />
    </div>
  )
}
