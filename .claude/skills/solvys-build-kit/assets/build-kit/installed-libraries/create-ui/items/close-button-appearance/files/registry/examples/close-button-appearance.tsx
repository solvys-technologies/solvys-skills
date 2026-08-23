import { CloseButton } from "@/registry/ui/close-button"

export default function CloseButtonAppearance() {
  return (
    <div className="flex flex-col gap-3 [&>div]:p-2">
      <div className="flex flex-wrap items-center gap-2">
        <CloseButton variant="neutral" appearance="solid" />
        <CloseButton variant="neutral" appearance="outline" />
        <CloseButton variant="neutral" appearance="soft" />
        <CloseButton variant="neutral" appearance="ghost" />
      </div>
      <div className="bg-strongest flex flex-wrap items-center gap-2 rounded-lg">
        <CloseButton variant="inverse" appearance="solid" />
        <CloseButton variant="inverse" appearance="outline" />
        <CloseButton variant="inverse" appearance="soft" />
        <CloseButton variant="inverse" appearance="ghost" />
      </div>
    </div>
  )
}
