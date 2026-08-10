import { Spinner } from "@/registry/ui/spinner"

export default function SpinnerLine() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Spinner line="short" animation="spin" size="lg" />
      <Spinner line="long" animation="spin" size="lg" />
    </div>
  )
}
