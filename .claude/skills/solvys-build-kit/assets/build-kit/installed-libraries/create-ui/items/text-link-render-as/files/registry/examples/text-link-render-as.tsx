"use client"

import Link from "next/link"
import { RiArrowRightSLine } from "@create-ui/assets/icons"

import { TextLink } from "@/registry/ui/text-link"

export default function TextLinkRenderAs() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <TextLink
        href="https://createui.co"
        target="_blank"
        rel="noreferrer"
        trailing={<RiArrowRightSLine />}
        underline
      >
        Anchor (href)
      </TextLink>
      <TextLink asChild trailing={<RiArrowRightSLine />} underline>
        <button type="button" onClick={() => alert("clicked")}>
          Button (as)
        </button>
      </TextLink>
      <TextLink asChild trailing={<RiArrowRightSLine />} underline>
        <Link href="/">Next Link (asChild)</Link>
      </TextLink>
    </div>
  )
}
