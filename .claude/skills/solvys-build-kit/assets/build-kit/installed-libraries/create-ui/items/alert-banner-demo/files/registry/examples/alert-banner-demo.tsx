import { RiFlashlightFill, RiSpamFill } from "@create-ui/assets/icons"

import {
  AlertBanner,
  AlertBannerActions,
  AlertBannerClose,
  AlertBannerContent,
  AlertBannerDescription,
  AlertBannerHeading,
  AlertBannerIcon,
} from "@/registry/pro/ui/alert-banner"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

export default function AlertBannerDemo() {
  return (
    <div className="border-weak flex w-full flex-col border">
      <AlertBanner variant="away" appearance="default">
        <AlertBannerContent>
          <Badge variant="away" appearance="outline" size="md">
            Maintenance
          </Badge>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiSpamFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Create UI v1.0.23 is Available
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerActions>
          <Button variant="neutral-light" appearance="outline" size="sm">
            View Details
          </Button>
          <Button variant="neutral-light" appearance="ghost" size="sm">
            Dismiss
          </Button>
        </AlertBannerActions>
        <AlertBannerClose />
      </AlertBanner>
      <div className="bg-weakest mt-12 mr-auto ml-auto min-h-100 w-70 rounded-t-2xl lg:w-90">
        <div className="flex h-12 items-center gap-1 px-5">
          <span className="size-2 shrink-0 rounded-full bg-red-400"></span>
          <span className="size-2 shrink-0 rounded-full bg-yellow-400"></span>
          <span className="size-2 shrink-0 rounded-full bg-green-500"></span>
        </div>
        <AlertBanner variant="primary" appearance="solid" layout="vertical">
          <AlertBannerContent>
            <AlertBannerHeading>
              <AlertBannerDescription>
                Create UI v1.0.23 is Available New components, responsive
                tokens, and performance improvements are ready for you. Update
                now to get the latest changes.
              </AlertBannerDescription>
            </AlertBannerHeading>
          </AlertBannerContent>
          <AlertBannerActions>
            <Button
              variant="neutral-light"
              appearance="soft"
              size="md"
              className="flex-1"
            >
              Update Now
            </Button>
            <Button variant="inverse-solid" appearance="ghost" size="md">
              Release Notes
            </Button>
          </AlertBannerActions>
          <AlertBannerClose />
        </AlertBanner>
      </div>
    </div>
  )
}
