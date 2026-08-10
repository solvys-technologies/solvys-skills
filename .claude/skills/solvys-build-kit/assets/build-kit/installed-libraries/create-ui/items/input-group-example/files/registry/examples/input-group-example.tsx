"use client"

import * as React from "react"
import {
  RiFileCopyLine,
  RiGlobalLine,
  RiLock2Line,
  RiMailOpenLine,
  RiSearch2Line,
} from "@create-ui/assets/icons"

import { ExampleWrapper, SectionFrame } from "@/registry/components/example"
import {
  PasswordStrength,
  type StrengthLevel,
} from "@/registry/pro/ui/password-strength"
import { CurrencyFlag } from "@/registry/ui/country-flag"
import { CreditCardInput } from "@/registry/ui/credit-card-input"
import { DateInput } from "@/registry/ui/date-input"
import { Field } from "@/registry/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupControl,
  InputGroupKbd,
  InputGroupLeadingIcon,
  InputGroupProvider,
  InputGroupSelect,
  InputGroupShell,
  InputGroupSlot,
} from "@/registry/ui/input-group"
import { PhoneInput } from "@/registry/ui/phone-input"
import { SelectItem } from "@/registry/ui/select"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Size = "xs" | "sm" | "md"
type State = "default" | "filled" | "disabled" | "error" | "loading"

// One canonical test number per size — demos auto-detection via card-validator.
const SIZE_CARD_DEFAULTS: Record<Size, string> = {
  xs: "4242424242424242", // Visa
  sm: "5555555555554444", // Mastercard
  md: "378282246310005", // American Express (15-digit)
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export default function InputGroupExample() {
  return (
    <ExampleWrapper className="px-6">
      <StatesShowcase />
      <SizeShowcase size="xs" />
      <SizeShowcase size="sm" />
      <SizeShowcase size="md" />
      <PasswordStrengthSection />
      <CompositionShowcase />
    </ExampleWrapper>
  )
}

// ---------------------------------------------------------------------------
// 1. States (all variants, one size)
// ---------------------------------------------------------------------------

function StatesShowcase() {
  const states: { id: State; label: string }[] = [
    { id: "default", label: "Default" },
    { id: "filled", label: "Filled" },
    { id: "disabled", label: "Disabled" },
    { id: "error", label: "Error" },
    { id: "loading", label: "Loading" },
  ]

  return (
    <SectionFrame title="Input Group — All Variants × States (Sm)">
      <div className="flex flex-col gap-8">
        {/* Default */}
        <VariantCard
          title="Default"
          states={states}
          render={(state) => (
            <Field
              size="sm"
              invalid={state === "error"}
              disabled={state === "disabled"}
              loading={state === "loading"}
            >
              <InputGroup>
                <InputGroupSlot>
                  <InputGroupControl
                    placeholder="Placeholder Text.."
                    defaultValue={state === "filled" ? "John Doe" : undefined}
                  />
                </InputGroupSlot>
              </InputGroup>
            </Field>
          )}
        />

        {/* E-Mail */}
        <VariantCard
          title="E-Mail"
          states={states}
          render={(state) => (
            <Field
              size="sm"
              invalid={state === "error"}
              disabled={state === "disabled"}
              loading={state === "loading"}
            >
              <InputGroup>
                <InputGroupLeadingIcon>
                  <RiMailOpenLine />
                </InputGroupLeadingIcon>
                <InputGroupSlot>
                  <InputGroupControl
                    placeholder="hi@createui.co"
                    defaultValue={
                      state === "filled" ? "john@example.com" : undefined
                    }
                  />
                </InputGroupSlot>
              </InputGroup>
            </Field>
          )}
        />

        {/* Password */}
        <VariantCard
          title="Password"
          states={states}
          render={(state) => (
            <Field
              size="sm"
              invalid={state === "error"}
              disabled={state === "disabled"}
              loading={state === "loading"}
            >
              <InputGroup>
                <InputGroupSlot>
                  <RiLock2Line />
                  <InputGroupControl
                    type="password"
                    placeholder="••••••••••••"
                    defaultValue={
                      state === "filled" ? "mysecretpassword" : undefined
                    }
                  />
                </InputGroupSlot>
              </InputGroup>
            </Field>
          )}
        />

        {/* Search */}
        <VariantCard
          title="Search"
          states={states}
          render={(state) => (
            <Field
              size="sm"
              invalid={state === "error"}
              disabled={state === "disabled"}
              loading={state === "loading"}
            >
              <InputGroup>
                <InputGroupSlot>
                  <RiSearch2Line />
                  <InputGroupControl
                    placeholder="Search anything.."
                    defaultValue={
                      state === "filled" ? "create ui components" : undefined
                    }
                  />
                  <InputGroupKbd>1</InputGroupKbd>
                </InputGroupSlot>
                <InputGroupButton>Search</InputGroupButton>
              </InputGroup>
            </Field>
          )}
        />

        {/* Phone Number */}
        <VariantCard
          title="Phone Number"
          states={states}
          render={(state) => (
            <Field
              size="sm"
              invalid={state === "error"}
              disabled={state === "disabled"}
              loading={state === "loading"}
            >
              <PhoneInput
                defaultValue={state === "filled" ? "+491713920012" : undefined}
              />
            </Field>
          )}
        />

        {/* Website */}
        <VariantCard
          title="Website"
          states={states}
          render={(state) => (
            <Field
              size="sm"
              invalid={state === "error"}
              disabled={state === "disabled"}
              loading={state === "loading"}
            >
              <InputGroup>
                <InputGroupAddon>
                  <RiGlobalLine />
                  <span>https://</span>
                </InputGroupAddon>
                <InputGroupSlot>
                  <InputGroupControl
                    placeholder="createui.co"
                    defaultValue={
                      state === "filled" ? "createui.co" : undefined
                    }
                  />
                </InputGroupSlot>
                <InputGroupButton iconOnly>
                  <RiFileCopyLine />
                </InputGroupButton>
              </InputGroup>
            </Field>
          )}
        />

        {/* Amount */}
        <VariantCard
          title="Amount"
          states={states}
          render={(state) => (
            <Field
              size="sm"
              invalid={state === "error"}
              disabled={state === "disabled"}
              loading={state === "loading"}
            >
              <InputGroup>
                <InputGroupLeadingIcon>
                  <span className="font-medium">$</span>
                </InputGroupLeadingIcon>
                <InputGroupSlot>
                  <InputGroupControl
                    placeholder="0.00"
                    defaultValue={state === "filled" ? "1,250.00" : undefined}
                  />
                </InputGroupSlot>
                <CurrencySelect />
              </InputGroup>
            </Field>
          )}
        />

        {/* Date */}
        <VariantCard
          title="Date"
          states={states}
          render={(state) => (
            <Field
              size="sm"
              invalid={state === "error"}
              disabled={state === "disabled"}
              loading={state === "loading"}
            >
              <DateInput
                defaultValue={state === "filled" ? "25 / 03 / 2026" : undefined}
              />
            </Field>
          )}
        />

        {/* Card Number */}
        <VariantCard
          title="Card Number"
          states={states}
          render={(state) => (
            <Field
              size="sm"
              invalid={state === "error"}
              disabled={state === "disabled"}
              loading={state === "loading"}
            >
              <CreditCardInput
                defaultValue={
                  state === "loading"
                    ? "4242424242424242"
                    : state === "filled"
                      ? "5555555555554444"
                      : undefined
                }
              />
            </Field>
          )}
        />

        {/* Domain */}
        <VariantCard
          title="Domain"
          states={states}
          render={(state) => (
            <Field
              size="sm"
              invalid={state === "error"}
              disabled={state === "disabled"}
              loading={state === "loading"}
            >
              <InputGroup>
                <InputGroupSlot>
                  <RiGlobalLine />
                  <InputGroupControl
                    placeholder="ecosystem"
                    defaultValue={state === "filled" ? "ecosystem" : undefined}
                  />
                </InputGroupSlot>
                <InputGroupSelect defaultValue="createui.co">
                  <SelectItem value="createui.co">.createui.co</SelectItem>
                  <SelectItem value="createui.dev">.createui.dev</SelectItem>
                </InputGroupSelect>
              </InputGroup>
            </Field>
          )}
        />

        {/* Permission */}
        <VariantCard
          title="Permission"
          states={states}
          render={(state) => (
            <Field
              size="sm"
              invalid={state === "error"}
              disabled={state === "disabled"}
              loading={state === "loading"}
            >
              <InputGroup>
                <InputGroupSlot>
                  <InputGroupControl
                    placeholder="Enter name..."
                    defaultValue={
                      state === "filled" || state !== "error"
                        ? "Chatto"
                        : undefined
                    }
                  />
                </InputGroupSlot>
                <InputGroupSelect defaultValue="edit">
                  <SelectItem value="edit">Can Edit</SelectItem>
                  <SelectItem value="view">Can View</SelectItem>
                  <SelectItem value="comment">Can Comment</SelectItem>
                </InputGroupSelect>
              </InputGroup>
            </Field>
          )}
        />
      </div>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// 2. Size Showcase
// ---------------------------------------------------------------------------

function SizeShowcase({ size }: { size: Size }) {
  const sizeLabel = size.toUpperCase()

  return (
    <SectionFrame title={`Input Group — All Variants (${sizeLabel} Size)`}>
      <div className="flex flex-col gap-8">
        <SizeCard title="Default" size={size}>
          <Field size={size}>
            <InputGroup>
              <InputGroupSlot>
                <InputGroupControl placeholder="Placeholder Text.." />
              </InputGroupSlot>
            </InputGroup>
          </Field>
        </SizeCard>

        <SizeCard title="E-Mail" size={size}>
          <Field size={size}>
            <InputGroup>
              <InputGroupLeadingIcon>
                <RiMailOpenLine />
              </InputGroupLeadingIcon>
              <InputGroupSlot>
                <InputGroupControl placeholder="hi@createui.co" />
              </InputGroupSlot>
            </InputGroup>
          </Field>
        </SizeCard>

        <SizeCard title="Password" size={size}>
          <Field size={size}>
            <InputGroup>
              <InputGroupSlot>
                <RiLock2Line />
                <InputGroupControl type="password" placeholder="••••••••••••" />
              </InputGroupSlot>
            </InputGroup>
          </Field>
        </SizeCard>

        <SizeCard title="Search" size={size}>
          <Field size={size}>
            <InputGroup>
              <InputGroupSlot>
                <RiSearch2Line />
                <InputGroupControl placeholder="Search anything.." />
                <InputGroupKbd>1</InputGroupKbd>
              </InputGroupSlot>
              <InputGroupButton>Search</InputGroupButton>
            </InputGroup>
          </Field>
        </SizeCard>

        <SizeCard title="Phone Number" size={size}>
          <Field size={size}>
            <PhoneInput />
          </Field>
        </SizeCard>

        <SizeCard title="Website" size={size}>
          <Field size={size}>
            <InputGroup>
              <InputGroupAddon>
                <RiGlobalLine />
                <span>https://</span>
              </InputGroupAddon>
              <InputGroupSlot>
                <InputGroupControl placeholder="createui.co" />
              </InputGroupSlot>
              <InputGroupButton iconOnly>
                <RiFileCopyLine />
              </InputGroupButton>
            </InputGroup>
          </Field>
        </SizeCard>

        <SizeCard title="Amount" size={size}>
          <Field size={size}>
            <InputGroup>
              <InputGroupLeadingIcon>
                <span className="font-medium">$</span>
              </InputGroupLeadingIcon>
              <InputGroupSlot>
                <InputGroupControl placeholder="0.00" />
              </InputGroupSlot>
              <CurrencySelect />
            </InputGroup>
          </Field>
        </SizeCard>

        <SizeCard title="Date" size={size}>
          <Field size={size}>
            <DateInput />
          </Field>
        </SizeCard>

        <SizeCard title="Card Number" size={size}>
          <Field size={size}>
            <CreditCardInput defaultValue={SIZE_CARD_DEFAULTS[size]} />
          </Field>
        </SizeCard>

        <SizeCard title="Domain" size={size}>
          <Field size={size}>
            <InputGroup>
              <InputGroupSlot>
                <RiGlobalLine />
                <InputGroupControl placeholder="ecosystem" />
              </InputGroupSlot>
              <InputGroupSelect defaultValue="createui.co">
                <SelectItem value="createui.co">.createui.co</SelectItem>
                <SelectItem value="createui.dev">.createui.dev</SelectItem>
              </InputGroupSelect>
            </InputGroup>
          </Field>
        </SizeCard>

        <SizeCard title="Permission" size={size}>
          <Field size={size}>
            <InputGroup>
              <InputGroupSlot>
                <InputGroupControl placeholder="Enter name..." />
              </InputGroupSlot>
              <InputGroupSelect defaultValue="edit">
                <SelectItem value="edit">Can Edit</SelectItem>
                <SelectItem value="view">Can View</SelectItem>
                <SelectItem value="comment">Can Comment</SelectItem>
              </InputGroupSelect>
            </InputGroup>
          </Field>
        </SizeCard>
      </div>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// 3. Password Strength
// ---------------------------------------------------------------------------

const PASSWORD_STRENGTH_VARIANTS: {
  strength: StrengthLevel
  rules: { label: string; met: boolean }[]
}[] = [
  {
    strength: 1,
    rules: [
      { label: "Use at least 8 characters.", met: false },
      { label: "Mix letters, numbers, and symbols.", met: false },
      { label: "Avoid common words or patterns.", met: false },
    ],
  },
  {
    strength: 3,
    rules: [
      { label: "Use at least 8 characters.", met: true },
      { label: "Mix letters, numbers, and symbols.", met: true },
      { label: "Avoid common words or patterns.", met: false },
    ],
  },
  {
    strength: 5,
    rules: [
      { label: "Use at least 8 characters.", met: true },
      { label: "Mix letters, numbers, and symbols.", met: true },
      { label: "Avoid common words or patterns.", met: true },
    ],
  },
]

function PasswordStrengthSection() {
  const sizes: Size[] = ["xs", "sm", "md"]

  return (
    <SectionFrame title="Password Strength Component">
      <div className="flex flex-col gap-8">
        {sizes.map((size) => (
          <SizeCard key={size} title="Password Strength" size={size}>
            <div className="grid max-w-md gap-6">
              {PASSWORD_STRENGTH_VARIANTS.map(({ strength, rules }) => (
                <PasswordStrength
                  key={strength}
                  size={size}
                  strength={strength}
                  rules={rules}
                />
              ))}
            </div>
          </SizeCard>
        ))}
      </div>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// 4. Composition — Provider + Shell
// ---------------------------------------------------------------------------

function CompositionShowcase() {
  return (
    <SectionFrame title="Composition — Provider + Shell">
      <div className="flex flex-col gap-8">
        {/* Provider-only: bring your own chrome. The outer frame paints the
            border once; the InputGroupSlot/Control inside still picks up size +
            state styling from InputGroupProvider — no nested borders. */}
        <SizeCard
          title="Provider only — custom outer chrome (Stepper-like)"
          size="sm"
        >
          <div className="border-weak bg-static shadow-neutral-xs focus-within:border-strong focus-within:outline-light flex w-fit items-stretch overflow-clip rounded-xl border focus-within:outline focus-within:outline-4">
            <button
              type="button"
              aria-label="Decrement"
              className="bg-weakest hover:bg-light text-placeholder hover:text-body text-ui-control-lg flex size-10 items-center justify-center font-medium transition-colors"
            >
              −
            </button>
            <div className="border-weak border-l" />
            <InputGroupProvider size="sm">
              <InputGroupSlot className="w-16 text-center">
                <InputGroupControl defaultValue="1" inputMode="numeric" />
              </InputGroupSlot>
            </InputGroupProvider>
            <div className="border-weak border-l" />
            <button
              type="button"
              aria-label="Increment"
              className="bg-weakest hover:bg-light text-placeholder hover:text-body text-ui-control-lg flex size-10 items-center justify-center font-medium transition-colors"
            >
              +
            </button>
          </div>
        </SizeCard>

        {/* Provider + Shell, explicit. Equivalent to <InputGroup>; useful when
            you need to wrap or branch logic between the two. */}
        <SizeCard title="Provider + Shell — explicit composition" size="sm">
          <InputGroupProvider size="sm">
            <InputGroupShell>
              <InputGroupSlot>
                <RiSearch2Line />
                <InputGroupControl placeholder="Search anything.." />
                <InputGroupKbd>K</InputGroupKbd>
              </InputGroupSlot>
              <InputGroupButton>Search</InputGroupButton>
            </InputGroupShell>
          </InputGroupProvider>
        </SizeCard>
      </div>
    </SectionFrame>
  )
}

// ---------------------------------------------------------------------------
// Currency Select (Amount variant)
// ---------------------------------------------------------------------------

const CURRENCIES = ["USD", "EUR", "GBP"] as const

function CurrencySelect({ defaultValue = "USD" }: { defaultValue?: string }) {
  const [value, setValue] = React.useState(defaultValue)
  return (
    <InputGroupSelect
      value={value}
      onChange={(key) => setValue(key as string)}
      prefix={<CurrencyFlag code={value} className="size-5" />}
      valueChildren={value}
    >
      {CURRENCIES.map((c) => (
        <SelectItem key={c} value={c}>
          <CurrencyFlag code={c} className="size-5" />
          {c}
        </SelectItem>
      ))}
    </InputGroupSelect>
  )
}

// ---------------------------------------------------------------------------
// Shared Components
// ---------------------------------------------------------------------------

function VariantCard({
  title,
  states,
  render,
}: {
  title: string
  states: { id: State; label: string }[]
  render: (state: State) => React.ReactNode
}) {
  return (
    <div className="border-weak bg-static flex flex-col gap-4 rounded-xl border p-6">
      <h3 className="text-ui-control-xl text-body font-semibold">{title}</h3>
      <div className="flex flex-col gap-6">
        {states.map((state) => (
          <div key={state.id} className="flex flex-col gap-2">
            <span className="text-ui-control-sm text-disabled font-medium">
              {state.label}
            </span>
            {render(state.id)}
          </div>
        ))}
      </div>
    </div>
  )
}

function SizeCard({
  title,
  size,
  children,
}: {
  title: string
  size: Size
  children: React.ReactNode
}) {
  return (
    <div className="border-weak bg-static flex flex-col gap-4 rounded-xl border p-6">
      <div className="flex items-center gap-3">
        <span className="text-ui-control-lg text-body font-semibold">
          {title}
        </span>
        <span className="bg-weakest text-disabled rounded px-3 py-1.5 font-semibold">
          {size}
        </span>
      </div>
      {children}
    </div>
  )
}
