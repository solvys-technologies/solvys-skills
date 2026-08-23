import { Spinner } from "@/registry/ui/spinner"

export default function SpinnerVariants() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Spinner variant="primary" size="lg" />
      <Spinner variant="info" size="lg" />
      <Spinner variant="success" size="lg" />
      <Spinner variant="warning" size="lg" />
      <Spinner variant="danger" size="lg" />
      <Spinner variant="away" size="lg" />
      <Spinner variant="neutral" size="lg" />
      <Spinner variant="neutral-soft" size="lg" />
      <Spinner variant="neutral-static" size="lg" />
      <div className="bg-strongest rounded-md p-2">
        <Spinner variant="inverse" size="lg" />
      </div>
      <div className="bg-strongest rounded-md p-2">
        <Spinner variant="inverse-soft" size="lg" />
      </div>
      <div className="bg-strongest rounded-md p-2">
        <Spinner variant="inverse-static" size="lg" />
      </div>
    </div>
  )
}
