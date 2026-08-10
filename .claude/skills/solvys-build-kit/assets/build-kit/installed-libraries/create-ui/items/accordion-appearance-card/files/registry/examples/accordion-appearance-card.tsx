import {
  RiAlertFill,
  RiBankCardFill,
  RiCalendarScheduleFill,
  RiCheckboxCircleFill,
  RiInformationFill,
  RiLockFill,
  RiRefund2Fill,
  RiShieldCheckFill,
  RiTruckFill,
} from "@create-ui/assets/icons"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"

export default function AccordionAppearanceCard() {
  return (
    <div className="flex w-full max-w-[560px] flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-body-xs text-placeholder font-mono">
          outline-rounded
        </span>
        <div className="border-light rounded-[36px] border p-6">
          <Accordion type="single" collapsible appearance="outline-rounded">
            <AccordionItem value="payment-declined">
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
                Usually caused by incorrect card details, insufficient funds, or
                a temporary block from your bank. Update your card and try
                again.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="refund-time">
              <AccordionTrigger icon={<RiRefund2Fill />}>
                How long do refunds take?
                <Badge
                  variant="info"
                  appearance="soft"
                  size="sm"
                  leading={<RiInformationFill />}
                  className="ml-auto"
                >
                  3–5 days
                </Badge>
              </AccordionTrigger>
              <AccordionContent>
                Refunds are issued to your original payment method and typically
                settle within 3 to 5 business days.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-body-xs text-placeholder font-mono">
          outline-sharp
        </span>
        <div className="border-light border p-6">
          <Accordion type="single" collapsible appearance="outline-sharp">
            <AccordionItem value="two-factor">
              <AccordionTrigger icon={<RiShieldCheckFill />}>
                Is two-factor authentication on?
                <Badge
                  variant="success"
                  appearance="soft"
                  size="sm"
                  leading={<RiCheckboxCircleFill />}
                  className="ml-auto"
                >
                  Active
                </Badge>
              </AccordionTrigger>
              <AccordionContent>
                Yes. Two-factor authentication is active using your
                authenticator app. You can manage it from Security settings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reset-password">
              <AccordionTrigger icon={<RiLockFill />}>
                How do I reset my password?
                <Badge
                  variant="neutral"
                  appearance="soft"
                  size="sm"
                  className="ml-auto"
                >
                  Security
                </Badge>
              </AccordionTrigger>
              <AccordionContent>
                Open Security settings and choose Reset Password. We’ll email a
                secure link that expires in 30 minutes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-body-xs text-placeholder font-mono">
          filled-rounded
        </span>
        <div className="border-light rounded-[36px] border p-6">
          <Accordion type="single" collapsible appearance="filled-rounded">
            <AccordionItem value="order-status">
              <AccordionTrigger icon={<RiTruckFill />}>
                Where is my order?
                <Badge
                  variant="info"
                  appearance="soft"
                  size="sm"
                  leading={<RiInformationFill />}
                  className="ml-auto"
                >
                  In transit
                </Badge>
              </AccordionTrigger>
              <AccordionContent>
                Your order has shipped and is on its way. Track live updates
                from the Orders page using your tracking number.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reschedule-delivery">
              <AccordionTrigger icon={<RiCalendarScheduleFill />}>
                Can I change my delivery date?
                <Badge
                  variant="success"
                  appearance="soft"
                  size="sm"
                  leading={<RiCheckboxCircleFill />}
                  className="ml-auto"
                >
                  Available
                </Badge>
              </AccordionTrigger>
              <AccordionContent>
                Yes. You can reschedule delivery up to 24 hours before dispatch
                from the order’s tracking page.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
