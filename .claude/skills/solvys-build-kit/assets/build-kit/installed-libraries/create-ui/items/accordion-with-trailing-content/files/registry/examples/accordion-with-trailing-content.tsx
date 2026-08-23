import { RiAlertFill, RiBankCardFill } from "@create-ui/assets/icons"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"

export default function AccordionWithTrailingContent() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-[560px]">
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
          Usually caused by incorrect card details, insufficient funds, or a
          temporary block from your bank.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
