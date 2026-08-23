import { InfoTooltip } from "@/registry/pro/ui/info-tooltip"

export default function InfoTooltipVariants() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <InfoTooltip variant="primary">
        Primary tone, for general product hints.
      </InfoTooltip>
      <InfoTooltip variant="neutral">
        Neutral tone, for quiet metadata.
      </InfoTooltip>
      <InfoTooltip variant="inverse">
        Inverse tone, light bubble on dark surfaces.
      </InfoTooltip>
      <InfoTooltip variant="danger">
        Danger tone, for destructive context.
      </InfoTooltip>
      <InfoTooltip variant="info">Info tone, for neutral guidance.</InfoTooltip>
    </div>
  )
}
