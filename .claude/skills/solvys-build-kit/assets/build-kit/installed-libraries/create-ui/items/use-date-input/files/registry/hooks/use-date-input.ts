"use client"

import type * as React from "react"
import { IMask, useIMask } from "react-imask"

export type DateOrder = "DMY" | "MDY" | "YMD"

export interface UseDateInputOptions {
  defaultValue?: string
  order?: DateOrder
  onValueChange?: (iso: string) => void
}

const pad = (n: number) => String(n).padStart(2, "0")

const SEP = " / "

const ORDER_CONFIG: Record<
  DateOrder,
  {
    pattern: string
    placeholder: string
    format: (date: Date) => string
    parse: (str: string) => Date
  }
> = {
  DMY: {
    pattern: `d${SEP}m${SEP}Y`,
    placeholder: "DD / MM / YYYY",
    format: (d) =>
      `${pad(d.getDate())}${SEP}${pad(d.getMonth() + 1)}${SEP}${d.getFullYear()}`,
    parse: (s) => {
      const [d, m, y] = s.split(SEP).map(Number)
      return new Date(y, m - 1, d)
    },
  },
  MDY: {
    pattern: `m${SEP}d${SEP}Y`,
    placeholder: "MM / DD / YYYY",
    format: (d) =>
      `${pad(d.getMonth() + 1)}${SEP}${pad(d.getDate())}${SEP}${d.getFullYear()}`,
    parse: (s) => {
      const [m, d, y] = s.split(SEP).map(Number)
      return new Date(y, m - 1, d)
    },
  },
  YMD: {
    pattern: `Y${SEP}m${SEP}d`,
    placeholder: "YYYY / MM / DD",
    format: (d) =>
      `${d.getFullYear()}${SEP}${pad(d.getMonth() + 1)}${SEP}${pad(d.getDate())}`,
    parse: (s) => {
      const [y, m, d] = s.split(SEP).map(Number)
      return new Date(y, m - 1, d)
    },
  },
}

export function useDateInput(options: UseDateInputOptions = {}) {
  const { defaultValue, order = "DMY", onValueChange } = options
  const cfg = ORDER_CONFIG[order]

  const { ref, value, setValue, typedValue } = useIMask(
    {
      mask: Date,
      pattern: cfg.pattern,
      format: cfg.format,
      parse: cfg.parse,
      blocks: {
        d: { mask: IMask.MaskedRange, from: 1, to: 31, autofix: "pad" },
        m: { mask: IMask.MaskedRange, from: 1, to: 12, autofix: "pad" },
        Y: { mask: IMask.MaskedRange, from: 1900, to: 2100 },
      },
    } as Parameters<typeof useIMask>[0],
    {
      defaultValue: defaultValue ?? "",
      onAccept: (_, m) =>
        onValueChange?.((m.typedValue as Date | null)?.toISOString() ?? ""),
    }
  )

  return {
    ref: ref as React.RefObject<HTMLInputElement | null>,
    value,
    setValue,
    typedValue,
    inputMode: "numeric" as const,
    placeholder: cfg.placeholder,
  }
}
