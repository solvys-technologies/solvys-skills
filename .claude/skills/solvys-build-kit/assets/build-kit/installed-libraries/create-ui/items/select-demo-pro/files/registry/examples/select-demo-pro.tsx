"use client"

import * as React from "react"
import {
  Australia,
  Brazil,
  France,
  Germany,
  India,
  Japan,
  Turkey,
  UnitedStates,
} from "@create-ui/assets/flags"
import { RiCheckboxCircleFill, RiGlobalLine } from "@create-ui/assets/icons"

import { Select } from "@/registry/ui/select"

type Country = { id: string; name: string; flag: React.ReactNode }

const POPULAR: Country[] = [
  { id: "us", name: "United States", flag: <UnitedStates /> },
  { id: "de", name: "Germany", flag: <Germany /> },
  { id: "jp", name: "Japan", flag: <Japan /> },
]

const ALL: Country[] = [
  { id: "au", name: "Australia", flag: <Australia /> },
  { id: "br", name: "Brazil", flag: <Brazil /> },
  { id: "fr", name: "France", flag: <France /> },
  { id: "in", name: "India", flag: <India /> },
  { id: "tr", name: "Türkiye", flag: <Turkey /> },
]

const COUNTRIES = [...POPULAR, ...ALL]

function CountryItem({ country }: { country: Country }) {
  return (
    <Select.Item
      value={country.id}
      textValue={country.name}
      leading={<span className="[&_svg]:size-5">{country.flag}</span>}
      indicator={<RiCheckboxCircleFill />}
    >
      {country.name}
    </Select.Item>
  )
}

export default function SelectDemoPro() {
  const [value, setValue] = React.useState<string | null>("de")
  const selected = COUNTRIES.find((country) => country.id === value)

  return (
    <div className="w-full max-w-xs">
      <Select
        value={value}
        onChange={(key) => setValue(key ? String(key) : null)}
      >
        <Select.Trigger aria-label="Select country">
          {selected ? (
            <span className="[&_svg]:size-6">{selected.flag}</span>
          ) : (
            <RiGlobalLine />
          )}
          <Select.Value placeholder="Select country">
            {selected?.name}
          </Select.Value>
        </Select.Trigger>
        <Select.Popover
          className="w-[320px]"
          header={<Select.Search placeholder="Search country" />}
          renderEmptyState={() => (
            <p className="text-placeholder text-ui-control-sm px-4 py-3 text-center">
              No country found
            </p>
          )}
        >
          <Select.Group>
            <Select.Label>Popular</Select.Label>
            {POPULAR.map((country) => (
              <CountryItem key={country.id} country={country} />
            ))}
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>All countries</Select.Label>
            {ALL.map((country) => (
              <CountryItem key={country.id} country={country} />
            ))}
          </Select.Group>
        </Select.Popover>
      </Select>
    </div>
  )
}
