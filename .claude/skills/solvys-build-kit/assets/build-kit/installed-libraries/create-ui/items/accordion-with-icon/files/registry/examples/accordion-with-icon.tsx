import { RiRotateLockFill } from "@create-ui/assets/icons"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion"

export default function AccordionWithIcon() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-[560px]">
      <AccordionItem value="password">
        <AccordionTrigger icon={<RiRotateLockFill />}>
          How do I reset my password?
        </AccordionTrigger>
        <AccordionContent>
          Open account settings and click “Reset Password” to receive an email.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
