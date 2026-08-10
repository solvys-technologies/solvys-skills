import { RiFlashlightLine } from "@create-ui/assets/icons"

import { InfoTooltip } from "@/registry/pro/ui/info-tooltip"

export default function InfoTooltipContent() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-16">
      {/* A titled definition — term on top, explanation below. */}
      <InfoTooltip variant="inverse" side="top" defaultOpen>
        <span className="text-strongest text-body-sm font-semibold">
          Monthly recurring revenue
        </span>
        <span className="text-body text-body-xs">
          Subscription revenue normalized to a monthly amount, excluding
          one-time charges.
        </span>
      </InfoTooltip>

      {/* An icon paired with a hint. */}
      <InfoTooltip variant="inverse" side="top" defaultOpen>
        <span className="text-strongest text-body-sm inline-flex items-center gap-1.5 font-semibold">
          <RiFlashlightLine className="size-3.5" />
          Streaming usage
        </span>
        <span className="text-body text-body-xs">
          Metered per second and billed at the end of each cycle.
        </span>
      </InfoTooltip>

      {/* A small key/value breakdown. */}
      <InfoTooltip variant="inverse" side="top" defaultOpen>
        <span className="text-strongest text-body-sm font-semibold">
          How this is calculated
        </span>
        <span className="text-body text-body-xs flex items-center justify-between gap-6">
          Base plan <span className="text-strongest tabular-nums">$40</span>
        </span>
        <span className="text-body text-body-xs flex items-center justify-between gap-6">
          Seats × 3 <span className="text-strongest tabular-nums">$60</span>
        </span>
      </InfoTooltip>
    </div>
  )
}
