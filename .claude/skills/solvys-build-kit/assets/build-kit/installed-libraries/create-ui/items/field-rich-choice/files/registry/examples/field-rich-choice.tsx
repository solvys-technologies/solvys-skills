import { RiArrowRightSLine, RiListCheck3 } from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"
import { Checkbox } from "@/registry/ui/checkbox"
import { Field, FieldContent, FieldFooter } from "@/registry/ui/field"
import {
  Label,
  LabelBadgeSlot,
  LabelDescription,
  LabelIcon,
  LabelMain,
} from "@/registry/ui/label"

export default function FieldRichChoice() {
  return (
    <Field orientation="horizontal" className="w-full max-w-sm">
      <Checkbox id="field-rich-choice" defaultChecked />
      <FieldContent>
        <LabelMain>
          <Label htmlFor="field-rich-choice">
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
            Choose the type of content you&apos;d like to see across Create UI.
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
  )
}
