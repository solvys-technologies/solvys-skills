"use client"

import * as React from "react"
import {
  TokenBNB,
  TokenBTC,
  TokenETH,
  TokenUSDC,
  TokenXRP,
} from "@create-ui/assets/crypto"
import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
} from "@create-ui/assets/icons"

import { Badge } from "@/registry/ui/badge"
import { Field, FieldLabel } from "@/registry/ui/field"
import { Select } from "@/registry/ui/select"
import { TextLink } from "@/registry/ui/text-link"

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
    price: "0.9821 USD",
    icon: <TokenUSDC variant="branded" />,
  },
  {
    id: "xrp",
    name: "XRP",
    symbol: "XRP",
    price: "1.1932 USD",
    icon: <TokenXRP variant="background" className="rounded-full" />,
  },
  {
    id: "bnb",
    name: "BNB",
    symbol: "BNB",
    price: "606.431 USD",
    icon: <TokenBNB variant="branded" />,
  },
]

const ALL_TOKENS = [...TOKEN_ASSETS, ...TOKEN_POPULAR]

function TokenItem({ token }: { token: TokenRow }) {
  return (
    <Select.Item
      value={token.id}
      textValue={`${token.name} ${token.symbol}`}
      leading={token.icon}
      description={token.price}
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

export default function SelectTokenPicker() {
  const [value, setValue] = React.useState<string | null>("btc")
  const selected = ALL_TOKENS.find((token) => token.id === value)

  return (
    <Field className="w-xs">
      <FieldLabel>Select Token</FieldLabel>
      <Select
        value={value}
        onChange={(key) => setValue(key ? String(key) : null)}
      >
        <Select.Trigger aria-label="Select token">
          {selected?.icon}
          <Select.Value placeholder="Select token">
            {selected ? selected.symbol : null}
          </Select.Value>
          {selected ? (
            <Badge variant="info" appearance="soft" size="sm">
              ${selected.symbol}
            </Badge>
          ) : null}
        </Select.Trigger>
        <Select.Popover
          className="w-xs"
          header={<Select.Search placeholder="Search token" />}
          renderEmptyState={() => (
            <p className="text-placeholder text-ui-control-sm px-4 py-3 text-center">
              No tokens found
            </p>
          )}
          footer={
            <div className="px-component-lg flex flex-1 items-center gap-1.5">
              <RiErrorWarningFill className="text-error-base size-5 shrink-0" />
              <span className="text-body text-ui-control-md flex-1">
                Couldn&apos;t load prices
              </span>
              <TextLink variant="danger" size="sm" underline>
                Retry
              </TextLink>
            </div>
          }
        >
          <Select.Group>
            <Select.Label>Your assets</Select.Label>
            {TOKEN_ASSETS.map((token) => (
              <TokenItem key={token.id} token={token} />
            ))}
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Popular</Select.Label>
            {TOKEN_POPULAR.map((token) => (
              <TokenItem key={token.id} token={token} />
            ))}
          </Select.Group>
        </Select.Popover>
      </Select>
    </Field>
  )
}
