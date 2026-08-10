import * as React from "react"

import { getCountryFlag } from "@/registry/lib/country-flags"
import { getCurrencyFlag } from "@/registry/lib/currency-flags"
import { cn } from "@/registry/lib/utils"

type FlagBaseProps = Omit<React.SVGProps<SVGSVGElement>, "children"> & {
  code: string
  fallback?: React.ReactNode
}

function FlagFallback() {
  return (
    <span
      data-slot="flag-fallback"
      aria-hidden="true"
      className="text-placeholder block size-6 shrink-0 rounded-full border border-dashed border-current"
    />
  )
}

function renderFlag(
  Flag: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  slot: string,
  className: string | undefined,
  props: Omit<React.SVGProps<SVGSVGElement>, "className" | "children">
) {
  return React.createElement(Flag, {
    "data-slot": slot,
    "aria-hidden": "true",
    className: cn("size-6 shrink-0", className),
    ...props,
  } as React.SVGProps<SVGSVGElement>)
}

function CountryFlag({ code, className, fallback, ...props }: FlagBaseProps) {
  const Flag = getCountryFlag(code)
  if (!Flag) {
    return fallback !== undefined ? <>{fallback}</> : <FlagFallback />
  }
  return renderFlag(Flag, "country-flag", className, props)
}

function CurrencyFlag({ code, className, fallback, ...props }: FlagBaseProps) {
  const Flag = getCurrencyFlag(code)
  if (!Flag) {
    return fallback !== undefined ? <>{fallback}</> : <FlagFallback />
  }
  return renderFlag(Flag, "currency-flag", className, props)
}

export { CountryFlag, CurrencyFlag, FlagFallback }
