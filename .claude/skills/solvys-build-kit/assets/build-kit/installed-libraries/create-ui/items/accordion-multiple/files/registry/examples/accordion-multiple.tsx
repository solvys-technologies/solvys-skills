import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion"

export default function AccordionMultiple() {
  return (
    <Accordion
      type="multiple"
      appearance="ghost-underline"
      defaultValue={["accessible", "animated"]}
      className="w-full max-w-[560px]"
    >
      <AccordionItem value="accessible">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. Open me and the others.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="animated">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes. Stays open alongside siblings.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
