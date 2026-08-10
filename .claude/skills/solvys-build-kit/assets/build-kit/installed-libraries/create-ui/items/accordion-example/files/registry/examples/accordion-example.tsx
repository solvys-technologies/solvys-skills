import {
  RiAlertFill,
  RiArrowRightLine,
  RiBankCardFill,
  RiBillFill,
  RiBuilding2Fill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiRotateLockFill,
} from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"
import { Button, ButtonLabel } from "@/registry/ui/button"
import { InlineAlert, InlineAlertDescription } from "@/registry/ui/inline-alert"

export default function AccordionExample() {
  return (
    <div className="flex flex-col gap-16 p-4 sm:p-6 lg:p-12">
      <WithIconDemo />
      <WithBadgeDemo />
      <DisabledDemo />
      <MultipleDemo />
      <GhostDefaultDemo />
      <GhostUnderlinedDemo />
      <GhostRoundedDemo />
      <OutlinedRoundedDemo />
      <OutlinedSharpDemo />
      <FilledRoundedDemo />
      <RichContentDemo />
    </div>
  )
}

function WithIconDemo() {
  return (
    <SectionFrame title="With leading icon">
      <Accordion type="single" collapsible className="w-[600px]">
        <AccordionItem value="password">
          <AccordionTrigger icon={<RiRotateLockFill />}>
            How do I reset my password?
          </AccordionTrigger>
          <AccordionContent>
            Navigate to your account settings and click “Reset Password”. You’ll
            receive an email with further instructions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="devices">
          <AccordionTrigger icon={<RiCheckboxCircleFill />}>
            Can I use the app on multiple devices?
          </AccordionTrigger>
          <AccordionContent>
            Yes, you can use the app on up to 5 devices simultaneously with the
            same account.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SectionFrame>
  )
}

function WithBadgeDemo() {
  return (
    <SectionFrame title="With trailing badge">
      <Accordion type="single" collapsible className="w-[600px]">
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
            Payment failures are usually caused by incorrect card details,
            insufficient funds, or a temporary block from your bank.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="billing-info">
          <AccordionTrigger icon={<RiBillFill />}>
            My account is showing incorrect billing info
            <Badge
              variant="danger"
              appearance="solid"
              size="sm"
              shape="pill"
              leading={<RiErrorWarningFill />}
              className="ml-auto"
            >
              Error
            </Badge>
          </AccordionTrigger>
          <AccordionContent>
            Please verify your billing details in account settings. If the issue
            persists, contact our support team for assistance.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SectionFrame>
  )
}

function DisabledDemo() {
  return (
    <SectionFrame title="Disabled">
      <div className="flex flex-col gap-8">
        <Accordion type="single" collapsible className="w-[600px]">
          <AccordionItem value="enterprise" disabled>
            <AccordionTrigger icon={<RiBuilding2Fill />}>
              Enterprise plan features
            </AccordionTrigger>
            <AccordionContent>
              Enterprise plans include advanced security, custom integrations,
              and dedicated support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion
          type="single"
          collapsible
          appearance="ghost-underline"
          className="w-[600px]"
        >
          <AccordionItem value="enterprise" disabled>
            <AccordionTrigger icon={<RiBuilding2Fill />}>
              Enterprise plan features
            </AccordionTrigger>
            <AccordionContent>
              Enterprise plans include advanced security, custom integrations,
              and dedicated support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion
          type="single"
          collapsible
          appearance="ghost-rounded"
          className="w-[600px]"
        >
          <AccordionItem value="enterprise" disabled>
            <AccordionTrigger icon={<RiBuilding2Fill />}>
              Enterprise plan features
            </AccordionTrigger>
            <AccordionContent>
              Enterprise plans include advanced security, custom integrations,
              and dedicated support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion
          type="single"
          collapsible
          appearance="outline-rounded"
          className="w-[600px]"
        >
          <AccordionItem value="enterprise" disabled>
            <AccordionTrigger icon={<RiBuilding2Fill />}>
              Enterprise plan features
            </AccordionTrigger>
            <AccordionContent>
              Enterprise plans include advanced security, custom integrations,
              and dedicated support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion
          type="single"
          collapsible
          appearance="outline-sharp"
          className="w-[600px]"
        >
          <AccordionItem value="enterprise" disabled>
            <AccordionTrigger icon={<RiBuilding2Fill />}>
              Enterprise plan features
            </AccordionTrigger>
            <AccordionContent>
              Enterprise plans include advanced security, custom integrations,
              and dedicated support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion
          type="single"
          collapsible
          appearance="filled-rounded"
          className="w-[600px]"
        >
          <AccordionItem value="enterprise" disabled>
            <AccordionTrigger icon={<RiBuilding2Fill />}>
              Enterprise plan features
            </AccordionTrigger>
            <AccordionContent>
              Enterprise plans include advanced security, custom integrations,
              and dedicated support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </SectionFrame>
  )
}

function MultipleDemo() {
  return (
    <SectionFrame title="Multiple — open more than one">
      <Accordion
        type="multiple"
        appearance="ghost-underline"
        defaultValue={["accessible"]}
        className="w-[600px]"
      >
        <AccordionItem value="accessible">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It follows the WAI-ARIA disclosure pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="styled">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It ships with default styles that match the design system.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="animated">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. Expand/collapse and chevron rotation are animated.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SectionFrame>
  )
}

function GhostDefaultDemo() {
  return (
    <SectionFrame title="Appearance · Ghost Default">
      <Accordion
        type="single"
        collapsible
        appearance="ghost-default"
        className="w-[600px]"
      >
        <AccordionItem value="accessible">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It follows the WAI-ARIA disclosure pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="styled">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It ships with default styles that match the design system.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SectionFrame>
  )
}

function GhostUnderlinedDemo() {
  return (
    <SectionFrame title="Appearance · Ghost Underlined">
      <Accordion
        type="single"
        collapsible
        appearance="ghost-underline"
        className="w-[600px]"
      >
        <AccordionItem value="accessible">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It follows the WAI-ARIA disclosure pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="styled">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It ships with default styles that match the design system.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SectionFrame>
  )
}

function GhostRoundedDemo() {
  return (
    <SectionFrame title="Appearance · Ghost Rounded">
      <Accordion
        type="single"
        collapsible
        appearance="ghost-rounded"
        className="w-[600px]"
      >
        <AccordionItem value="accessible">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It follows the WAI-ARIA disclosure pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="styled">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It ships with default styles that match the design system.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SectionFrame>
  )
}

function OutlinedRoundedDemo() {
  return (
    <SectionFrame title="Appearance · Outlined Rounded">
      <Accordion
        type="single"
        collapsible
        appearance="outline-rounded"
        className="w-[600px]"
      >
        <AccordionItem value="accessible">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It follows the WAI-ARIA disclosure pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="styled">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It ships with default styles that match the design system.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SectionFrame>
  )
}

function OutlinedSharpDemo() {
  return (
    <SectionFrame title="Appearance · Outlined Sharp">
      <Accordion
        type="single"
        collapsible
        appearance="outline-sharp"
        className="w-[600px]"
      >
        <AccordionItem value="accessible">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It follows the WAI-ARIA disclosure pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="styled">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It ships with default styles that match the design system.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SectionFrame>
  )
}

function FilledRoundedDemo() {
  return (
    <SectionFrame title="Appearance · Filled Rounded">
      <Accordion
        type="single"
        collapsible
        appearance="filled-rounded"
        className="w-[600px]"
      >
        <AccordionItem value="accessible">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It follows the WAI-ARIA disclosure pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="styled">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It ships with default styles that match the design system.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SectionFrame>
  )
}

function RichContentDemo() {
  return (
    <SectionFrame title="Rich content (default expanded)">
      <Accordion
        type="single"
        collapsible
        defaultValue="payment"
        appearance="outline-rounded"
        className="w-[600px]"
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
                Please verify your card details or try a different payment
                method.
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
    </SectionFrame>
  )
}
