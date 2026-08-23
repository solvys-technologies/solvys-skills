import * as React from "react"
import {
  RiArrowUpDoubleFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiFlashlightFill,
  RiInformationFill,
  RiProhibited2Fill,
} from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import { Button } from "@/registry/ui/button"
import {
  InlineAlert,
  InlineAlertActions,
  InlineAlertClose,
  InlineAlertContent,
  InlineAlertDescription,
  InlineAlertHeading,
  InlineAlertIcon,
  InlineAlertTitle,
} from "@/registry/ui/inline-alert"
import { TextLink } from "@/registry/ui/text-link"

type Variant =
  | "primary"
  | "neutral"
  | "danger"
  | "success"
  | "warning"
  | "info"
  | "away"

type Appearance = "default" | "solid" | "soft" | "outline"

type Layout = "horizontal" | "vertical"

type TextLinkVariant =
  | "primary"
  | "neutral"
  | "inverse"
  | "danger"
  | "success"
  | "info"

function alertUpdateAppearance(a: Appearance) {
  return a === "solid" ? ("soft" as const) : ("outline" as const)
}

function alertActionVariant(a: Appearance) {
  return a === "solid" ? ("inverse-solid" as const) : ("neutral-light" as const)
}

function alertUpgradeVariant(v: Variant, a: Appearance): TextLinkVariant {
  if (a === "solid") return "inverse"
  if (a === "soft") return "neutral"
  if (v === "neutral" || v === "warning" || v === "away") return "neutral"
  return v
}

function AlertCell({
  variant,
  appearance,
  layout,
  Icon,
}: {
  variant: Variant
  appearance: Appearance
  layout: Layout
  Icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <InlineAlert
      variant={variant}
      appearance={appearance}
      layout={layout}
      className={layout === "horizontal" ? "" : ""}
    >
      <InlineAlertIcon>
        <Icon />
      </InlineAlertIcon>
      <InlineAlertContent>
        <InlineAlertHeading>
          <InlineAlertTitle>System Notification</InlineAlertTitle>
          <InlineAlertDescription>
            Please review the details and take action
          </InlineAlertDescription>
        </InlineAlertHeading>
        <InlineAlertActions>
          <Button
            variant="neutral-light"
            appearance={alertUpdateAppearance(appearance)}
            size="md"
          >
            Update
          </Button>
          <Button
            variant={alertActionVariant(appearance)}
            appearance="ghost"
            size="md"
          >
            Action
          </Button>
          <TextLink
            variant={alertUpgradeVariant(variant, appearance)}
            size="xs"
            underline
            trailing={<RiArrowUpDoubleFill />}
          >
            Upgrade
          </TextLink>
        </InlineAlertActions>
      </InlineAlertContent>
      <InlineAlertClose />
    </InlineAlert>
  )
}

function ColLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-body pb-2 text-xs font-medium capitalize">
      {children}
    </div>
  )
}

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-body self-center pr-2 text-right text-xs font-medium capitalize">
      {children}
    </div>
  )
}

export default function InlineAlertExample() {
  return (
    <div className="flex flex-col gap-16 p-4 sm:p-6 lg:p-12">
      <HorizontalSection />
      <VerticalSection />
    </div>
  )
}

function HorizontalSection() {
  return (
    <SectionFrame title="Horizontal">
      <div className="grid grid-cols-[auto_auto_auto_auto_auto] items-start gap-x-6 gap-y-4">
        <div />
        <ColLabel>Default</ColLabel>
        <ColLabel>Solid</ColLabel>
        <ColLabel>Soft</ColLabel>
        <ColLabel>Outline</ColLabel>

        <RowLabel>primary</RowLabel>
        <AlertCell
          variant="primary"
          appearance="default"
          layout="horizontal"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="primary"
          appearance="solid"
          layout="horizontal"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="primary"
          appearance="soft"
          layout="horizontal"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="primary"
          appearance="outline"
          layout="horizontal"
          Icon={RiFlashlightFill}
        />

        <RowLabel>error</RowLabel>
        <AlertCell
          variant="danger"
          appearance="default"
          layout="horizontal"
          Icon={RiErrorWarningFill}
        />
        <AlertCell
          variant="danger"
          appearance="solid"
          layout="horizontal"
          Icon={RiErrorWarningFill}
        />
        <AlertCell
          variant="danger"
          appearance="soft"
          layout="horizontal"
          Icon={RiErrorWarningFill}
        />
        <AlertCell
          variant="danger"
          appearance="outline"
          layout="horizontal"
          Icon={RiErrorWarningFill}
        />

        <RowLabel>success</RowLabel>
        <AlertCell
          variant="success"
          appearance="default"
          layout="horizontal"
          Icon={RiCheckboxCircleFill}
        />
        <AlertCell
          variant="success"
          appearance="solid"
          layout="horizontal"
          Icon={RiCheckboxCircleFill}
        />
        <AlertCell
          variant="success"
          appearance="soft"
          layout="horizontal"
          Icon={RiCheckboxCircleFill}
        />
        <AlertCell
          variant="success"
          appearance="outline"
          layout="horizontal"
          Icon={RiCheckboxCircleFill}
        />

        <RowLabel>info</RowLabel>
        <AlertCell
          variant="info"
          appearance="default"
          layout="horizontal"
          Icon={RiInformationFill}
        />
        <AlertCell
          variant="info"
          appearance="solid"
          layout="horizontal"
          Icon={RiInformationFill}
        />
        <AlertCell
          variant="info"
          appearance="soft"
          layout="horizontal"
          Icon={RiInformationFill}
        />
        <AlertCell
          variant="info"
          appearance="outline"
          layout="horizontal"
          Icon={RiInformationFill}
        />

        <RowLabel>warning</RowLabel>
        <AlertCell
          variant="warning"
          appearance="default"
          layout="horizontal"
          Icon={RiProhibited2Fill}
        />
        <AlertCell
          variant="warning"
          appearance="solid"
          layout="horizontal"
          Icon={RiProhibited2Fill}
        />
        <AlertCell
          variant="warning"
          appearance="soft"
          layout="horizontal"
          Icon={RiProhibited2Fill}
        />
        <AlertCell
          variant="warning"
          appearance="outline"
          layout="horizontal"
          Icon={RiProhibited2Fill}
        />

        <RowLabel>away</RowLabel>
        <AlertCell
          variant="away"
          appearance="default"
          layout="horizontal"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="away"
          appearance="solid"
          layout="horizontal"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="away"
          appearance="soft"
          layout="horizontal"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="away"
          appearance="outline"
          layout="horizontal"
          Icon={RiFlashlightFill}
        />

        <RowLabel>neutral</RowLabel>
        <AlertCell
          variant="neutral"
          appearance="default"
          layout="horizontal"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="neutral"
          appearance="solid"
          layout="horizontal"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="neutral"
          appearance="soft"
          layout="horizontal"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="neutral"
          appearance="outline"
          layout="horizontal"
          Icon={RiFlashlightFill}
        />
      </div>
    </SectionFrame>
  )
}

function VerticalSection() {
  return (
    <SectionFrame title="Vertical">
      <div className="grid grid-cols-[auto_auto_auto_auto_auto] items-start gap-x-6 gap-y-4">
        <div />
        <ColLabel>Default</ColLabel>
        <ColLabel>Solid</ColLabel>
        <ColLabel>Soft</ColLabel>
        <ColLabel>Outline</ColLabel>

        <RowLabel>primary</RowLabel>
        <AlertCell
          variant="primary"
          appearance="default"
          layout="vertical"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="primary"
          appearance="solid"
          layout="vertical"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="primary"
          appearance="soft"
          layout="vertical"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="primary"
          appearance="outline"
          layout="vertical"
          Icon={RiFlashlightFill}
        />

        <RowLabel>error</RowLabel>
        <AlertCell
          variant="danger"
          appearance="default"
          layout="vertical"
          Icon={RiErrorWarningFill}
        />
        <AlertCell
          variant="danger"
          appearance="solid"
          layout="vertical"
          Icon={RiErrorWarningFill}
        />
        <AlertCell
          variant="danger"
          appearance="soft"
          layout="vertical"
          Icon={RiErrorWarningFill}
        />
        <AlertCell
          variant="danger"
          appearance="outline"
          layout="vertical"
          Icon={RiErrorWarningFill}
        />

        <RowLabel>success</RowLabel>
        <AlertCell
          variant="success"
          appearance="default"
          layout="vertical"
          Icon={RiCheckboxCircleFill}
        />
        <AlertCell
          variant="success"
          appearance="solid"
          layout="vertical"
          Icon={RiCheckboxCircleFill}
        />
        <AlertCell
          variant="success"
          appearance="soft"
          layout="vertical"
          Icon={RiCheckboxCircleFill}
        />
        <AlertCell
          variant="success"
          appearance="outline"
          layout="vertical"
          Icon={RiCheckboxCircleFill}
        />

        <RowLabel>info</RowLabel>
        <AlertCell
          variant="info"
          appearance="default"
          layout="vertical"
          Icon={RiInformationFill}
        />
        <AlertCell
          variant="info"
          appearance="solid"
          layout="vertical"
          Icon={RiInformationFill}
        />
        <AlertCell
          variant="info"
          appearance="soft"
          layout="vertical"
          Icon={RiInformationFill}
        />
        <AlertCell
          variant="info"
          appearance="outline"
          layout="vertical"
          Icon={RiInformationFill}
        />

        <RowLabel>warning</RowLabel>
        <AlertCell
          variant="warning"
          appearance="default"
          layout="vertical"
          Icon={RiProhibited2Fill}
        />
        <AlertCell
          variant="warning"
          appearance="solid"
          layout="vertical"
          Icon={RiProhibited2Fill}
        />
        <AlertCell
          variant="warning"
          appearance="soft"
          layout="vertical"
          Icon={RiProhibited2Fill}
        />
        <AlertCell
          variant="warning"
          appearance="outline"
          layout="vertical"
          Icon={RiProhibited2Fill}
        />

        <RowLabel>away</RowLabel>
        <AlertCell
          variant="away"
          appearance="default"
          layout="vertical"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="away"
          appearance="solid"
          layout="vertical"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="away"
          appearance="soft"
          layout="vertical"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="away"
          appearance="outline"
          layout="vertical"
          Icon={RiFlashlightFill}
        />

        <RowLabel>neutral</RowLabel>
        <AlertCell
          variant="neutral"
          appearance="default"
          layout="vertical"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="neutral"
          appearance="solid"
          layout="vertical"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="neutral"
          appearance="soft"
          layout="vertical"
          Icon={RiFlashlightFill}
        />
        <AlertCell
          variant="neutral"
          appearance="outline"
          layout="vertical"
          Icon={RiFlashlightFill}
        />
      </div>
    </SectionFrame>
  )
}
