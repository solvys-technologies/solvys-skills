import { CloseButton } from "@/registry/ui/close-button"

export default function CloseButtonShape() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <CloseButton appearance="soft" shape="rounded" />
      <CloseButton appearance="soft" shape="pill" />
      <CloseButton appearance="soft" shape="square" />
    </div>
  )
}
