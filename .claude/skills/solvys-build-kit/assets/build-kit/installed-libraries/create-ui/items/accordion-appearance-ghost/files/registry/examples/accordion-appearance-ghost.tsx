import {
  RiCalendarFill,
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiInformationFill,
  RiMailFill,
  RiNotification3Fill,
  RiShieldKeyholeFill,
  RiTeamFill,
} from "@create-ui/assets/icons"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"

export default function AccordionAppearanceGhost() {
  return (
    <div className="flex w-full max-w-[560px] flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-body-xs text-placeholder font-mono">
          ghost-default
        </span>
        <div className="border-light rounded-[36px] border px-9 py-6">
          <Accordion type="single" collapsible appearance="ghost-default">
            <AccordionItem value="encryption">
              <AccordionTrigger icon={<RiShieldKeyholeFill />}>
                Is my data encrypted?
                <Badge
                  variant="success"
                  appearance="soft"
                  size="sm"
                  leading={<RiCheckboxCircleFill />}
                  className="ml-auto"
                >
                  Secure
                </Badge>
              </AccordionTrigger>
              <AccordionContent>
                Yes. All data is encrypted in transit and at rest using
                industry-standard AES-256.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="teammates">
              <AccordionTrigger icon={<RiTeamFill />}>
                Can I invite teammates?
                <Badge
                  variant="info"
                  appearance="soft"
                  size="sm"
                  leading={<RiInformationFill />}
                  className="ml-auto"
                >
                  Up to 10
                </Badge>
              </AccordionTrigger>
              <AccordionContent>
                Workspace owners can invite up to 10 members on the current plan
                from the Members page.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-body-xs text-placeholder font-mono">
          ghost-underline
        </span>
        <div className="border-light rounded-[36px] border px-9 py-6">
          <Accordion type="single" collapsible appearance="ghost-underline">
            <AccordionItem value="renewal">
              <AccordionTrigger icon={<RiCalendarFill />}>
                When does my plan renew?
                <Badge
                  variant="neutral"
                  appearance="soft"
                  size="sm"
                  className="ml-auto"
                >
                  Monthly
                </Badge>
              </AccordionTrigger>
              <AccordionContent>
                Your plan renews on the 1st of each month. You can switch to
                annual billing anytime from Billing settings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cancel">
              <AccordionTrigger icon={<RiCloseCircleFill />}>
                How do I cancel my subscription?
                <Badge
                  variant="info"
                  appearance="soft"
                  size="sm"
                  leading={<RiInformationFill />}
                  className="ml-auto"
                >
                  Anytime
                </Badge>
              </AccordionTrigger>
              <AccordionContent>
                Cancel from Billing settings. You keep full access until the end
                of the current billing period.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-body-xs text-placeholder font-mono">
          ghost-rounded
        </span>
        <div className="border-light rounded-[36px] border px-9 py-6">
          <Accordion type="single" collapsible appearance="ghost-rounded">
            <AccordionItem value="email-updates">
              <AccordionTrigger icon={<RiMailFill />}>
                Will I get email updates?
                <Badge
                  variant="success"
                  appearance="soft"
                  size="sm"
                  leading={<RiCheckboxCircleFill />}
                  className="ml-auto"
                >
                  On
                </Badge>
              </AccordionTrigger>
              <AccordionContent>
                Yes. Product and security emails are on by default. Manage them
                anytime in Notification settings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="mute-alerts">
              <AccordionTrigger icon={<RiNotification3Fill />}>
                Can I mute alerts?
                <Badge
                  variant="neutral"
                  appearance="soft"
                  size="sm"
                  className="ml-auto"
                >
                  Optional
                </Badge>
              </AccordionTrigger>
              <AccordionContent>
                You can pause non-essential push and email alerts for up to 7
                days without affecting security notices.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
