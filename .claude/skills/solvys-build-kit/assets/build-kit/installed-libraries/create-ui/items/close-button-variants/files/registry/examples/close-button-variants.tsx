import { CloseButton } from "@/registry/ui/close-button"

export default function CloseButtonVariants() {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      <div className="bg-weakest border-light flex h-32 items-center justify-center rounded-xl border">
        <CloseButton variant="neutral" appearance="soft" size="lg" />
      </div>
      <div className="bg-strongest flex h-32 items-center justify-center rounded-xl">
        <CloseButton variant="inverse" appearance="soft" size="lg" />
      </div>
    </div>
  )
}
