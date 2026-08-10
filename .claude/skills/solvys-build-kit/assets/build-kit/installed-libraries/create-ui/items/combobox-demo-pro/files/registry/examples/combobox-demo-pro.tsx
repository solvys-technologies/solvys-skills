"use client"

import * as React from "react"
import {
  Australia,
  Canada,
  France,
  Germany,
  India,
  Japan,
  Netherlands,
  Spain,
  Turkey,
  UnitedKingdom,
  UnitedStates,
} from "@create-ui/assets/flags"
import { RiSearch2Line } from "@create-ui/assets/icons"

import { Combobox } from "@/registry/ui/combobox"

function Flag({ id }: { id: string }) {
  const props = { className: "size-5 shrink-0" }
  switch (id) {
    case "tr":
      return <Turkey {...props} />
    case "us":
      return <UnitedStates {...props} />
    case "de":
      return <Germany {...props} />
    case "gb":
      return <UnitedKingdom {...props} />
    case "fr":
      return <France {...props} />
    case "es":
      return <Spain {...props} />
    case "nl":
      return <Netherlands {...props} />
    case "jp":
      return <Japan {...props} />
    case "in":
      return <India {...props} />
    case "ca":
      return <Canada {...props} />
    case "au":
      return <Australia {...props} />
    default:
      return null
  }
}

function Dial({ code }: { code: string }) {
  return <span className="text-placeholder">{code}</span>
}

export default function ComboboxDemoPro() {
  const [value, setValue] = React.useState<string | null>("fr")

  return (
    <div className="w-80">
      <Combobox
        aria-label="Country"
        menuTrigger="focus"
        allowsEmptyCollection
        value={value}
        onChange={(key) => setValue(key ? String(key) : null)}
      >
        <Combobox.Input
          placeholder="Search country"
          startContent={
            <span className="flex size-5 shrink-0 items-center justify-center">
              {value ? <Flag id={value} /> : <RiSearch2Line />}
            </span>
          }
        />
        <Combobox.Popover
          renderEmptyState={() => (
            <p className="text-placeholder text-ui-control-sm px-4 py-3 text-center">
              No country found
            </p>
          )}
        >
          <Combobox.Item
            id="tr"
            textValue="Türkiye"
            leading={<Flag id="tr" />}
            trailing={<Dial code="+90" />}
          >
            Türkiye
          </Combobox.Item>
          <Combobox.Item
            id="us"
            textValue="United States"
            leading={<Flag id="us" />}
            trailing={<Dial code="+1" />}
          >
            United States
          </Combobox.Item>
          <Combobox.Item
            id="de"
            textValue="Germany"
            leading={<Flag id="de" />}
            trailing={<Dial code="+49" />}
          >
            Germany
          </Combobox.Item>
          <Combobox.Item
            id="gb"
            textValue="United Kingdom"
            leading={<Flag id="gb" />}
            trailing={<Dial code="+44" />}
          >
            United Kingdom
          </Combobox.Item>
          <Combobox.Item
            id="fr"
            textValue="France"
            leading={<Flag id="fr" />}
            trailing={<Dial code="+33" />}
          >
            France
          </Combobox.Item>
          <Combobox.Item
            id="es"
            textValue="Spain"
            leading={<Flag id="es" />}
            trailing={<Dial code="+34" />}
          >
            Spain
          </Combobox.Item>
          <Combobox.Item
            id="nl"
            textValue="Netherlands"
            leading={<Flag id="nl" />}
            trailing={<Dial code="+31" />}
          >
            Netherlands
          </Combobox.Item>
          <Combobox.Item
            id="jp"
            textValue="Japan"
            leading={<Flag id="jp" />}
            trailing={<Dial code="+81" />}
          >
            Japan
          </Combobox.Item>
          <Combobox.Item
            id="in"
            textValue="India"
            leading={<Flag id="in" />}
            trailing={<Dial code="+91" />}
          >
            India
          </Combobox.Item>
          <Combobox.Item
            id="ca"
            textValue="Canada"
            leading={<Flag id="ca" />}
            trailing={<Dial code="+1" />}
          >
            Canada
          </Combobox.Item>
          <Combobox.Item
            id="au"
            textValue="Australia"
            leading={<Flag id="au" />}
            trailing={<Dial code="+61" />}
          >
            Australia
          </Combobox.Item>
        </Combobox.Popover>
      </Combobox>
    </div>
  )
}
