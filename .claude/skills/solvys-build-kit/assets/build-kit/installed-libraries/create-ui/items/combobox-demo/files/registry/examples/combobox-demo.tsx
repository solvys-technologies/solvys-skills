"use client"

import { Combobox } from "@/registry/ui/combobox"

export default function ComboboxDemo() {
  return (
    <div className="w-full max-w-xs">
      <Combobox
        aria-label="Framework"
        menuTrigger="focus"
        allowsEmptyCollection
        defaultValue="next"
      >
        <Combobox.Input placeholder="Search framework..." />
        <Combobox.Popover
          renderEmptyState={() => (
            <p className="text-placeholder text-ui-control-sm px-4 py-3 text-center">
              No framework found
            </p>
          )}
        >
          <Combobox.Item id="next">Next.js</Combobox.Item>
          <Combobox.Item id="remix">Remix</Combobox.Item>
          <Combobox.Item id="astro">Astro</Combobox.Item>
          <Combobox.Item id="nuxt">Nuxt</Combobox.Item>
          <Combobox.Item id="svelte">SvelteKit</Combobox.Item>
          <Combobox.Item id="solid">SolidStart</Combobox.Item>
        </Combobox.Popover>
      </Combobox>
    </div>
  )
}
