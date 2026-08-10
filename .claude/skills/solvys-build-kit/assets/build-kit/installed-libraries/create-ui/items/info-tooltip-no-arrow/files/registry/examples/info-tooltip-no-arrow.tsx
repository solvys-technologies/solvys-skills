import { InfoTooltip } from "@/registry/pro/ui/info-tooltip"

export default function InfoTooltipNoArrow() {
  return (
    <div className="flex flex-wrap items-center gap-16">
      <InfoTooltip variant="primary" side="bottom" defaultOpen>
        Bubble with the default arrow.
      </InfoTooltip>
      <InfoTooltip
        variant="primary"
        side="bottom"
        showArrow={false}
        defaultOpen
      >
        Bubble with no arrow.
      </InfoTooltip>
    </div>
  )
}
