import {
  RiGovernmentLine,
  RiKey2Line,
  RiMailLine,
} from "@create-ui/assets/icons"

import { InfoTooltip } from "@/registry/pro/ui/info-tooltip"
import { Field, FieldGroup } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Label, LabelIcon, LabelInfoSlot } from "@/registry/ui/label"

export default function InfoTooltipField() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field size="sm">
        <Label htmlFor="billing-tax-id">
          <LabelIcon>
            <RiGovernmentLine />
          </LabelIcon>
          Tax ID
          <LabelInfoSlot>
            <InfoTooltip variant="inverse" side="top">
              Shown on invoices and used for tax compliance.
            </InfoTooltip>
          </LabelInfoSlot>
        </Label>
        <Input id="billing-tax-id" placeholder="DE123456789" />
      </Field>
      <Field size="sm">
        <Label htmlFor="billing-email">
          <LabelIcon>
            <RiMailLine />
          </LabelIcon>
          Billing email
          <LabelInfoSlot>
            <InfoTooltip variant="inverse" side="top">
              Where receipts and invoices are sent.
            </InfoTooltip>
          </LabelInfoSlot>
        </Label>
        <Input id="billing-email" type="email" placeholder="billing@acme.com" />
      </Field>
      <Field size="sm">
        <Label htmlFor="billing-api-token">
          <LabelIcon>
            <RiKey2Line />
          </LabelIcon>
          API token
          <LabelInfoSlot>
            <InfoTooltip variant="inverse" side="top">
              Keep this secret. Used to authenticate API requests.
            </InfoTooltip>
          </LabelInfoSlot>
        </Label>
        <Input id="billing-api-token" placeholder="sk-…" />
      </Field>
    </FieldGroup>
  )
}
