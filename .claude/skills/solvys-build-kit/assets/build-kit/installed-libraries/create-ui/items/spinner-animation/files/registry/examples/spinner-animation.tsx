import { Spinner } from "@/registry/ui/spinner"

export default function SpinnerAnimation() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Spinner animation="spin" size="lg" />
      <Spinner animation="pulse" size="lg" />
      <Spinner animation="tick" size="lg" />
    </div>
  )
}
