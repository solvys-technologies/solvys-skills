import { Spinner } from "@/registry/ui/spinner"

export default function SpinnerAppearance() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Spinner appearance="gradient" animation="spin" size="lg" />
      <Spinner appearance="solid" animation="spin" size="lg" />
    </div>
  )
}
