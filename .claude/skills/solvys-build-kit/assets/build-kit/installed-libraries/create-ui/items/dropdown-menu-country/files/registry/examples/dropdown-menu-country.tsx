"use client"

import * as React from "react"
import {
  France,
  Germany,
  Japan,
  Turkey,
  UnitedStates,
} from "@create-ui/assets/flags"
import { Collection, type Selection } from "react-aria-components"

import { Button } from "@/registry/ui/button"
import { Dropdown } from "@/registry/ui/dropdown-menu"

type Country = { id: string; name: string; flag: React.ReactNode }

const POPULAR: Country[] = [
  { id: "de", name: "Germany", flag: <Germany /> },
  { id: "tr", name: "Türkiye", flag: <Turkey /> },
  { id: "us", name: "United States", flag: <UnitedStates /> },
]

const ALL: Country[] = [
  { id: "fr", name: "France", flag: <France /> },
  { id: "jp", name: "Japan", flag: <Japan /> },
]

const GROUPS = [
  { name: "Popular", items: POPULAR },
  { name: "All", items: ALL },
]

export default function DropdownMenuCountry() {
  const [selected, setSelected] = React.useState<Selection>(new Set(["tr"]))

  return (
    <Dropdown>
      <Button variant="neutral-solid" appearance="outline" size="sm">
        Country
      </Button>
      <Dropdown.Popover className="w-80" header={<Dropdown.Search />}>
        <Dropdown.Menu
          aria-label="Country"
          autoFocus={false}
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={setSelected}
          disallowEmptySelection
          items={GROUPS}
          renderEmptyState={() => (
            <p className="text-placeholder text-ui-control-sm px-4 py-3 text-center">
              No countries found
            </p>
          )}
        >
          {(group) => (
            <Dropdown.Section id={group.name}>
              <Dropdown.Header>{group.name}</Dropdown.Header>
              <Collection items={group.items}>
                {(country) => (
                  <Dropdown.Item
                    id={country.id}
                    textValue={country.name}
                    leading={country.flag}
                  >
                    {country.name}
                  </Dropdown.Item>
                )}
              </Collection>
            </Dropdown.Section>
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
