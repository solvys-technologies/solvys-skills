"use client"

import * as React from "react"
import { RiCheckboxCircleFill } from "@create-ui/assets/icons"

import { Button } from "@/registry/ui/button"
import {
  InlineAlert,
  InlineAlertClose,
  InlineAlertContent,
  InlineAlertDescription,
  InlineAlertHeading,
  InlineAlertIcon,
  InlineAlertTitle,
} from "@/registry/ui/inline-alert"

export default function InlineAlertDismissible() {
  const [visible, setVisible] = React.useState(true)

  if (!visible) {
    return (
      <Button
        variant="neutral-light"
        appearance="outline"
        size="md"
        onClick={() => setVisible(true)}
      >
        Show alert again
      </Button>
    )
  }

  return (
    <InlineAlert variant="success" onDismiss={() => setVisible(false)}>
      <InlineAlertIcon>
        <RiCheckboxCircleFill />
      </InlineAlertIcon>
      <InlineAlertContent>
        <InlineAlertHeading>
          <InlineAlertTitle>Saved</InlineAlertTitle>
          <InlineAlertDescription>
            Your settings are up to date. Dismiss this banner to remove it from
            the page.
          </InlineAlertDescription>
        </InlineAlertHeading>
      </InlineAlertContent>
      <InlineAlertClose />
    </InlineAlert>
  )
}
