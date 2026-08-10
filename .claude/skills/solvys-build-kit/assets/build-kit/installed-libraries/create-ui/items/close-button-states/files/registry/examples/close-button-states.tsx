import { CloseButton } from "@/registry/ui/close-button"

export default function CloseButtonStates() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <CloseButton appearance="solid" />
      <CloseButton appearance="solid" disabled />
      <CloseButton appearance="soft" />
      <CloseButton appearance="soft" disabled />
      <CloseButton appearance="outline" />
      <CloseButton appearance="outline" disabled />
      <CloseButton appearance="ghost" />
      <CloseButton appearance="ghost" disabled />
    </div>
  )
}
