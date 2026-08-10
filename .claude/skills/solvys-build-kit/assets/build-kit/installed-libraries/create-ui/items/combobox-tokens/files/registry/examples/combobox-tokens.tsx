"use client"

import * as React from "react"
import {
  TokenBNB,
  TokenBTC,
  TokenETH,
  TokenSOL,
  TokenUSDC,
} from "@create-ui/assets/crypto"
import { Collection } from "react-aria-components"

import { Combobox } from "@/registry/ui/combobox"

type Token = { id: string; name: string; price: string; amount?: string }
type Group = { id: string; name: string; children: Token[] }

const GROUPS: Group[] = [
  {
    id: "assets",
    name: "Your assets",
    children: [
      { id: "btc", name: "Bitcoin", price: "65.214 USD", amount: "0.42 BTC" },
      { id: "eth", name: "Ethereum", price: "1.7565 USD", amount: "3.10 ETH" },
    ],
  },
  {
    id: "popular",
    name: "Popular",
    children: [
      { id: "usdc", name: "USD Coin", price: "0.9821 USD" },
      { id: "sol", name: "Solana", price: "146.82 USD" },
      { id: "bnb", name: "BNB", price: "606.431 USD" },
    ],
  },
]

function TokenIcon({ id }: { id: string }) {
  switch (id) {
    case "btc":
      return <TokenBTC variant="branded" />
    case "eth":
      return <TokenETH variant="branded" />
    case "usdc":
      return <TokenUSDC variant="branded" />
    case "sol":
      return <TokenSOL variant="branded" />
    case "bnb":
      return <TokenBNB variant="branded" />
    default:
      return null
  }
}

const TOKENS = GROUPS.flatMap((group) => group.children)

export default function ComboboxTokens() {
  const [value, setValue] = React.useState<string | null>("btc")
  const selected = TOKENS.find((token) => token.id === value)
  const [inputValue, setInputValue] = React.useState(selected?.name ?? "")

  const query =
    inputValue === (selected?.name ?? "") ? "" : inputValue.trim().toLowerCase()
  const groups = GROUPS.map((group) => ({
    ...group,
    children: group.children.filter((token) =>
      token.name.toLowerCase().includes(query)
    ),
  })).filter((group) => group.children.length > 0)

  return (
    <div className="w-full max-w-[400px]">
      <Combobox
        aria-label="Token"
        menuTrigger="focus"
        allowsEmptyCollection
        items={groups}
        inputValue={inputValue}
        onInputChange={(text) => {
          setInputValue(text)
          if (text === "") setValue(null)
        }}
        value={value}
        onChange={(key) => {
          const token = TOKENS.find((item) => item.id === key)
          setValue(token ? token.id : null)
          setInputValue(token ? token.name : "")
        }}
      >
        <Combobox.Input placeholder="Search token" />
        <Combobox.Popover
          renderEmptyState={() => (
            <p className="text-placeholder text-ui-control-sm px-4 py-3 text-center">
              No tokens found
            </p>
          )}
        >
          {(group: Group) => (
            <Combobox.Section id={group.id}>
              <Combobox.Label>{group.name}</Combobox.Label>
              <Collection items={group.children}>
                {(token: Token) => (
                  <Combobox.Item
                    id={token.id}
                    textValue={token.name}
                    leading={<TokenIcon id={token.id} />}
                    description={token.price}
                    trailing={
                      token.amount ? (
                        <span className="text-placeholder">{token.amount}</span>
                      ) : null
                    }
                  >
                    {token.name}
                  </Combobox.Item>
                )}
              </Collection>
            </Combobox.Section>
          )}
        </Combobox.Popover>
      </Combobox>
    </div>
  )
}
