"use client"

import * as React from "react"
import {
  MicrosoftExcel,
  MicrosoftPowerPoint,
  MicrosoftWord,
  Notion,
} from "@create-ui/assets/brands"
import {
  TokenBNB,
  TokenBTC,
  TokenDOGE,
  TokenETH,
  TokenSOL,
  TokenUSDC,
  TokenXRP,
} from "@create-ui/assets/crypto"
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
import {
  RiAddCircleFill,
  RiBankCardLine,
  RiCheckboxCircleFill,
  RiEmotionLine,
  RiErrorWarningFill,
  RiFigmaFill,
  RiFileLine,
  RiFileWord2Line,
  RiGlobalLine,
  RiImageLine,
  RiLock2Line,
  RiSparkling2Line,
} from "@create-ui/assets/icons"
import {
  AmericanExpressColor,
  MaestroColor,
  MastercardColor,
  VisaColor,
} from "@create-ui/assets/payments"
import {
  Gumroad,
  Instagram,
  Pinterest,
  Threads,
  XBlack,
} from "@create-ui/assets/social"

import { SectionFrame } from "@/registry/components/example"
import { cn } from "@/registry/lib/utils"
import { Avatar, AvatarImage, AvatarText } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button, ButtonLabel } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Chip } from "@/registry/ui/chip"
import { Field, FieldHelper, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { InputGroup } from "@/registry/ui/input-group"
import { Select } from "@/registry/ui/select"
import { TextLink } from "@/registry/ui/text-link"

// ─── Types ────────────────────────────────────────────────────────────────────

type SelectSize = "xs" | "sm" | "md"
type SelectState = "default" | "filled" | "disabled" | "error" | "loading"

type SelectVariantItem = {
  value: string
  label: string
  leading?: React.ReactNode
}

type SelectVariantConfig = {
  key: string
  label: string
  placeholder: string
  emptyLeading?: React.ReactNode
  defaultFilled?: string
  triggerIcons?: Record<string, React.ReactNode>
  isTag?: boolean
  items: SelectVariantItem[]
}

// ─── Variant data ─────────────────────────────────────────────────────────────

const VARIANTS: SelectVariantConfig[] = [
  {
    key: "default",
    label: "Default",
    placeholder: "Placeholder text...",
    emptyLeading: <RiGlobalLine />,
    defaultFilled: "product-design",
    items: [
      { value: "product-design", label: "Product Design" },
      { value: "ux-design", label: "UX Design" },
      { value: "ui-design", label: "UI Design" },
      { value: "interaction-design", label: "Interaction Design" },
      { value: "motion-design", label: "Motion Design" },
    ],
  },
  {
    key: "crypto",
    label: "Crypto",
    placeholder: "Select token",
    defaultFilled: "btc",
    triggerIcons: {
      btc: <TokenBTC className="size-6 shrink-0" />,
      eth: <TokenETH className="size-6 shrink-0" />,
      sol: <TokenSOL className="size-6 shrink-0" />,
      doge: <TokenDOGE className="size-6 shrink-0" />,
    },
    items: [
      {
        value: "btc",
        label: "Bitcoin",
        leading: <TokenBTC className="size-5 shrink-0" />,
      },
      {
        value: "eth",
        label: "Ethereum",
        leading: <TokenETH className="size-5 shrink-0" />,
      },
      {
        value: "sol",
        label: "Solana",
        leading: <TokenSOL className="size-5 shrink-0" />,
      },
      {
        value: "doge",
        label: "Dogecoin",
        leading: <TokenDOGE className="size-5 shrink-0" />,
      },
    ],
  },
  {
    key: "tag",
    label: "Tag",
    isTag: true,
    placeholder: "Select people...",
    defaultFilled: "ayla",
    items: [
      { value: "ayla", label: "Ayla" },
      { value: "liam", label: "Liam" },
      { value: "yuki", label: "Yuki" },
      { value: "sofia", label: "Sofia" },
      { value: "marcus", label: "Marcus" },
      { value: "priya", label: "Priya" },
    ],
  },
  {
    key: "card",
    label: "Card",
    placeholder: "Select payment method",
    emptyLeading: <RiBankCardLine />,
    defaultFilled: "visa-4242",
    triggerIcons: {
      "visa-4242": <VisaColor className="!h-5 !w-8 shrink-0" />,
      "mc-8888": <MastercardColor className="!h-5 !w-8 shrink-0" />,
      "amex-0005": <AmericanExpressColor className="!h-5 !w-8 shrink-0" />,
    },
    items: [
      {
        value: "visa-4242",
        label: "Visa ···4242",
        leading: <VisaColor className="!h-4 !w-6 shrink-0" />,
      },
      {
        value: "mc-8888",
        label: "Mastercard ···8888",
        leading: <MastercardColor className="!h-4 !w-6 shrink-0" />,
      },
      {
        value: "amex-0005",
        label: "Amex ···0005",
        leading: <AmericanExpressColor className="!h-4 !w-6 shrink-0" />,
      },
    ],
  },
  {
    key: "platform",
    label: "Platform",
    placeholder: "Select platform",
    emptyLeading: <RiGlobalLine />,
    defaultFilled: "gumroad",
    triggerIcons: {
      gumroad: <Gumroad className="size-6 shrink-0" />,
      threads: <Threads className="size-6 shrink-0" />,
      instagram: <Instagram className="size-6 shrink-0" />,
      x: <XBlack className="size-6 shrink-0" />,
      pinterest: <Pinterest className="size-6 shrink-0" />,
    },
    items: [
      {
        value: "gumroad",
        label: "Gumroad",
        leading: <Gumroad className="size-5 shrink-0" />,
      },
      {
        value: "threads",
        label: "Threads",
        leading: <Threads className="size-5 shrink-0" />,
      },
      {
        value: "instagram",
        label: "Instagram",
        leading: <Instagram className="size-5 shrink-0" />,
      },
      {
        value: "x",
        label: "X",
        leading: <XBlack className="size-5 shrink-0" />,
      },
      {
        value: "pinterest",
        label: "Pinterest",
        leading: <Pinterest className="size-5 shrink-0" />,
      },
    ],
  },
  {
    key: "file",
    label: "File",
    placeholder: "Select application",
    emptyLeading: <RiFileLine />,
    defaultFilled: "word",
    triggerIcons: {
      word: <MicrosoftWord className="size-6 shrink-0" />,
      excel: <MicrosoftExcel className="size-6 shrink-0" />,
      ppt: <MicrosoftPowerPoint className="size-6 shrink-0" />,
      notion: <Notion className="size-6 shrink-0" />,
    },
    items: [
      {
        value: "word",
        label: "Microsoft Word",
        leading: <MicrosoftWord className="size-5 shrink-0" />,
      },
      {
        value: "excel",
        label: "Microsoft Excel",
        leading: <MicrosoftExcel className="size-5 shrink-0" />,
      },
      {
        value: "ppt",
        label: "PowerPoint",
        leading: <MicrosoftPowerPoint className="size-5 shrink-0" />,
      },
      {
        value: "notion",
        label: "Notion",
        leading: <Notion className="size-5 shrink-0" />,
      },
    ],
  },
  {
    key: "emoji",
    label: "Emoji",
    placeholder: "Select emoji",
    emptyLeading: <span className="shrink-0 text-xl leading-none">🙂</span>,
    defaultFilled: "fire",
    triggerIcons: {
      grinning: <span className="shrink-0 text-xl leading-none">😀</span>,
      laughing: <span className="shrink-0 text-xl leading-none">😂</span>,
      wink: <span className="shrink-0 text-xl leading-none">😉</span>,
      "heart-eyes": <span className="shrink-0 text-xl leading-none">😍</span>,
      thinking: <span className="shrink-0 text-xl leading-none">🤔</span>,
      fire: <span className="shrink-0 text-xl leading-none">🔥</span>,
      rocket: <span className="shrink-0 text-xl leading-none">🚀</span>,
    },
    items: [
      {
        value: "grinning",
        label: "Grinning face",
        leading: <span className="shrink-0 text-xl leading-none">😀</span>,
      },
      {
        value: "laughing",
        label: "Laughing",
        leading: <span className="shrink-0 text-xl leading-none">😂</span>,
      },
      {
        value: "wink",
        label: "Winking face",
        leading: <span className="shrink-0 text-xl leading-none">😉</span>,
      },
      {
        value: "heart-eyes",
        label: "Heart eyes",
        leading: <span className="shrink-0 text-xl leading-none">😍</span>,
      },
      {
        value: "thinking",
        label: "Thinking",
        leading: <span className="shrink-0 text-xl leading-none">🤔</span>,
      },
      {
        value: "fire",
        label: "Fire",
        leading: <span className="shrink-0 text-xl leading-none">🔥</span>,
      },
      {
        value: "rocket",
        label: "Rocket",
        leading: <span className="shrink-0 text-xl leading-none">🚀</span>,
      },
    ],
  },
  {
    key: "country",
    label: "Country",
    placeholder: "Select country",
    emptyLeading: <RiGlobalLine />,
    defaultFilled: "de",
    triggerIcons: {
      de: <Germany className="size-6 shrink-0" />,
      us: <UnitedStates className="size-6 shrink-0" />,
      jp: <Japan className="size-6 shrink-0" />,
      fr: <France className="size-6 shrink-0" />,
      br: <Brazil className="size-6 shrink-0" />,
      au: <Australia className="size-6 shrink-0" />,
      in: <India className="size-6 shrink-0" />,
      tr: <Turkey className="size-6 shrink-0" />,
    },
    items: [
      {
        value: "de",
        label: "Germany",
        leading: <Germany className="size-5 shrink-0" />,
      },
      {
        value: "us",
        label: "United States",
        leading: <UnitedStates className="size-5 shrink-0" />,
      },
      {
        value: "jp",
        label: "Japan",
        leading: <Japan className="size-5 shrink-0" />,
      },
      {
        value: "fr",
        label: "France",
        leading: <France className="size-5 shrink-0" />,
      },
      {
        value: "br",
        label: "Brazil",
        leading: <Brazil className="size-5 shrink-0" />,
      },
      {
        value: "au",
        label: "Australia",
        leading: <Australia className="size-5 shrink-0" />,
      },
      {
        value: "in",
        label: "India",
        leading: <India className="size-5 shrink-0" />,
      },
      {
        value: "tr",
        label: "Türkiye",
        leading: <Turkey className="size-5 shrink-0" />,
      },
    ],
  },
]

const STATES: Array<{ key: SelectState; label: string }> = [
  { key: "default", label: "Default" },
  { key: "filled", label: "Filled" },
  { key: "disabled", label: "Disabled" },
  { key: "error", label: "Error" },
  { key: "loading", label: "Loading" },
]

const SIZES: Array<{ key: SelectSize; label: string }> = [
  { key: "md", label: "md" },
  { key: "sm", label: "sm" },
  { key: "xs", label: "xs" },
]

// ─── TagSelectDemo ────────────────────────────────────────────────────────────

const CHIP_SIZE_MAP: Record<SelectSize, "sm" | "md" | "lg"> = {
  xs: "sm",
  sm: "md",
  md: "lg",
}

// Must match the `gap-1` (4px) on the chip containers below — if that class
// changes, update this constant too or the overflow measurement drifts.
const CHIP_GAP = 4

function TagSelectDemo({
  size,
  state,
  items,
}: {
  size: SelectSize
  state: SelectState
  items: SelectVariantItem[]
}) {
  const initSelected = state === "filled" ? ["ayla", "liam", "yuki"] : []
  const [selected, setSelected] = React.useState<string[]>(initSelected)
  const [visibleCount, setVisibleCount] = React.useState(
    Math.max(1, initSelected.length)
  )

  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const ghostRef = React.useRef<HTMLDivElement | null>(null)
  const roRef = React.useRef<ResizeObserver | null>(null)
  const chipSize = CHIP_SIZE_MAP[size]

  const compute = React.useCallback(() => {
    const container = containerRef.current
    const ghost = ghostRef.current
    if (!container || !ghost) return

    const avail = container.offsetWidth
    const chipEls = ghost.querySelectorAll<HTMLElement>("[data-ghost-chip]")
    const moreEl = ghost.querySelector<HTMLElement>("[data-ghost-more]")
    const moreW = moreEl ? moreEl.offsetWidth + CHIP_GAP : 0

    let used = 0
    let count = 0

    for (let i = 0; i < chipEls.length; i++) {
      const w = chipEls[i].offsetWidth
      const next = used + (i > 0 ? CHIP_GAP : 0) + w
      const isLast = i === chipEls.length - 1

      if (isLast) {
        if (next <= avail) {
          used = next
          count++
        }
      } else {
        if (next + moreW <= avail) {
          used = next
          count++
        } else {
          break
        }
      }
    }

    setVisibleCount(Math.max(1, count))
  }, [])

  // Callback ref attaches the ResizeObserver when the container mounts.
  // Needed because the container is conditionally rendered (empty-state shows placeholder).
  const setContainerRef = React.useCallback(
    (el: HTMLDivElement | null) => {
      roRef.current?.disconnect()
      containerRef.current = el
      if (el) {
        const ro = new ResizeObserver(compute)
        ro.observe(el)
        roRef.current = ro
        compute()
      } else {
        roRef.current = null
      }
    },
    [compute]
  )

  React.useLayoutEffect(() => {
    compute()
  }, [selected, compute])

  React.useEffect(() => () => roRef.current?.disconnect(), [])

  const toggle = React.useCallback((value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }, [])

  const visible = selected.slice(0, visibleCount)
  const overflow = Math.max(0, selected.length - visibleCount)

  return (
    <Select
      size={size}
      isDisabled={state === "disabled"}
      loading={state === "loading"}
      selectionMode="multiple"
      value={selected}
      onChange={(keys) => setSelected([...keys].map(String))}
    >
      <Select.Trigger aria-invalid={state === "error" ? true : undefined}>
        {selected.length > 0 ? (
          <div
            ref={setContainerRef}
            className="relative flex h-full min-w-0 flex-1 items-center gap-1 overflow-hidden"
          >
            <div
              ref={ghostRef}
              aria-hidden
              className="pointer-events-none invisible absolute inset-0 flex items-center gap-1"
            >
              {selected.map((val) => (
                <Chip
                  key={val}
                  data-ghost-chip=""
                  size={chipSize}
                  appearance="soft"
                  variant="neutral"
                  shape="rounded"
                  onClose={() => {}}
                >
                  {items.find((i) => i.value === val)?.label ?? val}
                </Chip>
              ))}
              <span
                data-ghost-more=""
                className="text-ui-control-xs text-placeholder shrink-0 whitespace-nowrap"
              >
                +99 more
              </span>
            </div>

            {visible.map((val) => {
              const label = items.find((i) => i.value === val)?.label ?? val
              return (
                <Chip
                  key={val}
                  size={chipSize}
                  appearance="soft"
                  variant="neutral"
                  shape="rounded"
                  onClose={() => toggle(val)}
                >
                  {label}
                </Chip>
              )
            })}
            {overflow > 0 && (
              <span className="text-ui-control-xs text-placeholder shrink-0 whitespace-nowrap">
                +{overflow} more
              </span>
            )}
          </div>
        ) : (
          <Select.Value placeholder="Select people..." />
        )}
      </Select.Trigger>
      <Select.Popover>
        <Select.Group>
          {items.map((item) => (
            <Select.Item key={item.value} value={item.value}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Popover>
    </Select>
  )
}

// ─── SelectDemo ───────────────────────────────────────────────────────────────

function SelectDemo({
  variant,
  size,
  state,
}: {
  variant: SelectVariantConfig
  size: SelectSize
  state: SelectState
}) {
  const initValue =
    state === "filled"
      ? (variant.defaultFilled ?? variant.items[0]?.value)
      : undefined
  const [value, setValue] = React.useState<string | undefined>(initValue)

  const selectedItem = variant.items.find((i) => i.value === value)
  const triggerLeading =
    value && variant.triggerIcons?.[value]
      ? variant.triggerIcons[value]
      : variant.emptyLeading

  return (
    <Select
      size={size}
      isDisabled={state === "disabled"}
      loading={state === "loading"}
      value={value}
      onChange={(key) => setValue(key as string)}
    >
      <Select.Trigger aria-invalid={state === "error" ? true : undefined}>
        {triggerLeading}
        <Select.Value placeholder={variant.placeholder}>
          {selectedItem ? selectedItem.label : null}
        </Select.Value>
      </Select.Trigger>
      <Select.Popover>
        <Select.Group>
          {variant.items.map((item) => (
            <Select.Item key={item.value} value={item.value}>
              {item.leading}
              {item.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Popover>
    </Select>
  )
}

function DemoCell({
  variant,
  size,
  state,
}: {
  variant: SelectVariantConfig
  size: SelectSize
  state: SelectState
}) {
  if (variant.isTag) {
    return <TagSelectDemo size={size} state={state} items={variant.items} />
  }
  return <SelectDemo variant={variant} size={size} state={state} />
}

// ─── VariantStateMatrix ───────────────────────────────────────────────────────

const VariantStateMatrix = React.memo(function VariantStateMatrix() {
  return (
    <SectionFrame title="Variants × States">
      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-x-4 border-spacing-y-0">
          <thead>
            <tr>
              <th />
              {VARIANTS.map((v) => (
                <th
                  key={v.key}
                  className="text-body px-2 pt-4 pb-3 text-center text-[10px] font-semibold tracking-wider uppercase"
                >
                  {v.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STATES.map((s, si) => (
              <tr key={s.key}>
                <td
                  className={cn(
                    "text-strongest pr-4 text-right align-middle text-[11px] font-semibold whitespace-nowrap uppercase",
                    si > 0 && "pt-6"
                  )}
                >
                  {s.label}
                </td>
                {VARIANTS.map((v) => (
                  <td
                    key={v.key}
                    className={cn(
                      "min-w-[200px] px-2 py-1.5",
                      si > 0 && "pt-6"
                    )}
                  >
                    <DemoCell variant={v} size="md" state={s.key} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionFrame>
  )
})

// ─── SizesSection ─────────────────────────────────────────────────────────────

const SizesSection = React.memo(function SizesSection() {
  return (
    <SectionFrame title="Sizes">
      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-x-4 border-spacing-y-0">
          <thead>
            <tr>
              <th />
              {VARIANTS.map((v) => (
                <th
                  key={v.key}
                  className="text-body px-2 pt-4 pb-3 text-center text-[10px] font-semibold tracking-wider uppercase"
                >
                  {v.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SIZES.map((s, si) => (
              <tr key={s.key}>
                <td
                  className={cn(
                    "text-strongest pr-4 text-right align-middle text-[11px] font-semibold uppercase",
                    si > 0 && "pt-4"
                  )}
                >
                  {s.label}
                </td>
                {VARIANTS.map((v) => (
                  <td
                    key={v.key}
                    className={cn(
                      "min-w-[200px] px-2 py-1.5",
                      si > 0 && "pt-4"
                    )}
                  >
                    <DemoCell variant={v} size={s.key} state="default" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionFrame>
  )
})

// ─── StructuralVariantsSection ────────────────────────────────────────────────

const STRUCTURAL_COUNTRY_ITEMS: SelectVariantItem[] = [
  {
    value: "de",
    label: "Germany",
    leading: <Germany className="size-5 shrink-0" />,
  },
  {
    value: "us",
    label: "United States",
    leading: <UnitedStates className="size-5 shrink-0" />,
  },
  {
    value: "jp",
    label: "Japan",
    leading: <Japan className="size-5 shrink-0" />,
  },
  {
    value: "fr",
    label: "France",
    leading: <France className="size-5 shrink-0" />,
  },
  {
    value: "tr",
    label: "Türkiye",
    leading: <Turkey className="size-5 shrink-0" />,
  },
]

const STRUCTURAL_PEOPLE_ITEMS: SelectVariantItem[] = [
  { value: "ayla", label: "Ayla" },
  { value: "liam", label: "Liam" },
  { value: "yuki", label: "Yuki" },
  { value: "sofia", label: "Sofia" },
  { value: "marcus", label: "Marcus" },
]

function DefaultVariantDemo() {
  const [value, setValue] = React.useState<string | undefined>("de")
  const selected = STRUCTURAL_COUNTRY_ITEMS.find((i) => i.value === value)
  return (
    <Select size="md" value={value} onChange={(key) => setValue(key as string)}>
      <Select.Trigger>
        {selected?.leading ?? <RiGlobalLine />}
        <Select.Value placeholder="Select country">
          {selected?.label}
        </Select.Value>
      </Select.Trigger>
      <Select.Popover>
        <Select.Group>
          {STRUCTURAL_COUNTRY_ITEMS.map((item) => (
            <Select.Item key={item.value} value={item.value}>
              {item.leading}
              {item.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Popover>
    </Select>
  )
}

function MiniVariantDemo() {
  const [value, setValue] = React.useState<string | undefined>("de")
  const selected = STRUCTURAL_COUNTRY_ITEMS.find((i) => i.value === value)
  return (
    <Select
      size="md"
      variant="compact"
      value={value}
      onChange={(key) => setValue(key as string)}
    >
      <Select.Trigger>
        {selected?.leading ?? <RiGlobalLine />}
        <Select.Value placeholder="Select">{selected?.label}</Select.Value>
      </Select.Trigger>
      <Select.Popover>
        <Select.Group>
          {STRUCTURAL_COUNTRY_ITEMS.map((item) => (
            <Select.Item key={item.value} value={item.value}>
              {item.leading}
              {item.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Popover>
    </Select>
  )
}

function CompactVariantDemo() {
  const [value, setValue] = React.useState<string | undefined>("de")
  const selected = STRUCTURAL_COUNTRY_ITEMS.find((i) => i.value === value)
  return (
    <Select
      size="md"
      variant="compact"
      value={value}
      onChange={(key) => setValue(key as string)}
    >
      <Select.Trigger aria-label="Select country">
        {selected?.leading ?? <RiGlobalLine />}
      </Select.Trigger>
      <Select.Popover>
        <Select.Group>
          {STRUCTURAL_COUNTRY_ITEMS.map((item) => (
            <Select.Item key={item.value} value={item.value}>
              {item.leading}
              {item.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Popover>
    </Select>
  )
}

const STRUCTURAL_VARIANTS: Array<{
  key: string
  label: string
  description: string
  render: () => React.ReactNode
}> = [
  {
    key: "default",
    label: "Default",
    description: "Full-width trigger with leading icon, value, and dropdown.",
    render: () => <DefaultVariantDemo />,
  },
  {
    key: "multi",
    label: "Multi-select",
    description: "Full-width trigger composed with chips for multiple values.",
    render: () => (
      <TagSelectDemo size="md" state="filled" items={STRUCTURAL_PEOPLE_ITEMS} />
    ),
  },
  {
    key: "mini",
    label: "Mini",
    description: "Compact width with leading icon plus a short label.",
    render: () => <MiniVariantDemo />,
  },
  {
    key: "compact",
    label: "Compact",
    description: "Icon-only trigger sized to fit, no inline label.",
    render: () => <CompactVariantDemo />,
  },
]

const StructuralVariantsSection = React.memo(
  function StructuralVariantsSection() {
    return (
      <SectionFrame title="Structural Variants">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {STRUCTURAL_VARIANTS.map((v) => (
            <div key={v.key} className="flex flex-col gap-2">
              <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
                {v.label}
              </div>
              <div>{v.render()}</div>
              <div className="text-placeholder text-xs">{v.description}</div>
            </div>
          ))}
        </div>
      </SectionFrame>
    )
  }
)

// ─── EmbeddedSection ──────────────────────────────────────────────────────────

function EmbeddedInputGroupDemo() {
  const [currency, setCurrency] = React.useState("usd")
  return (
    <InputGroup size="md">
      <Select
        value={currency}
        onChange={(key) => setCurrency(key as string)}
        variant="compact"
        size="md"
      >
        <Select.Trigger aria-label="Currency" className="px-3">
          <Select.Value />
        </Select.Trigger>
        <Select.Popover>
          <Select.Item value="usd">USD</Select.Item>
          <Select.Item value="eur">EUR</Select.Item>
          <Select.Item value="jpy">JPY</Select.Item>
          <Select.Item value="try">TRY</Select.Item>
        </Select.Popover>
      </Select>
      <Input placeholder="0.00" inputMode="decimal" />
    </InputGroup>
  )
}

function EmbeddedManualShellDemo() {
  const [value, setValue] = React.useState<string | undefined>("us")
  const selected = STRUCTURAL_COUNTRY_ITEMS.find((i) => i.value === value)
  return (
    <Select value={value} onChange={(key) => setValue(key as string)} size="md">
      <Select.Shell>
        <Select.Trigger>
          {selected?.leading ?? <RiGlobalLine />}
          <Select.Value placeholder="Select country">
            {selected?.label}
          </Select.Value>
        </Select.Trigger>
      </Select.Shell>
      <Select.Popover>
        {STRUCTURAL_COUNTRY_ITEMS.map((item) => (
          <Select.Item key={item.value} value={item.value}>
            {item.leading}
            {item.label}
          </Select.Item>
        ))}
      </Select.Popover>
    </Select>
  )
}

const EmbeddedSection = React.memo(function EmbeddedSection() {
  return (
    <SectionFrame title="Embedded inside a Shell">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Inside InputGroup
          </div>
          <EmbeddedInputGroupDemo />
          <div className="text-placeholder text-xs">
            <code>Select.Trigger</code> auto-detects the parent{" "}
            <code>InputShell</code> and skips its own chrome — the group owns
            the border and ring.
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Manual Select.Shell
          </div>
          <EmbeddedManualShellDemo />
          <div className="text-placeholder text-xs">
            Hand-roll a layout: wrap any composition in{" "}
            <code>Select.Shell</code> to share one chrome.
          </div>
        </div>
      </div>
    </SectionFrame>
  )
})

// ─── Rich items (leading + description) ─────────────────────────────────────────

const PLANS = [
  {
    id: "free",
    label: "Free",
    desc: "For individuals getting started",
    icon: <RiFileLine />,
  },
  {
    id: "pro",
    label: "Pro",
    desc: "Billed annually · advanced features",
    icon: <RiGlobalLine />,
  },
  {
    id: "team",
    label: "Team",
    desc: "Shared billing and workspaces",
    icon: <RiBankCardLine />,
  },
]

function RichItemsDemo() {
  const [value, setValue] = React.useState<string | null>("pro")
  const selected = PLANS.find((plan) => plan.id === value)

  return (
    <Select size="md" value={value} onChange={(key) => setValue(key as string)}>
      <Select.Trigger>
        <Select.Value placeholder="Choose a plan">
          {selected ? selected.label : null}
        </Select.Value>
      </Select.Trigger>
      {/* Dot-notation, composed like a Dropdown popover. */}
      <Select.Popover className="w-80">
        {PLANS.map((plan) => (
          <Select.Item
            key={plan.id}
            value={plan.id}
            leading={plan.icon}
            description={plan.desc}
            indicator={<RiCheckboxCircleFill />}
          >
            {plan.label}
          </Select.Item>
        ))}
      </Select.Popover>
    </Select>
  )
}

const RichItemsSection = React.memo(function RichItemsSection() {
  return (
    <SectionFrame title="Rich items (leading + description)">
      <div className="flex max-w-sm flex-col gap-2">
        <RichItemsDemo />
        <div className="text-placeholder text-xs">
          Compose the popover like a Dropdown: <code>Select.Item</code> takes{" "}
          <code>leading</code>, <code>description</code>, and{" "}
          <code>trailing</code> props, and <code>Select.Popover</code> is the
          content surface.
        </div>
      </div>
    </SectionFrame>
  )
})

// ─── Insert block (rich items + footer) ─────────────────────────────────────────

const INSERT_ITEMS = [
  { id: "word", label: "Word Document", icon: <RiFileWord2Line /> },
  { id: "image", label: "Image", icon: <RiImageLine /> },
  { id: "figma", label: "Embed from Figma", icon: <RiFigmaFill /> },
  { id: "emoji", label: "Emoji", icon: <RiEmotionLine /> },
  { id: "ai", label: "AI Block", icon: <RiSparkling2Line /> },
]

function InsertBlockDemo() {
  const [value, setValue] = React.useState<string | null>(null)
  const selected = INSERT_ITEMS.find((item) => item.id === value)

  return (
    <Select size="xs" value={value} onChange={(key) => setValue(key as string)}>
      <Select.Trigger>
        {selected?.icon}
        <Select.Value placeholder="Insert block">
          {selected ? selected.label : null}
        </Select.Value>
      </Select.Trigger>
      <Select.Popover
        className="w-[330px]"
        footer={
          <>
            <span className="px-component-sm flex flex-1 items-center">
              <Badge
                variant="primary"
                appearance="soft"
                size="sm"
                leading={<RiLock2Line />}
              >
                Unlock with Pro
              </Badge>
            </span>
            <Button variant="neutral-solid" appearance="solid" size="sm">
              Upgrade
            </Button>
          </>
        }
      >
        <Select.Group>
          <Select.Label>Insert</Select.Label>
          {INSERT_ITEMS.filter((item) => item.id !== "ai").map((item) => (
            <Select.Item
              key={item.id}
              value={item.id}
              leading={item.icon}
              indicator={<RiCheckboxCircleFill />}
            >
              {item.label}
            </Select.Item>
          ))}
        </Select.Group>
        <Select.Separator />
        <Select.Item
          value="ai"
          leading={<RiSparkling2Line />}
          indicator={<RiCheckboxCircleFill />}
        >
          AI Block
        </Select.Item>
      </Select.Popover>
    </Select>
  )
}

// ─── Searchable token picker (Figma 12154-71395, md / sm / xs) ───────────────────

type TokenRow = {
  id: string
  name: string
  symbol: string
  price: string
  amount?: string
  icon: React.ReactNode
}

const TOKEN_ASSETS: TokenRow[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    price: "65.214 USD",
    amount: "0.42 BTC",
    icon: <TokenBTC variant="branded" />,
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    price: "1.7565 USD",
    amount: "3.10 ETH",
    icon: <TokenETH variant="branded" />,
  },
]

const TOKEN_POPULAR: TokenRow[] = [
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    price: "0,9821 USD",
    icon: <TokenUSDC variant="branded" />,
  },
  {
    id: "xrp",
    name: "XRP",
    symbol: "XRP",
    price: "1,1932 USD",
    // XRP's `branded` variant is a bare white glyph (no disc) — invisible on
    // white. `background` draws the black square, rounded-full clips it to
    // the same disc as the other tokens.
    icon: <TokenXRP variant="background" className="rounded-full" />,
  },
  {
    id: "bnb",
    name: "BNB",
    symbol: "BNB",
    price: "606,431 USD",
    icon: <TokenBNB variant="branded" />,
  },
]

function WatchlistItem({ token }: { token: TokenRow }) {
  return (
    <Select.Item
      value={token.id}
      textValue={`${token.name} ${token.symbol}`}
      leading={token.icon}
      description={token.price}
      // Holdings amount fills the trailing slot; the selection check sits beside
      // it (both can show at once) and appears only on the selected row.
      trailing={
        token.amount ? (
          <span className="text-placeholder">{token.amount}</span>
        ) : undefined
      }
      indicator={<RiCheckboxCircleFill />}
    >
      {token.name}
    </Select.Item>
  )
}

const TOKEN_BADGE_SIZE: Record<SelectSize, "xs" | "sm" | "md"> = {
  xs: "xs",
  sm: "sm",
  md: "md",
}

// Footer error row metrics per size (Figma: md/sm icon 20 / text 14 / link
// paragraph-sm, xs icon 16 / text 12 / link paragraph-xs).
const TOKEN_FOOTER: Record<
  SelectSize,
  { row: string; icon: string; text: string; link: "xs" | "sm" }
> = {
  xs: {
    row: "px-component-sm gap-1",
    icon: "size-4",
    text: "text-ui-control-sm",
    link: "xs",
  },
  sm: {
    row: "px-component-lg gap-1.5",
    icon: "size-5",
    text: "text-ui-control-md",
    link: "sm",
  },
  md: {
    row: "px-component-lg gap-1.5",
    icon: "size-5",
    text: "text-ui-control-md",
    link: "sm",
  },
}

function SearchableTokenDemo({ size }: { size: SelectSize }) {
  const [value, setValue] = React.useState<string | null>("btc")
  const selected = [...TOKEN_ASSETS, ...TOKEN_POPULAR].find(
    (token) => token.id === value
  )
  const width = size === "md" ? "w-[450px]" : "w-[350px]"

  return (
    <Field size={size} className={width}>
      <FieldLabel>Select Token</FieldLabel>
      <Select value={value} onChange={(key) => setValue(key as string)}>
        <Select.Trigger aria-label="Select token">
          {selected?.icon}
          <Select.Value placeholder="Select token">
            {selected ? selected.symbol : null}
          </Select.Value>
          {selected ? (
            <Badge
              variant="info"
              appearance="soft"
              size={TOKEN_BADGE_SIZE[size]}
            >
              ${selected.symbol}
            </Badge>
          ) : null}
        </Select.Trigger>
        <Select.Popover
          className={width}
          header={<Select.Search placeholder="Search token" />}
          renderEmptyState={() => (
            <p className="text-placeholder text-ui-control-sm px-4 py-3 text-center">
              No tokens found
            </p>
          )}
          footer={
            <div
              className={cn("flex flex-1 items-center", TOKEN_FOOTER[size].row)}
            >
              <RiErrorWarningFill
                className={cn(
                  "text-error-base shrink-0",
                  TOKEN_FOOTER[size].icon
                )}
              />
              <span className={cn("text-body flex-1", TOKEN_FOOTER[size].text)}>
                Couldn&apos;t load prices
              </span>
              <TextLink
                variant="danger"
                size={TOKEN_FOOTER[size].link}
                underline
              >
                Retry
              </TextLink>
            </div>
          }
        >
          <Select.Group>
            <Select.Label>Your assets</Select.Label>
            {TOKEN_ASSETS.map((token) => (
              <WatchlistItem key={token.id} token={token} />
            ))}
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Popular</Select.Label>
            {TOKEN_POPULAR.map((token) => (
              <WatchlistItem key={token.id} token={token} />
            ))}
          </Select.Group>
        </Select.Popover>
      </Select>
    </Field>
  )
}

const SearchableTokenSection = React.memo(function SearchableTokenSection() {
  return (
    <SectionFrame title="Searchable token picker (md / sm / xs)">
      <div className="flex flex-wrap items-start gap-6">
        {SIZES.map((s) => (
          <SearchableTokenDemo key={s.key} size={s.key} />
        ))}
      </div>
    </SectionFrame>
  )
})

const MenuStyleSection = React.memo(function MenuStyleSection() {
  return (
    <SectionFrame title="Menu-style popovers (header, sections, footer)">
      <div className="flex flex-wrap items-start gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-strongest text-[11px] font-semibold tracking-wider uppercase">
            Insert block
          </div>
          <InsertBlockDemo />
        </div>
      </div>
    </SectionFrame>
  )
})

// ─── Multi-select users (Field + checkbox items + footer) ────────────────────────

type UserRow = { id: string; name: string; initials: string; src: string }

const USERS: UserRow[] = [
  {
    id: "ayla",
    name: "Ayla Karagöz",
    initials: "AK",
    src: "https://createui.co/avatars/ayla-karagoz.webp",
  },
  {
    id: "luca",
    name: "Luca Moretti",
    initials: "LM",
    src: "https://createui.co/avatars/luca-moretti.webp",
  },
  {
    id: "liam",
    name: "Liam O’Brien",
    initials: "LO",
    src: "https://createui.co/avatars/liam-obrien.webp",
  },
  {
    id: "yuki",
    name: "Yuki Tanaka",
    initials: "YT",
    src: "https://createui.co/avatars/yuki-tanaka.webp",
  },
  {
    id: "marcus",
    name: "Marcus Okafor",
    initials: "MO",
    src: "https://createui.co/avatars/marcus-okafor.webp",
  },
  {
    id: "sofia",
    name: "Sofia Reis",
    initials: "SR",
    src: "https://createui.co/avatars/sofia-reis.webp",
  },
]

const MAX_CHIPS = 3

function SelectUsersDemo() {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>([
    "ayla",
    "liam",
    "yuki",
  ])

  const visible = selected.slice(0, MAX_CHIPS)
  const overflow = selected.length - visible.length
  const firstName = (id: string) =>
    USERS.find((user) => user.id === id)?.name.split(" ")[0] ?? id

  return (
    <Field size="xs" className="w-[350px]">
      <FieldLabel>Select Users</FieldLabel>
      <Select
        isOpen={open}
        onOpenChange={setOpen}
        selectionMode="multiple"
        value={selected}
        onChange={(keys) => setSelected([...keys].map(String))}
      >
        <Select.Trigger>
          {selected.length > 0 ? (
            <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden">
              {visible.map((id) => (
                <Chip
                  key={id}
                  size="sm"
                  appearance="soft"
                  variant="neutral"
                  shape="rounded"
                  onClose={() =>
                    setSelected((prev) => prev.filter((value) => value !== id))
                  }
                >
                  {firstName(id)}
                </Chip>
              ))}
              {overflow > 0 && (
                <span className="text-ui-control-xs text-placeholder shrink-0 whitespace-nowrap">
                  +{overflow} more
                </span>
              )}
            </div>
          ) : (
            <Select.Value placeholder="Select users..." />
          )}
        </Select.Trigger>
        <Select.Popover
          className="w-[350px]"
          footer={
            <>
              <Button
                variant="neutral-light"
                appearance="soft"
                size="md"
                className="flex-1"
                onClick={() => setSelected([])}
              >
                Clear
              </Button>
              <Button
                variant="neutral-solid"
                appearance="solid"
                size="md"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                Apply
              </Button>
            </>
          }
        >
          {USERS.map((user) => (
            <Select.Item key={user.id} value={user.id} textValue={user.name}>
              {({ isSelected }) => (
                <>
                  <Checkbox
                    checked={isSelected}
                    size="xs"
                    tabIndex={-1}
                    className="pointer-events-none"
                  />
                  <Select.ItemContainer>
                    <Avatar size="2xs">
                      <AvatarImage src={user.src} alt={user.name} />
                      <AvatarText>{user.initials}</AvatarText>
                    </Avatar>
                    <Select.ItemLabel>{user.name}</Select.ItemLabel>
                  </Select.ItemContainer>
                </>
              )}
            </Select.Item>
          ))}
        </Select.Popover>
      </Select>
      <FieldHelper icon={<RiErrorWarningFill />}>
        This selection affects access and permissions
      </FieldHelper>
    </Field>
  )
}

const UserPickerSection = React.memo(function UserPickerSection() {
  return (
    <SectionFrame title="Multi-select with checkbox items">
      <SelectUsersDemo />
    </SectionFrame>
  )
})

// ─── Card picker (two-line items + New footer button) ────────────────────────────

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

function SelectCardDemo() {
  const [value, setValue] = React.useState<string | null>("visa")
  const selectedCard = CARDS.find((row) => row.id === value)

  return (
    <Field size="xs" className="w-[350px]">
      <FieldLabel>Select Card</FieldLabel>
      {/* Searchable Select: passing `header` to Select.Popover wraps the panel
          in a React Aria Autocomplete — the pinned Select.Search input keeps DOM
          focus while arrow keys drive virtual focus in the listbox, and typing
          filters the items against their textValue. No manual query/filter
          state: filtering, keyboard hand-off and empty state are built in. */}
      <Select value={value} onChange={(key) => setValue(key as string)}>
        <Select.Trigger aria-label="Select card">
          {selectedCard?.icon}
          <Select.Value placeholder="Select card">
            {selectedCard
              ? `${selectedCard.name} ···${selectedCard.last4}`
              : null}
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

const CardPickerSection = React.memo(function CardPickerSection() {
  return (
    <SectionFrame title="Searchable card picker (two-line items + footer action)">
      <SelectCardDemo />
    </SectionFrame>
  )
})

// ─── Main export ──────────────────────────────────────────────────────────────

export default function SelectExample() {
  return (
    <div className="flex flex-col gap-16">
      <StructuralVariantsSection />
      <RichItemsSection />
      <MenuStyleSection />
      <SearchableTokenSection />
      <UserPickerSection />
      <CardPickerSection />
      <EmbeddedSection />
      <VariantStateMatrix />
      <SizesSection />
    </div>
  )
}
