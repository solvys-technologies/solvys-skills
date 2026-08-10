import { RiBuilding2Fill } from "@create-ui/assets/icons"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion"

export default function AccordionDisabled() {
  return (
    <Accordion
      type="single"
      collapsible
      appearance="outline-rounded"
      className="w-full max-w-[560px]"
    >
      <AccordionItem value="free">
        <AccordionTrigger>Free plan features</AccordionTrigger>
        <AccordionContent>
          Core components, community support, and unlimited local usage.
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
