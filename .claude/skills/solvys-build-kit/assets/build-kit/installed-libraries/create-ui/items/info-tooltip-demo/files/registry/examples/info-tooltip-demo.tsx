import { InfoTooltip } from "@/registry/pro/ui/info-tooltip"

export default function InfoTooltipDemo() {
  return (
    <span className="text-body-md text-body inline-flex items-center gap-1.5">
      Monthly recurring revenue
      <InfoTooltip variant="neutral" side="top" defaultOpen>
        Total subscription revenue normalized to a monthly amount.
      </InfoTooltip>
    </span>
  )
}
