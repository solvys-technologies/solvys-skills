import { Slider } from "@/registry/pro/ui/slider"

const labeled = [
  { value: 0, label: "Min" },
  { value: 50, label: "Mid" },
  { value: 100, label: "Max" },
]

export default function SliderMarks() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-16 pb-10">
      {/* bare numbers — the value is the label */}
      <Slider defaultValue={[40]} marks={[0, 20, 40, 60, 80, 100]} />
      {/* step snaps the thumb to each mark */}
      <Slider defaultValue={[40]} marks={[0, 20, 40, 60, 80, 100]} step={20} />
      {/* { value, label } objects for custom labels */}
      <Slider defaultValue={[50]} marks={labeled} />
    </div>
  )
}
