import {
  RiArrowRightSLine,
  RiErrorWarningFill,
  RiInformationFill,
  RiListCheck3,
  RiMailLine,
} from "@create-ui/assets/icons"

import { Example, ExampleWrapper } from "@/registry/components/example"
import { Badge } from "@/registry/ui/badge"
import { Checkbox } from "@/registry/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldFooter,
  FieldGroup,
  FieldHelper,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import {
  Label,
  LabelBadgeSlot,
  LabelDescription,
  LabelIcon,
  LabelMain,
  LabelOptional,
  LabelRequired,
} from "@/registry/ui/label"
import { Radio } from "@/registry/ui/radio"
import { RadioGroup } from "@/registry/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select"
import { Switch } from "@/registry/ui/switch"
import { Textarea } from "@/registry/ui/textarea"

export default function FieldExample() {
  return (
    <ExampleWrapper>
      <SizeVariants />
      <RichLabelField />
      <InputFields />
      <TextareaFields />
      <SelectFields />
      <CheckboxFields />
      <RadioFields />
      <SwitchFields />
    </ExampleWrapper>
  )
}

function SizeVariants() {
  return (
    <Example title="Size variants (xs · sm · md)">
      <FieldGroup>
        <Field size="xs">
          <FieldLabel htmlFor="size-xs">Extra Small</FieldLabel>
          <Input id="size-xs" placeholder="Extra small input" />
          <FieldDescription>
            Minimal density — ideal for inline editing.
          </FieldDescription>
        </Field>
        <Field size="sm">
          <FieldLabel htmlFor="size-sm">Small</FieldLabel>
          <Input id="size-sm" placeholder="Small input" />
          <FieldDescription>
            Compact density — ideal for tables.
          </FieldDescription>
        </Field>
        <Field size="md">
          <FieldLabel htmlFor="size-md">Medium</FieldLabel>
          <Input id="size-md" placeholder="Medium input" />
          <FieldDescription>Default density for most forms.</FieldDescription>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function RichLabelField() {
  return (
    <Example title="Rich label (icon, required, badge, footer)">
      <Field size="md">
        <FieldLabel htmlFor="rich-label">
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
        <Input id="rich-label" type="email" placeholder="you@example.com" />
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
    </Example>
  )
}

function InputFields() {
  return (
    <Example title="Input fields">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="input-basic">Basic Input</FieldLabel>
          <Input id="input-basic" placeholder="Enter text" />
        </Field>
        <Field>
          <FieldLabel htmlFor="input-optional">
            Company
            <LabelOptional />
          </FieldLabel>
          <Input id="input-optional" placeholder="Acme Inc." />
          <FieldDescription>
            Used on invoices — leave empty for individuals.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-required">
            Full Name
            <LabelRequired />
          </FieldLabel>
          <Input id="input-required" placeholder="Jane Doe" required />
        </Field>
        <Field invalid>
          <FieldLabel htmlFor="input-invalid">Invalid Input</FieldLabel>
          <Input
            id="input-invalid"
            placeholder="This field has an error"
            aria-invalid
          />
          <FieldError>Please provide a valid value.</FieldError>
        </Field>
        <Field disabled>
          <FieldLabel htmlFor="input-disabled">Disabled Input</FieldLabel>
          <Input id="input-disabled" placeholder="Cannot edit" disabled />
          <FieldDescription>This field is currently disabled.</FieldDescription>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function TextareaFields() {
  return (
    <Example title="Textarea fields">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="textarea-basic">Basic Textarea</FieldLabel>
          <Textarea id="textarea-basic" placeholder="Enter your message" />
        </Field>
        <Field>
          <FieldLabel htmlFor="textarea-bio">Bio</FieldLabel>
          <FieldDescription>
            Tell us about yourself in a few sentences.
          </FieldDescription>
          <Textarea
            id="textarea-bio"
            placeholder="I am a..."
            className="min-h-[120px]"
          />
        </Field>
        <Field invalid>
          <FieldLabel htmlFor="textarea-invalid">Invalid Textarea</FieldLabel>
          <Textarea
            id="textarea-invalid"
            placeholder="This field has an error"
            aria-invalid
          />
          <FieldError
            errors={[
              { message: "Minimum 20 characters required." },
              { message: "No special characters allowed." },
            ]}
          />
        </Field>
      </FieldGroup>
    </Example>
  )
}

function SelectFields() {
  return (
    <Example title="Select fields">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="select-country">Country</FieldLabel>
          <Select>
            <SelectTrigger id="select-country">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
            </SelectContent>
          </Select>
          <FieldDescription>Where should we ship your order?</FieldDescription>
        </Field>
        <Field invalid>
          <FieldLabel htmlFor="select-invalid">Invalid Select</FieldLabel>
          <Select>
            <SelectTrigger id="select-invalid" aria-invalid>
              <SelectValue placeholder="Please choose one" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
            </SelectContent>
          </Select>
          <FieldError>This field is required.</FieldError>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function CheckboxFields() {
  return (
    <Example title="Checkbox fields">
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox id="checkbox-basic" defaultChecked />
          <FieldLabel htmlFor="checkbox-basic" className="font-normal">
            I agree to the terms and conditions
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="checkbox-with-desc" />
          <FieldContent>
            <FieldLabel htmlFor="checkbox-with-desc">
              Subscribe to newsletter
            </FieldLabel>
            <FieldDescription>
              Receive weekly updates about new features and promotions.
            </FieldDescription>
          </FieldContent>
        </Field>
        <FieldLabel htmlFor="checkbox-with-title">
          <Field orientation="horizontal">
            <Checkbox id="checkbox-with-title" />
            <FieldContent>
              <FieldTitle>Enable Touch ID</FieldTitle>
              <FieldDescription>
                Enable Touch ID to quickly unlock your device.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
        <Field size="xs" orientation="horizontal" className="max-w-[250px]">
          <Checkbox id="checkbox-content-prefs" />
          <FieldContent>
            <LabelMain>
              <Label htmlFor="checkbox-content-prefs">
                <LabelIcon>
                  <RiListCheck3 />
                </LabelIcon>
                Content Preferences
                <LabelBadgeSlot>
                  <Badge variant="info" size="xs">
                    UPDATED
                  </Badge>
                </LabelBadgeSlot>
              </Label>
              <LabelDescription>
                Choose the type of content you&apos;d like to see across Create
                UI.
              </LabelDescription>
            </LabelMain>
            <FieldFooter>
              <a href="#">
                Explore all content types
                <RiArrowRightSLine />
              </a>
            </FieldFooter>
          </FieldContent>
        </Field>
        <FieldSet>
          <FieldLegend variant="label">Preferences</FieldLegend>
          <FieldDescription>
            Select all that apply to customize your experience.
          </FieldDescription>
          <FieldGroup className="gap-3">
            <Field orientation="horizontal">
              <Checkbox id="pref-dark" />
              <FieldLabel htmlFor="pref-dark" className="font-normal">
                Dark mode
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="pref-compact" />
              <FieldLabel htmlFor="pref-compact" className="font-normal">
                Compact view
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="pref-notifications" />
              <FieldLabel htmlFor="pref-notifications" className="font-normal">
                Enable notifications
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field invalid orientation="horizontal">
          <Checkbox id="checkbox-invalid" aria-invalid />
          <FieldLabel htmlFor="checkbox-invalid" className="font-normal">
            Invalid checkbox
          </FieldLabel>
        </Field>
        <Field disabled orientation="horizontal">
          <Checkbox id="checkbox-disabled" disabled />
          <FieldLabel htmlFor="checkbox-disabled" className="font-normal">
            Disabled checkbox
          </FieldLabel>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function RadioFields() {
  return (
    <Example title="Radio fields">
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">Subscription Plan</FieldLegend>
          <FieldDescription>
            Pick the plan that fits your team.
          </FieldDescription>
          <RadioGroup defaultValue="pro">
            <Field orientation="horizontal">
              <Radio value="free" id="radio-free" />
              <FieldLabel htmlFor="radio-free" className="font-normal">
                Free Plan
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Radio value="pro" id="radio-pro" />
              <FieldLabel htmlFor="radio-pro" className="font-normal">
                Pro Plan
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Radio value="enterprise" id="radio-enterprise" />
              <FieldLabel htmlFor="radio-enterprise" className="font-normal">
                Enterprise
              </FieldLabel>
            </Field>
          </RadioGroup>
        </FieldSet>
        <RadioGroup className="gap-6">
          <Field orientation="horizontal">
            <Radio value="option1" id="radio-content-1" />
            <FieldContent>
              <FieldLabel htmlFor="radio-content-1">Enable Touch ID</FieldLabel>
              <FieldDescription>
                Enable Touch ID to quickly unlock your device.
              </FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <Radio value="option2" id="radio-content-2" />
            <FieldContent>
              <FieldLabel htmlFor="radio-content-2">Enable Face ID</FieldLabel>
              <FieldDescription>
                Enable Face ID alongside Touch ID for even faster unlocks.
              </FieldDescription>
            </FieldContent>
          </Field>
        </RadioGroup>
      </FieldGroup>
    </Example>
  )
}

function SwitchFields() {
  return (
    <Example title="Switch fields">
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="switch-airplane">Airplane Mode</FieldLabel>
            <FieldDescription>
              Turn on airplane mode to disable all connections.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-airplane" />
        </Field>
        <Field orientation="horizontal">
          <Switch id="switch-marketing" />
          <FieldContent>
            <FieldLabel htmlFor="switch-marketing">Marketing Emails</FieldLabel>
            <FieldDescription>
              Receive emails about new products, features, and more.
            </FieldDescription>
          </FieldContent>
        </Field>
        <Field invalid orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="switch-invalid">Invalid Switch</FieldLabel>
            <FieldDescription>
              This switch has validation errors.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-invalid" aria-invalid />
        </Field>
        <Field disabled orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="switch-disabled">Disabled Switch</FieldLabel>
            <FieldDescription>
              This switch is currently disabled.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-disabled" disabled />
        </Field>
      </FieldGroup>
    </Example>
  )
}
