import { Spinner } from "@/registry/ui/spinner"

export default function SpinnerCap() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Spinner appearance="solid" cap="sharp" animation="spin" size="lg" />
      <Spinner appearance="solid" cap="rounded" animation="spin" size="lg" />
    </div>
  )
}
