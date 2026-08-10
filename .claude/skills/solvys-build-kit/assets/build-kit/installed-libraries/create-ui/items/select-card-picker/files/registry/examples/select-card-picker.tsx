"use client"

import * as React from "react"
import {
  RiAddCircleFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
} from "@create-ui/assets/icons"
import {
  AmericanExpressColor,
  MaestroColor,
  MastercardColor,
  VisaColor,
} from "@create-ui/assets/payments"

import { Button, ButtonLabel } from "@/registry/ui/button"
import { Field, FieldHelper, FieldLabel } from "@/registry/ui/field"
import { Select } from "@/registry/ui/select"

type CardRow = {
  id: string
  name: string
  last4: string
  icon: React.ReactNode
}

const CARDS: CardRow[] = [
  {
    id: "visa",
    name: "Visa",
    last4: "4242",
    icon: <VisaColor className="!h-5 !w-8 shrink-0" />,
  },
  {
    id: "mastercard",
    name: "Mastercard",
    last4: "1436",
    icon: <MastercardColor className="!h-5 !w-8 shrink-0" />,
  },
  {
    id: "amex",
    name: "American Express",
    last4: "0782",
    icon: <AmericanExpressColor className="!h-5 !w-8 shrink-0" />,
  },
  {
    id: "maestro",
    name: "Maestro",
    last4: "1127",
    icon: <MaestroColor className="!h-5 !w-8 shrink-0" />,
  },
]

export default function SelectCardPicker() {
  const [value, setValue] = React.useState<string | null>("visa")
  const selected = CARDS.find((row) => row.id === value)

  return (
    <Field className="w-[350px] max-w-full">
      <FieldLabel>Select Card</FieldLabel>
      <Select
        value={value}
        onChange={(key) => setValue(key ? String(key) : null)}
      >
        <Select.Trigger aria-label="Select card">
          {selected?.icon}
          <Select.Value placeholder="Select card">
            {selected ? `${selected.name} ···${selected.last4}` : null}
          </Select.Value>
        </Select.Trigger>
        <Select.Popover
          className="w-[350px]"
          header={<Select.Search placeholder="Search" />}
          renderEmptyState={() => (
            <p className="text-placeholder text-ui-control-sm px-4 py-3 text-center">
              No cards found
            </p>
          )}
          footer={
            <Button
              variant="neutral-light"
              appearance="soft"
              size="md"
              className="w-full"
            >
              <RiAddCircleFill />
              <ButtonLabel>New</ButtonLabel>
            </Button>
          }
        >
          {CARDS.map((row) => (
            <Select.Item
              key={row.id}
              value={row.id}
              textValue={`${row.name} ${row.last4}`}
              leading={row.icon}
              description={`***${row.last4}`}
              indicator={<RiCheckboxCircleFill />}
            >
              {row.name}
            </Select.Item>
          ))}
        </Select.Popover>
      </Select>
      <FieldHelper icon={<RiErrorWarningFill />}>
        Make sure your selection is correct
      </FieldHelper>
    </Field>
  )
}
