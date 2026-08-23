import {
  InlineAlert,
  InlineAlertContent,
  InlineAlertDescription,
  InlineAlertHeading,
  InlineAlertTitle,
} from "@/registry/ui/inline-alert"

export default function InlineAlertWithoutIcon() {
  return (
    <InlineAlert variant="neutral">
      <InlineAlertContent>
        <InlineAlertHeading>
          <InlineAlertTitle>No leading icon</InlineAlertTitle>
          <InlineAlertDescription>
            Skip the icon slot entirely when the message reads cleanly on its
            own.
          </InlineAlertDescription>
        </InlineAlertHeading>
      </InlineAlertContent>
    </InlineAlert>
  )
}
