import { RiArrowRightLine, RiFlashlightFill } from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"
import {
  InlineAlert,
  InlineAlertActions,
  InlineAlertContent,
  InlineAlertDescription,
  InlineAlertHeading,
  InlineAlertIcon,
  InlineAlertTitle,
} from "@/registry/ui/inline-alert"
import { TextLink } from "@/registry/ui/text-link"

export default function InlineAlertWithActions() {
  return (
    <InlineAlert variant="primary">
      <InlineAlertIcon>
        <RiFlashlightFill />
      </InlineAlertIcon>
      <InlineAlertContent>
        <InlineAlertHeading>
          <InlineAlertTitle>Free plan</InlineAlertTitle>
          <InlineAlertDescription>
            Upgrade for more projects.
          </InlineAlertDescription>
        </InlineAlertHeading>
        <InlineAlertActions>
          <Button variant="neutral-light" appearance="outline" size="md">
            Plans
          </Button>
          <Button variant="neutral-light" appearance="ghost" size="md">
            Later
          </Button>
          <TextLink
            variant="primary"
            size="xs"
            underline
            trailing={<RiArrowRightLine />}
          >
            Upgrade
          </TextLink>
        </InlineAlertActions>
      </InlineAlertContent>
    </InlineAlert>
  )
}
