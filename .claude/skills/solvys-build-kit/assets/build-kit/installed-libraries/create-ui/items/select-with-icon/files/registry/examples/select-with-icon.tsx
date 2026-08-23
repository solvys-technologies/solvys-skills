"use client"

import * as React from "react"
import {
  TokenBTC,
  TokenDOGE,
  TokenETH,
  TokenSOL,
} from "@create-ui/assets/crypto"
import { RiWalletLine } from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"
import { Select } from "@/registry/ui/select"

const TOKENS = [
  {
    value: "btc",
    label: "Bitcoin",
    tag: "$BTC",
    icon: <TokenBTC className="size-5 shrink-0" />,
  },
  {
    value: "eth",
    label: "Ethereum",
    tag: "$ETH",
    icon: <TokenETH className="size-5 shrink-0" />,
  },
  {
    value: "sol",
    label: "Solana",
    tag: "$SOL",
    icon: <TokenSOL className="size-5 shrink-0" />,
  },
  {
    value: "doge",
    label: "Dogecoin",
    tag: "$DOGE",
    icon: <TokenDOGE className="size-5 shrink-0" />,
  },
]

export default function SelectWithIcon() {
  const [value, setValue] = React.useState<string | null>("btc")
  const selected = TOKENS.find((t) => t.value === value)

  return (
    <div className="w-full max-w-[350px]">
      <Select
        value={value}
        onChange={(key) => setValue(key ? String(key) : null)}
      >
        <Select.Trigger>
          {selected?.icon ?? <RiWalletLine />}
          <Select.Value placeholder="Select token">
            {selected?.label}
          </Select.Value>
          {selected?.tag && (
            <Badge variant="info" appearance="soft" size="sm">
              {selected.tag}
            </Badge>
          )}
        </Select.Trigger>
        <Select.Popover>
          <Select.Group>
            {TOKENS.map((token) => (
              <Select.Item key={token.value} value={token.value}>
                {token.icon}
                {token.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Popover>
      </Select>
    </div>
  )
}
