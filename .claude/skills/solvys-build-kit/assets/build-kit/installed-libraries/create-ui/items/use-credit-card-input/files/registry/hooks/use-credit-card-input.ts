"use client"

import * as React from "react"
import valid from "card-validator"
import { useIMask } from "react-imask"

export type CardType =
  | "visa"
  | "mastercard"
  | "american-express"
  | "diners-club"
  | "discover"
  | "jcb"
  | "maestro"
  | "unionpay"
  | "elo"

const DEFAULT_MASK = "0000  •  0000  •  0000  •  0000"
const AMEX_MASK = "0000  •  000000  •  00000"

export interface UseCreditCardInputOptions {
  defaultValue?: string
  onValueChange?: (raw: string) => void
}

export function useCreditCardInput(options: UseCreditCardInputOptions = {}) {
  const [validation, setValidation] = React.useState(() =>
    valid.number(options.defaultValue ?? "")
  )

  const { ref, value, setValue, unmaskedValue } = useIMask(
    {
      // MaskedDynamic: switch to Amex (4-6-5) when prefix matches.
      mask: [{ mask: AMEX_MASK }, { mask: DEFAULT_MASK }] as never,
      dispatch: ((
        appended: string,
        masked: { value: string; compiledMasks: unknown[] }
      ) => {
        const digits = (masked.value + appended).replace(/\D/g, "")
        return /^3[47]/.test(digits)
          ? masked.compiledMasks[0]
          : masked.compiledMasks[1]
      }) as never,
    },
    {
      defaultValue: options.defaultValue ?? "",
      onAccept: (_, m) => {
        const raw = m.unmaskedValue
        setValidation(valid.number(raw))
        options.onValueChange?.(raw)
      },
    }
  )

  const cardType = (validation.card?.type ?? null) as CardType | null

  return {
    ref: ref as React.RefObject<HTMLInputElement | null>,
    value,
    setValue,
    unmaskedValue,
    cardType,
    isValid: validation.isValid,
    isPotentiallyValid: validation.isPotentiallyValid,
    inputMode: "numeric" as const,
    placeholder: DEFAULT_MASK,
    type: "text" as const,
  }
}
