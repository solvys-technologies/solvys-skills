import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiFlashlightFill,
  RiInformationFill,
  RiProhibited2Fill,
} from "@create-ui/assets/icons"

import {
  InlineAlert,
  InlineAlertContent,
  InlineAlertDescription,
  InlineAlertHeading,
  InlineAlertIcon,
  InlineAlertTitle,
} from "@/registry/ui/inline-alert"

const rows = [
  {
    variant: "primary" as const,
    title: "Primary",
    description: "Default brand intent for system messages.",
    Icon: RiFlashlightFill,
  },
  {
    variant: "neutral" as const,
    title: "Neutral",
    description: "Quiet, non-semantic notice.",
    Icon: RiFlashlightFill,
  },
  {
    variant: "info" as const,
    title: "Info",
    description: "Informational context without urgency.",
    Icon: RiInformationFill,
  },
  {
    variant: "success" as const,
    title: "Success",
    description: "An action completed as expected.",
    Icon: RiCheckboxCircleFill,
  },
  {
    variant: "warning" as const,
    title: "Warning",
    description: "Something needs attention but is not yet broken.",
    Icon: RiProhibited2Fill,
  },
  {
    variant: "danger" as const,
    title: "Danger",
    description: "An operation failed and needs user action.",
    Icon: RiErrorWarningFill,
  },
  {
    variant: "away" as const,
    title: "Away",
    description: "Idle or paused state.",
    Icon: RiFlashlightFill,
  },
]

export default function InlineAlertVariants() {
  return (
    <div className="flex w-full flex-col gap-3">
      {rows.map(({ variant, title, description, Icon }) => (
        <InlineAlert key={variant} variant={variant}>
          <InlineAlertIcon>
            <Icon />
          </InlineAlertIcon>
          <InlineAlertContent>
            <InlineAlertHeading>
              <InlineAlertTitle>{title}</InlineAlertTitle>
              <InlineAlertDescription>{description}</InlineAlertDescription>
            </InlineAlertHeading>
          </InlineAlertContent>
        </InlineAlert>
      ))}
    </div>
  )
}
