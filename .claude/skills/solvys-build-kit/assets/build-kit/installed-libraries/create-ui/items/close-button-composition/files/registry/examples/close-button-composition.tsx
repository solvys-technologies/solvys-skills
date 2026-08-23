import { RiInformationFill } from "@create-ui/assets/icons"

import {
  InlineAlert,
  InlineAlertClose,
  InlineAlertContent,
  InlineAlertHeading,
  InlineAlertIcon,
  InlineAlertTitle,
} from "@/registry/ui/inline-alert"

export default function CloseButtonComposition() {
  return (
    <InlineAlert variant="info">
      <InlineAlertIcon>
        <RiInformationFill />
      </InlineAlertIcon>
      <InlineAlertContent>
        <InlineAlertHeading>
          <InlineAlertTitle>Heads up</InlineAlertTitle>
        </InlineAlertHeading>
      </InlineAlertContent>
      <InlineAlertClose />
    </InlineAlert>
  )
}
