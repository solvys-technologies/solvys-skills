"use client"

import * as React from "react"
import {
  TokenBNB,
  TokenBTC,
  TokenETH,
  TokenSOL,
  TokenUSDC,
} from "@create-ui/assets/crypto"
import { RiErrorWarningFill } from "@create-ui/assets/icons"
import { Collection } from "react-aria-components"

import { Button } from "@/registry/ui/button"
import { Dropdown } from "@/registry/ui/dropdown-menu"
import { TextLink } from "@/registry/ui/text-link"

type Token = {
  id: string
  name: string
  price: string
  amount?: string
  icon: React.ReactNode
}

const ASSETS: Token[] = [
  {
    id: "btc",
    name: "Bitcoin",
    price: "65.214 USD",
    amount: "0.42 BTC",
    icon: <TokenBTC variant="branded" />,
  },
  {
    id: "eth",
    name: "Ethereum",
    price: "1.7565 USD",
    amount: "3.10 ETH",
    icon: <TokenETH variant="branded" />,
  },
]

const POPULAR: Token[] = [
  {
    id: "usdc",
    name: "USD Coin",
    price: "0,9821 USD",
    icon: <TokenUSDC variant="branded" />,
  },
  {
    id: "sol",
    name: "Solana",
    price: "146,82 USD",
    icon: <TokenSOL variant="branded" />,
  },
  {
    id: "bnb",
    name: "BNB",
    price: "606,431 USD",
    icon: <TokenBNB variant="branded" />,
  },
]

const GROUPS = [
  { name: "Your assets", items: ASSETS },
  { name: "Popular", items: POPULAR },
]

export default function DropdownMenuTokens() {
  return (
    <Dropdown>
      <Button variant="neutral-solid" appearance="outline" size="sm">
        Tokens
      </Button>
      <Dropdown.Popover
        className="w-80 md:w-100"
        header={<Dropdown.Search placeholder="Search token" />}
      >
        <Dropdown.Menu
          aria-label="Tokens"
          autoFocus={false}
          items={GROUPS}
          renderEmptyState={() => (
            <p className="text-placeholder text-ui-control-sm px-4 py-3 text-center">
              No tokens found
            </p>
          )}
        >
          {(group) => (
            <Dropdown.Section id={group.name}>
              <Dropdown.Header>{group.name}</Dropdown.Header>
              <Collection items={group.items}>
                {(token) => (
                  <Dropdown.Item
                    id={token.id}
                    textValue={token.name}
                    leading={token.icon}
                    description={token.price}
                    trailing={
                      token.amount ? (
                        <span className="text-placeholder">{token.amount}</span>
                      ) : null
                    }
                  >
                    {token.name}
                  </Dropdown.Item>
                )}
              </Collection>
            </Dropdown.Section>
          )}
        </Dropdown.Menu>

        <Dropdown.Footer>
          <div className="px-component-sm flex flex-1 items-center gap-1.5">
            <RiErrorWarningFill className="text-error-base size-4 shrink-0" />
            <span className="text-ui-control-md text-body flex-1">
              Couldn&apos;t load prices
            </span>
            <TextLink variant="danger" size="sm" underline>
              Retry
            </TextLink>
          </div>
        </Dropdown.Footer>
      </Dropdown.Popover>
    </Dropdown>
  )
}
