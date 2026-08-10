import { RiInformationFill } from "@create-ui/assets/icons"

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

export default function AlertBannerWithActions() {
  return (
    <AlertBanner variant="info" appearance="default">
      <AlertBannerContent>
        <Badge variant="info" appearance="outline" size="md">
          Workspace
        </Badge>
        <AlertBannerHeading>
          <AlertBannerIcon>
            <RiInformationFill />
          </AlertBannerIcon>
          <AlertBannerDescription>
            A new feature is available
          </AlertBannerDescription>
        </AlertBannerHeading>
      </AlertBannerContent>
      <AlertBannerActions>
        <Button variant="neutral-light" appearance="outline" size="sm">
          Learn more
        </Button>
        <Button variant="neutral-light" appearance="ghost" size="sm">
          Skip
        </Button>
      </AlertBannerActions>
      <AlertBannerClose />
    </AlertBanner>
  )
}
