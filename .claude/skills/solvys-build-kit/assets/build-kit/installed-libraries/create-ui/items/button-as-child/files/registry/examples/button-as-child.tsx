"use client"

import { RiArrowRightLine } from "@create-ui/assets/icons"

import { Button, ButtonLabel } from "@/registry/ui/button"

export default function ButtonAsChild() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button asChild>
        <a href="https://createui.co/docs" target="_blank" rel="noreferrer">
          <ButtonLabel>Read the docs</ButtonLabel>
          <RiArrowRightLine />
        </a>
      </Button>
      <Button asChild appearance="outline">
        <a href="https://createui.co" target="_blank" rel="noreferrer">
          Visit site
        </a>
      </Button>
    </div>
  )
}
