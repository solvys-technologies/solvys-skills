import {
  RiAlertFill,
  RiArrowRightLine,
  RiBankCardFill,
  RiBillFill,
  RiBuilding2Fill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiProhibited2Fill,
  RiQuestionFill,
  RiShieldKeyholeFill,
} from "@create-ui/assets/icons"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"
import { Button, ButtonLabel } from "@/registry/ui/button"
import {
  InlineAlert,
  InlineAlertContent,
  InlineAlertDescription,
  InlineAlertHeading,
  InlineAlertIcon,
  InlineAlertTitle,
} from "@/registry/ui/inline-alert"

export default function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      appearance="ghost-rounded"
      defaultValue="payment"
      className="w-full max-w-[620px]"
    >
      <AccordionItem value="secure">
        <AccordionTrigger icon={<RiShieldKeyholeFill />}>
          Is my payment information secure?
        </AccordionTrigger>
        <AccordionContent>
          Card details are tokenized and never stored on our servers.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="devices">
        <AccordionTrigger
          icon={<RiCheckboxCircleFill className="text-success-base" />}
        >
          Can I use the app on multiple devices?
        </AccordionTrigger>
        <AccordionContent>
          Yes. Your workspace syncs across every signed-in device.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="billing-info">
        <AccordionTrigger icon={<RiBillFill />}>
          My account is showing incorrect billing info
          <Badge
            variant="danger"
            appearance="solid"
            shape="pill"
            size="sm"
            leading={<RiErrorWarningFill />}
            className="ml-auto"
          >
            Error
          </Badge>
        </AccordionTrigger>
        <AccordionContent>
          Update your billing address from Settings → Billing to resolve the
          mismatch.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="payment">
        <AccordionTrigger icon={<RiBankCardFill />}>
          Why isn’t my payment going through?
          <Badge
            variant="warning"
            appearance="soft"
            size="sm"
            leading={<RiAlertFill />}
            className="ml-auto"
          >
            Issue
          </Badge>
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Payment failures are usually caused by incorrect card details,
            insufficient funds, or a temporary block from your bank.
            Double-check your billing information and try again. If the issue
            persists, contact your bank or reach out to our support team.
          </p>
          <InlineAlert variant="warning" appearance="soft" layout="vertical">
            <InlineAlertIcon>
              <RiProhibited2Fill />
            </InlineAlertIcon>
            <InlineAlertContent>
              <InlineAlertHeading>
                <InlineAlertTitle>System Notification</InlineAlertTitle>
                <InlineAlertDescription>
                  We’ve detected an issue with payment processing on your
                  account. Please verify your card details or try a different
                  payment method.
                </InlineAlertDescription>
              </InlineAlertHeading>
            </InlineAlertContent>
          </InlineAlert>
          <div className="flex items-center gap-2">
            <Button variant="neutral-solid" appearance="soft">
              <ButtonLabel>Fix Issues</ButtonLabel>
              <RiArrowRightLine />
            </Button>
            <Button variant="neutral-solid" appearance="ghost">
              View Details
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="invoices">
        <AccordionTrigger icon={<RiQuestionFill />}>
          Where can I find my invoices?
        </AccordionTrigger>
        <AccordionContent>
          Every invoice is available under Settings → Billing → Invoices.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="enterprise" disabled>
        <AccordionTrigger icon={<RiBuilding2Fill />}>
          Enterprise plan features
        </AccordionTrigger>
        <AccordionContent>
          Advanced security, custom integrations, and dedicated support.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
