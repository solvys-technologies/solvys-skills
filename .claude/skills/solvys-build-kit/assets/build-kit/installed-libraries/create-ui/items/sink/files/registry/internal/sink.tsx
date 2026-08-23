import AccordionExample from "@/registry/examples/accordion-example"
import AspectRatioExample from "@/registry/examples/aspect-ratio-example"
import AvatarExample from "@/registry/examples/avatar-example"
import BadgeExample from "@/registry/examples/badge-example"
import ButtonExample from "@/registry/examples/button-example"
import ButtonGroupExample from "@/registry/examples/button-group-example"
import CheckboxExample from "@/registry/examples/checkbox-example"
import CommandExample from "@/registry/examples/command-example"
import FieldExample from "@/registry/examples/field-example"
import InputExample from "@/registry/examples/input-example"
import InputGroupExample from "@/registry/examples/input-group-example"
import InputOtpExample from "@/registry/examples/input-otp-example"
import LabelExample from "@/registry/examples/label-example"
import PaginationExample from "@/registry/examples/pagination-example"
import ProgressExample from "@/registry/examples/progress-example"
import RadioExample from "@/registry/examples/radio-example"
import ScrollAreaExample from "@/registry/examples/scroll-area-example"
import SelectExample from "@/registry/examples/select-example"
import SeparatorExample from "@/registry/examples/separator-example"
import SpinnerExample from "@/registry/examples/spinner-example"
import SwitchExample from "@/registry/examples/switch-example"
import TextareaExample from "@/registry/examples/textarea-example"
import TooltipExample from "@/registry/examples/tooltip-example"

export default function Page() {
  return (
    <div className="flex flex-col gap-12">
      <AccordionExample />
      <AspectRatioExample />
      <AvatarExample />
      <BadgeExample />
      <ButtonExample />
      <ButtonGroupExample />
      <CheckboxExample />
      <CommandExample />
      <FieldExample />
      <InputExample />
      <InputGroupExample />
      <InputOtpExample />
      <LabelExample />
      <PaginationExample />
      <ProgressExample />
      <RadioExample />
      <ScrollAreaExample />
      <SelectExample />
      <SeparatorExample />
      <SpinnerExample />
      <SwitchExample />
      <TextareaExample />
      <TooltipExample />
    </div>
  )
}
