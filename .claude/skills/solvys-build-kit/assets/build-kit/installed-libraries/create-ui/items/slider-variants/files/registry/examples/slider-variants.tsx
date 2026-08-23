import { Slider } from "@/registry/ui/slider"

export default function SliderVariants() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-8">
      <Slider defaultValue={[42]} variant="primary" />
      <Slider defaultValue={[42]} variant="neutral" />
    </div>
  )
}
