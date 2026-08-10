import { RiInformationFill } from "@create-ui/assets/icons"

import {
  InlineAlert,
  InlineAlertContent,
  InlineAlertDescription,
  InlineAlertHeading,
  InlineAlertIcon,
  InlineAlertTitle,
} from "@/registry/ui/inline-alert"

const appearances = ["default", "solid", "soft", "outline"] as const

export default function InlineAlertAppearances() {
  return (
    <div className="flex w-full flex-col gap-3">
      {appearances.map((appearance) => (
        <InlineAlert key={appearance} variant="info" appearance={appearance}>
          <InlineAlertIcon>
            <RiInformationFill />
          </InlineAlertIcon>
          <InlineAlertContent>
            <InlineAlertHeading>
              <InlineAlertTitle className="capitalize">
                {appearance}
              </InlineAlertTitle>
              <InlineAlertDescription>
                Same variant, different surface treatment.
              </InlineAlertDescription>
            </InlineAlertHeading>
          </InlineAlertContent>
        </InlineAlert>
      ))}
    </div>
  )
}
