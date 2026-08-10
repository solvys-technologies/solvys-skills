import { RiBookmarkLine } from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"
import { Field } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Label, LabelBadgeSlot, LabelIcon } from "@/registry/ui/label"

export default function LabelInlineBadge() {
  return (
    <Field className="w-full max-w-xs">
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
  )
}
