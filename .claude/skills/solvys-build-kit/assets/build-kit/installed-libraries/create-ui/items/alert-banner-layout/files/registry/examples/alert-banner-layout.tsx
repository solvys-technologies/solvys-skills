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
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

export default function AlertBannerLayout() {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <AlertBanner variant="primary" appearance="default" layout="horizontal">
        <AlertBannerContent>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiFlashlightFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Spans the full width
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

      <AlertBanner
        variant="primary"
        appearance="default"
        layout="vertical"
        className="w-[390px]"
      >
        <AlertBannerContent>
          <Badge variant="primary" appearance="outline" size="md">
            Workspace
          </Badge>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiFlashlightFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Something needs your attention
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
          <Button
            variant="neutral-light"
            appearance="ghost"
            size="sm"
            className="flex-1"
          >
            Action
          </Button>
        </AlertBannerActions>
        <AlertBannerClose />
      </AlertBanner>
    </div>
  )
}
