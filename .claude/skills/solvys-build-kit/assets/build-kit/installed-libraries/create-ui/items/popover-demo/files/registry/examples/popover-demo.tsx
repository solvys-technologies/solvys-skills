"use client"

import { RiSparklingFill } from "@create-ui/assets/icons"

import {
  Popover,
  PopoverActions,
  PopoverActionText,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverImage,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/pro/ui/popover"
import { Button } from "@/registry/ui/button"

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="neutral-light" appearance="soft" size="sm">
          What&apos;s new
        </Button>
      </PopoverTrigger>
      <PopoverContent size="md" showClose>
        <PopoverImage>
          <img
            src="https://createui.co/images/create-banner.png"
            alt="Insights dashboard"
          />
        </PopoverImage>
        <PopoverBody>
          <PopoverHeader>
            <PopoverTitle>
              <RiSparklingFill />
              New in Insights
            </PopoverTitle>
            <PopoverDescription>
              Your metrics, activity, and reports now live in one dashboard, no
              setup required.
            </PopoverDescription>
          </PopoverHeader>
          <PopoverFooter>
            <PopoverActionText>1 of 3</PopoverActionText>
            <PopoverActions>
              <Button variant="neutral-light" appearance="ghost" size="xs">
                Skip
              </Button>
              <PopoverClose asChild>
                <Button variant="neutral-solid" size="xs">
                  Next
                </Button>
              </PopoverClose>
            </PopoverActions>
          </PopoverFooter>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
