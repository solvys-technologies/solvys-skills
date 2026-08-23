"use client"

import * as React from "react"
import {
  RiCheckLine,
  RiDeleteBin6Line,
  RiErrorWarningLine,
} from "@create-ui/assets/icons"

import { Button, ButtonLabel } from "@/registry/ui/button"

export default function ButtonActionBar() {
  const [saving, setSaving] = React.useState(false)

  function handleSave() {
    setSaving(true)
    window.setTimeout(() => setSaving(false), 1200)
  }

  return (
    <div className="border-light bg-static shadow-neutral-2xs gap-component-lg p-component-lg mx-auto flex w-full max-w-md flex-col rounded-2xl border">
      <div className="gap-component-xs flex flex-col">
        <h3 className="text-heading-h6 text-strongest gap-component-xs flex items-center">
          <RiErrorWarningLine className="text-error-base size-5 shrink-0" />
          Danger zone
        </h3>
        <p className="text-paragraph-sm text-body">
          Delete this project and all of its data. This action cannot be undone.
        </p>
      </div>

      <div className="border-weak gap-component-sm pt-component-lg flex items-center justify-between border-t">
        <Button variant="danger" appearance="soft" size="md">
          <RiDeleteBin6Line />
          <ButtonLabel>Delete project</ButtonLabel>
        </Button>

        <div className="gap-component-sm flex items-center">
          <Button variant="neutral-light" appearance="soft" size="md">
            Cancel
          </Button>
          <Button
            variant="primary"
            appearance="solid"
            size="md"
            loading={saving}
            onClick={handleSave}
          >
            {!saving && <RiCheckLine />}
            <ButtonLabel>Save changes</ButtonLabel>
          </Button>
        </div>
      </div>
    </div>
  )
}
