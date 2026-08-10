import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select"
import { Switch } from "@/registry/ui/switch"
import { Textarea } from "@/registry/ui/textarea"

export default function FieldComposition() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field size="md">
        <FieldLabel htmlFor="field-compose-name">Full Name</FieldLabel>
        <Input id="field-compose-name" placeholder="Jane Doe" />
      </Field>
      <Field size="md">
        <FieldLabel htmlFor="field-compose-country">Country</FieldLabel>
        <Select>
          <SelectTrigger id="field-compose-country">
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Field size="md">
        <FieldLabel htmlFor="field-compose-bio">Bio</FieldLabel>
        <Textarea id="field-compose-bio" placeholder="A few sentences" />
      </Field>
      <Field size="md" orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="field-compose-marketing">
            Marketing Emails
          </FieldLabel>
          <FieldDescription>
            Receive product news and occasional offers.
          </FieldDescription>
        </FieldContent>
        <Switch id="field-compose-marketing" />
      </Field>
    </FieldGroup>
  )
}
