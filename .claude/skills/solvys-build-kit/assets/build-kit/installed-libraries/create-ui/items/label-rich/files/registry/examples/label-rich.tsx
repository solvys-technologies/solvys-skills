import { RiMailLine } from "@create-ui/assets/icons"

import { InfoTooltip } from "@/registry/pro/ui/info-tooltip"
import { Badge } from "@/registry/ui/badge"
import { Field } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import {
  Label,
  LabelBadgeSlot,
  LabelBlock,
  LabelCount,
  LabelDescription,
  LabelIcon,
  LabelInfoSlot,
  LabelMain,
  LabelRequired,
} from "@/registry/ui/label"

export default function LabelRich() {
  return (
    <Field className="w-full max-w-xs">
      <LabelBlock size="sm">
        <LabelMain>
          <Label htmlFor="label-rich">
            <LabelIcon>
              <RiMailLine />
            </LabelIcon>
            Work email
            <LabelRequired />
            <LabelBadgeSlot>
              <Badge variant="neutral" size="sm">
                NEW
              </Badge>
            </LabelBadgeSlot>
            <LabelInfoSlot>
              <InfoTooltip variant="inverse" size="md">
                We send receipts and security alerts here.
              </InfoTooltip>
            </LabelInfoSlot>
          </Label>
          <LabelDescription>
            Used for sign-in and transactional email.
          </LabelDescription>
        </LabelMain>
        <LabelCount>0/120</LabelCount>
      </LabelBlock>
      <Input id="label-rich" type="email" placeholder="jane@acme.com" />
    </Field>
  )
}
