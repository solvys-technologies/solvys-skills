"use client"

import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverImage,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/pro/ui/popover"
import { Button } from "@/registry/ui/button"

export default function PopoverWithImage() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          What&apos;s new
        </Button>
      </PopoverTrigger>
      <PopoverContent size="md">
        <PopoverImage>
          <img
            src="https://createui.co/images/create-banner.png"
            alt="Insights dashboard"
          />
        </PopoverImage>
        <PopoverBody>
          <PopoverHeader>
            <PopoverTitle>Insights is here</PopoverTitle>
            <PopoverDescription>
              A banner image sits above the body and follows the content radius,
              perfect for release notes and media previews.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
