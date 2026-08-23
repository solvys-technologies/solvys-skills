import { CloseButton } from "@/registry/ui/close-button"

export default function CloseButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <CloseButton size="xs" appearance="soft" />
      <CloseButton size="sm" appearance="soft" />
      <CloseButton size="md" appearance="soft" />
      <CloseButton size="lg" appearance="soft" />
      <CloseButton size="xl" appearance="soft" />
      <CloseButton size="2xl" appearance="soft" />
    </div>
  )
}
