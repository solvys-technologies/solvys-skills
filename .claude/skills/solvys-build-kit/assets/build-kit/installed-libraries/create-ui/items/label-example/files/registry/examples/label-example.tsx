import {
  RiArrowRightSLine,
  RiBookmarkLine,
  RiKey2Line,
  RiMailLine,
  RiStore3Line,
  RiToolsFill,
  RiUser3Line,
} from "@create-ui/assets/icons"

import { Example, ExampleWrapper } from "@/registry/components/example"
import { InfoTooltip } from "@/registry/pro/ui/info-tooltip"
import { Badge } from "@/registry/ui/badge"
import { Checkbox } from "@/registry/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldFooter,
  FieldLabel,
} from "@/registry/ui/field"
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
  LabelOptional,
  LabelRequired,
} from "@/registry/ui/label"
import { Textarea } from "@/registry/ui/textarea"

export default function LabelExample() {
  return (
    <ExampleWrapper>
      <LabelSimple />
      <LabelWithIcon />
      <LabelWithRequired />
      <LabelWithOptional />
      <LabelWithInlineBadge />
      <LabelWithInfoTooltip />
      <LabelWithFieldDescription />
      <LabelWithCharacterCount />
      <LabelBlockStandalone />
      <LabelBlockSizes />
      <LabelRichFull />
      <LabelWithCheckbox />
      <LabelWithTextarea />
      <LabelWithFooterLink />
    </ExampleWrapper>
  )
}

function LabelSimple() {
  return (
    <Example title="Simple">
      <Field>
        <Label htmlFor="label-simple">Full name</Label>
        <Input id="label-simple" placeholder="Ada Lovelace" />
      </Field>
    </Example>
  )
}

function LabelWithIcon() {
  return (
    <Example title="With icon">
      <Field>
        <Label htmlFor="label-icon">
          <LabelIcon>
            <RiMailLine />
          </LabelIcon>
          Email address
        </Label>
        <Input id="label-icon" type="email" placeholder="you@example.com" />
      </Field>
    </Example>
  )
}

function LabelWithRequired() {
  return (
    <Example title="Required marker">
      <Field>
        <Label htmlFor="label-required">
          <LabelIcon>
            <RiUser3Line />
          </LabelIcon>
          Username
          <LabelRequired />
        </Label>
        <Input id="label-required" placeholder="@jane" required />
      </Field>
    </Example>
  )
}

function LabelWithOptional() {
  return (
    <Example title="Optional marker">
      <Field>
        <Label htmlFor="label-optional">
          <LabelIcon>
            <RiStore3Line />
          </LabelIcon>
          Company
          <LabelOptional />
        </Label>
        <Input id="label-optional" placeholder="Acme Inc." />
      </Field>
    </Example>
  )
}

function LabelWithInlineBadge() {
  return (
    <Example title="Inline badge">
      <Field>
        <Label htmlFor="label-badge">
          <LabelIcon>
            <RiBookmarkLine />
          </LabelIcon>
          Saved view
          <LabelBadgeSlot>
            <Badge variant="info" appearance="outline" shape="pill" size="xs">
              UPDATED
            </Badge>
          </LabelBadgeSlot>
        </Label>
        <Input id="label-badge" placeholder="All open issues" />
      </Field>
    </Example>
  )
}

function LabelWithInfoTooltip() {
  return (
    <Example title="Info tooltip">
      <Field>
        <Label htmlFor="label-info">
          <LabelIcon>
            <RiKey2Line />
          </LabelIcon>
          API token
          <LabelInfoSlot>
            <InfoTooltip variant="inverse" size="sm">
              Rotate this token if it leaks.
            </InfoTooltip>
          </LabelInfoSlot>
        </Label>
        <Input id="label-info" placeholder="sk-…" />
      </Field>
    </Example>
  )
}

function LabelWithFieldDescription() {
  return (
    <Example title="With description (inside Field)">
      <Field>
        <FieldLabel htmlFor="label-field-description">Handle</FieldLabel>
        <Input id="label-field-description" placeholder="@jane" />
        <FieldDescription>
          This is how other people will find you.
        </FieldDescription>
      </Field>
    </Example>
  )
}

function LabelWithCharacterCount() {
  return (
    <Example title="With character counter">
      <Field>
        <LabelBlock>
          <LabelMain>
            <Label htmlFor="label-counter">Bio</Label>
          </LabelMain>
          <LabelCount>0/300</LabelCount>
        </LabelBlock>
        <Textarea id="label-counter" placeholder="Tell us about yourself" />
      </Field>
    </Example>
  )
}

function LabelBlockStandalone() {
  return (
    <Example title="LabelBlock (standalone, no Field)">
      <LabelBlock size="sm">
        <LabelMain>
          <Label>
            <LabelIcon>
              <RiToolsFill />
            </LabelIcon>
            Preferred editor
          </Label>
          <LabelDescription>
            Used to pre-select your editor in tutorials and snippets.
          </LabelDescription>
        </LabelMain>
      </LabelBlock>
    </Example>
  )
}

function LabelBlockSizes() {
  return (
    <Example title="LabelBlock sizes (xs · sm · md)">
      <div className="flex w-full flex-col gap-6">
        <LabelBlock size="xs">
          <LabelMain>
            <Label>Tag</Label>
            <LabelDescription>Short, lowercase, no spaces.</LabelDescription>
          </LabelMain>
        </LabelBlock>
        <LabelBlock size="sm">
          <LabelMain>
            <Label>Project name</Label>
            <LabelDescription>Visible to all team members.</LabelDescription>
          </LabelMain>
        </LabelBlock>
        <LabelBlock size="md">
          <LabelMain>
            <Label>Workspace URL</Label>
            <LabelDescription>
              Pick something memorable — you can change it later.
            </LabelDescription>
          </LabelMain>
        </LabelBlock>
        <LabelBlock size="md">
          <LabelMain>
            <Label>
              <LabelIcon>
                <RiToolsFill />
              </LabelIcon>
              Preferred tool
            </Label>
            <LabelDescription>
              The primary tool you use to build with Create UI.
            </LabelDescription>
          </LabelMain>
        </LabelBlock>
      </div>
    </Example>
  )
}

function LabelRichFull() {
  return (
    <Example title="Rich — all slots">
      <Field>
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
    </Example>
  )
}

function LabelWithCheckbox() {
  return (
    <Example title="With checkbox">
      <Field orientation="horizontal">
        <Checkbox id="label-checkbox" />
        <Label htmlFor="label-checkbox">
          I agree to the terms and conditions
        </Label>
      </Field>
    </Example>
  )
}

function LabelWithTextarea() {
  return (
    <Example title="With textarea">
      <Field>
        <Label htmlFor="label-textarea">Release notes</Label>
        <Textarea
          id="label-textarea"
          placeholder="What changed in this version?"
        />
      </Field>
    </Example>
  )
}

function LabelWithFooterLink() {
  return (
    <Example title="With footer link">
      <Field>
        <LabelBlock size="md">
          <LabelMain>
            <Label htmlFor="label-footer">
              <LabelIcon>
                <RiToolsFill />
              </LabelIcon>
              Integration
              <LabelBadgeSlot>
                <Badge variant="danger" size="xs">
                  REQUIRED
                </Badge>
              </LabelBadgeSlot>
            </Label>
            <LabelDescription>
              Connect the service you want Create UI to sync with.
            </LabelDescription>
          </LabelMain>
        </LabelBlock>
        <Input id="label-footer" placeholder="Linear, GitHub, …" />
        <FieldFooter size="md">
          <a href="#">
            Browse all integrations
            <RiArrowRightSLine />
          </a>
        </FieldFooter>
      </Field>
    </Example>
  )
}
