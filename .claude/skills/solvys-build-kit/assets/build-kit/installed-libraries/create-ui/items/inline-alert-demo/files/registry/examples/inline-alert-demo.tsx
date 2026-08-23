import {
  RiInformationFill,
  RiLoopRightAiFill,
  RiProhibited2Fill,
} from "@create-ui/assets/icons"

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

export default function InlineAlertDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-12">
      <InlineAlert variant="primary" layout="vertical" className="w-[360px]">
        <InlineAlertIcon>
          <RiLoopRightAiFill />
        </InlineAlertIcon>
        <InlineAlertContent>
          <InlineAlertHeading>
            <InlineAlertTitle>Component Sync is Now Available</InlineAlertTitle>
            <InlineAlertDescription>
              Your Figma components now stay in sync with the code library
              automatically. No manual updates needed.
            </InlineAlertDescription>
          </InlineAlertHeading>
          <InlineAlertActions>
            <Button variant="neutral-light" appearance="outline" size="md">
              Enable Sync
            </Button>
          </InlineAlertActions>
        </InlineAlertContent>
        <InlineAlertClose />
      </InlineAlert>

      <InlineAlert variant="warning" appearance="solid" className="w-[750px]">
        <InlineAlertIcon>
          <RiProhibited2Fill />
        </InlineAlertIcon>
        <InlineAlertContent>
          <InlineAlertHeading>
            <InlineAlertTitle>Storage Almost Full</InlineAlertTitle>
            <InlineAlertDescription>
              You have used 90% of your 50GB storage limit. Free up space or
              upgrade your plan.
            </InlineAlertDescription>
          </InlineAlertHeading>
          <InlineAlertActions>
            <Button variant="neutral-light" appearance="soft" size="md">
              Manage Storage
            </Button>
            <Button variant="inverse-solid" appearance="ghost" size="md">
              Manage Storage
            </Button>
          </InlineAlertActions>
        </InlineAlertContent>
        <InlineAlertClose />
      </InlineAlert>
    </div>
  )
}
