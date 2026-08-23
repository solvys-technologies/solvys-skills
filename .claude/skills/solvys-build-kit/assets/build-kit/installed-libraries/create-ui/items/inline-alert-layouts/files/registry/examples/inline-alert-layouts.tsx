import { RiCheckboxCircleFill } from "@create-ui/assets/icons"

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

export default function InlineAlertLayouts() {
  return (
    <div className="mx-auto flex w-full flex-col items-center gap-6">
      <InlineAlert layout="horizontal">
        <InlineAlertIcon>
          <RiCheckboxCircleFill />
        </InlineAlertIcon>
        <InlineAlertContent>
          <InlineAlertHeading>
            <InlineAlertTitle>Horizontal</InlineAlertTitle>
            <InlineAlertDescription>
              Heading and actions share one row.
            </InlineAlertDescription>
          </InlineAlertHeading>
          <InlineAlertActions>
            <Button variant="neutral-light" appearance="outline" size="md">
              Dismiss
            </Button>
            <Button variant="neutral-light" appearance="ghost" size="md">
              View
            </Button>
          </InlineAlertActions>
        </InlineAlertContent>
      </InlineAlert>

      <InlineAlert layout="vertical" className="w-[360px]">
        <InlineAlertIcon>
          <RiCheckboxCircleFill />
        </InlineAlertIcon>
        <InlineAlertContent>
          <InlineAlertHeading>
            <InlineAlertTitle>Vertical</InlineAlertTitle>
            <InlineAlertDescription>
              Content stacks and actions wrap below.
            </InlineAlertDescription>
          </InlineAlertHeading>
          <InlineAlertActions>
            <Button variant="neutral-light" appearance="outline" size="md">
              Dismiss
            </Button>
            <Button variant="neutral-light" appearance="ghost" size="md">
              View
            </Button>
          </InlineAlertActions>
        </InlineAlertContent>
      </InlineAlert>
    </div>
  )
}
