import {
  RiAlertFill,
  RiArrowRightLine,
  RiBankCardFill,
} from "@create-ui/assets/icons"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"
import { Button, ButtonLabel } from "@/registry/ui/button"
import { InlineAlert, InlineAlertDescription } from "@/registry/ui/inline-alert"

export default function AccordionRichContent() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="payment"
      appearance="outline-rounded"
      className="w-full max-w-[600px]"
    >
      <AccordionItem value="payment">
        <AccordionTrigger icon={<RiBankCardFill />}>
          Why isn’t my payment going through?
          <Badge
            variant="warning"
            appearance="soft"
            size="xs"
            leading={<RiAlertFill />}
            className="ml-auto"
          >
            issue
          </Badge>
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Payment failures are usually caused by incorrect card details,
            insufficient funds, or a temporary block from your bank.
            Double-check your billing information and try again. If the issue
            persists, contact your bank or reach out to our support team.
          </p>
          <InlineAlert variant="warning" appearance="soft">
            <InlineAlertDescription>
              We’ve detected an issue with payment processing on your account.
              Please verify your card details or try a different payment method.
            </InlineAlertDescription>
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
    </Accordion>
  )
}
