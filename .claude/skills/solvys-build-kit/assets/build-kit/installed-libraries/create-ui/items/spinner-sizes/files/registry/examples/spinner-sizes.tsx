import { Spinner } from "@/registry/ui/spinner"

export default function SpinnerSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  )
}
