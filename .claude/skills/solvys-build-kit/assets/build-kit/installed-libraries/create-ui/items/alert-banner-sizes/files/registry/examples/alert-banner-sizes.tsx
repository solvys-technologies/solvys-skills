import { RiFlashlightFill } from "@create-ui/assets/icons"

import {
  AlertBanner,
  AlertBannerActions,
  AlertBannerClose,
  AlertBannerContent,
  AlertBannerDescription,
  AlertBannerHeading,
  AlertBannerIcon,
} from "@/registry/pro/ui/alert-banner"
import { Button } from "@/registry/ui/button"

export default function AlertBannerSizes() {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex w-full flex-col gap-3">
        <AlertBanner variant="primary" appearance="default" size="md">
          <AlertBannerContent>
            <AlertBannerHeading>
              <AlertBannerIcon>
                <RiFlashlightFill />
              </AlertBannerIcon>
              <AlertBannerDescription>
                Horizontal, medium size
              </AlertBannerDescription>
            </AlertBannerHeading>
          </AlertBannerContent>
          <AlertBannerActions>
            <Button variant="neutral-light" appearance="outline" size="md">
              Update
            </Button>
          </AlertBannerActions>
          <AlertBannerClose />
        </AlertBanner>

        <AlertBanner variant="primary" appearance="default" size="sm">
          <AlertBannerContent>
            <AlertBannerHeading>
              <AlertBannerIcon>
                <RiFlashlightFill />
              </AlertBannerIcon>
              <AlertBannerDescription>
                Horizontal, small size
              </AlertBannerDescription>
            </AlertBannerHeading>
          </AlertBannerContent>
          <AlertBannerActions>
            <Button variant="neutral-light" appearance="outline" size="sm">
              Update
            </Button>
          </AlertBannerActions>
          <AlertBannerClose />
        </AlertBanner>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <AlertBanner
          variant="primary"
          appearance="default"
          layout="vertical"
          size="md"
          className="w-[300px]"
        >
          <AlertBannerContent>
            <AlertBannerHeading>
              <AlertBannerIcon>
                <RiFlashlightFill />
              </AlertBannerIcon>
              <AlertBannerDescription>
                Vertical, medium size
              </AlertBannerDescription>
            </AlertBannerHeading>
          </AlertBannerContent>
          <AlertBannerActions>
            <Button
              variant="neutral-light"
              appearance="outline"
              size="md"
              className="flex-1"
            >
              Update
            </Button>
          </AlertBannerActions>
          <AlertBannerClose />
        </AlertBanner>

        <AlertBanner
          variant="primary"
          appearance="default"
          layout="vertical"
          size="sm"
          className="w-[300px]"
        >
          <AlertBannerContent>
            <AlertBannerHeading>
              <AlertBannerIcon>
                <RiFlashlightFill />
              </AlertBannerIcon>
              <AlertBannerDescription>
                Vertical, small size
              </AlertBannerDescription>
            </AlertBannerHeading>
          </AlertBannerContent>
          <AlertBannerActions>
            <Button
              variant="neutral-light"
              appearance="outline"
              size="sm"
              className="flex-1"
            >
              Update
            </Button>
          </AlertBannerActions>
          <AlertBannerClose />
        </AlertBanner>
      </div>
    </div>
  )
}
