"use client"

import * as React from "react"
import { RiQuestionLine } from "@create-ui/assets/icons"

import {
  PHONE_COUNTRIES,
  usePhoneInput,
  type PhoneCountryCode,
  type PhoneCountryConfig,
} from "@/registry/hooks/use-phone-input"
import { CountryFlag } from "@/registry/ui/country-flag"
import {
  InputGroup,
  InputGroupAffix,
  InputGroupControl,
  InputGroupHelperIcon,
  InputGroupSelect,
  InputGroupSlot,
} from "@/registry/ui/input-group"
import { SelectItem } from "@/registry/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

type InputSize = "xs" | "sm" | "md"

const SORTED_COUNTRIES = Object.values(PHONE_COUNTRIES).sort((a, b) =>
  a.name.localeCompare(b.name, "en")
)

function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<T | null>).current = node
    }
  }
}

export interface PhoneInputDetails {
  country: PhoneCountryCode
  dialCode: string
  nationalNumber: string
  isPossible: boolean
  isValid: boolean
}

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "size" | "type" | "value" | "defaultValue" | "onChange"
> & {
  defaultValue?: string
  defaultCountry?: PhoneCountryCode
  country?: PhoneCountryCode
  onCountryChange?: (country: PhoneCountryCode) => void
  onValueChange?: (value: string, details: PhoneInputDetails) => void
  countries?: PhoneCountryConfig[]
  countryLabel?: string
  size?: InputSize
  invalid?: boolean
  disabled?: boolean
  loading?: boolean
  showHelperIcon?: boolean
  helperIcon?: React.ReactNode
  helperTooltip?: React.ReactNode
  className?: string
  ref?: React.Ref<HTMLInputElement>
}

function PhoneInput({
  ref,
  defaultValue,
  defaultCountry = "DE",
  country,
  onCountryChange,
  onValueChange,
  countries = SORTED_COUNTRIES,
  countryLabel = "Country",
  size,
  invalid,
  disabled,
  loading,
  showHelperIcon = true,
  helperIcon = <RiQuestionLine />,
  helperTooltip = "Enter your phone number without the country code.",
  placeholder,
  className,
  ...inputProps
}: PhoneInputProps) {
  const phone = usePhoneInput({
    defaultValue,
    defaultCountry,
    country,
    onCountryChange,
    onValueChange: ({ value, ...details }) => onValueChange?.(value, details),
  })

  return (
    <InputGroup
      size={size}
      invalid={invalid}
      disabled={disabled}
      loading={loading}
      className={className}
    >
      <InputGroupSelect
        aria-label={countryLabel}
        value={phone.country}
        onChange={(key) => phone.setCountry(key as PhoneCountryCode)}
        valueChildren={<CountryFlag code={phone.country} />}
      >
        {countries.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            <CountryFlag code={c.code} className="size-5" />
            {c.name} ({c.dialCode})
          </SelectItem>
        ))}
      </InputGroupSelect>
      <InputGroupSlot>
        <InputGroupAffix data-slot="phone-dial-code">
          {phone.config.dialCode}
        </InputGroupAffix>
        <InputGroupControl
          ref={mergeRefs(phone.input.ref, ref)}
          inputMode={phone.input.inputMode}
          type={phone.input.type}
          value={phone.input.value}
          onChange={phone.input.onChange}
          placeholder={placeholder}
          autoComplete="tel-national"
          {...inputProps}
        />
        {showHelperIcon && helperIcon ? (
          helperTooltip != null ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupHelperIcon>{helperIcon}</InputGroupHelperIcon>
              </TooltipTrigger>
              <TooltipContent variant="neutral" side="top" showArrow>
                {helperTooltip}
              </TooltipContent>
            </Tooltip>
          ) : (
            <InputGroupHelperIcon>{helperIcon}</InputGroupHelperIcon>
          )
        ) : null}
      </InputGroupSlot>
    </InputGroup>
  )
}

export { PhoneInput }
export type { PhoneInputProps }
