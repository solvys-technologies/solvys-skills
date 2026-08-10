import { InfoTooltip } from "@/registry/pro/ui/info-tooltip"

export default function InfoTooltipSizes() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <InfoTooltip variant="primary" size="sm">
        Small icon and bubble.
      </InfoTooltip>
      <InfoTooltip variant="primary" size="md">
        Medium icon and bubble.
      </InfoTooltip>
      <InfoTooltip variant="primary" size="lg">
        Large icon and bubble.
      </InfoTooltip>
    </div>
  )
}
