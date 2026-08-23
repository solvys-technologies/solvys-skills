import { InfoTooltip } from "@/registry/pro/ui/info-tooltip"

export default function InfoTooltipPlacement() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-16">
      <InfoTooltip variant="inverse" side="top" defaultOpen>
        Opens above the trigger.
      </InfoTooltip>
      <InfoTooltip variant="inverse" side="bottom" defaultOpen>
        Opens below the trigger.
      </InfoTooltip>
      <InfoTooltip variant="inverse" side="bottom" align="start" defaultOpen>
        Aligned to the start edge.
      </InfoTooltip>
      <InfoTooltip variant="inverse" side="right" defaultOpen>
        Opens to the right.
      </InfoTooltip>
    </div>
  )
}
