import {
  RiArrowRightSLine,
  RiInformationFill,
  RiMailLine,
} from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"
import {
  Field,
  FieldDescription,
  FieldFooter,
  FieldHelper,
  FieldLabel,
} from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { LabelBadgeSlot, LabelIcon, LabelRequired } from "@/registry/ui/label"

export default function FieldRichLabel() {
  return (
    <Field size="md" className="w-full max-w-sm">
      <FieldLabel htmlFor="field-rich-label">
        <LabelIcon>
          <RiMailLine />
        </LabelIcon>
        Email Address
        <LabelRequired />
        <LabelBadgeSlot>
          <Badge variant="info" size="xs">
            NEW
          </Badge>
        </LabelBadgeSlot>
      </FieldLabel>
      <FieldDescription>
        We&apos;ll never share your email with anyone.
      </FieldDescription>
      <Input id="field-rich-label" type="email" placeholder="you@example.com" />
      <FieldHelper icon={<RiInformationFill />}>
        We send a one-time verification link.
      </FieldHelper>
      <FieldFooter>
        <a href="#">
          Why do we need this?
          <RiArrowRightSLine />
        </a>
      </FieldFooter>
    </Field>
  )
}
