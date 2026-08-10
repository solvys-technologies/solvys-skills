import { RiFlashlightFill } from "@create-ui/assets/icons"

import {
  AlertBanner,
  AlertBannerClose,
  AlertBannerContent,
  AlertBannerDescription,
  AlertBannerHeading,
  AlertBannerIcon,
} from "@/registry/pro/ui/alert-banner"

export default function AlertBannerAppearance() {
  return (
    <div className="flex w-full flex-col gap-3">
      <AlertBanner variant="primary" appearance="default">
        <AlertBannerContent>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiFlashlightFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Default appearance with a bottom border
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerClose />
      </AlertBanner>

      <AlertBanner variant="primary" appearance="solid">
        <AlertBannerContent>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiFlashlightFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Solid appearance with a filled background
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerClose />
      </AlertBanner>

      <AlertBanner variant="primary" appearance="soft">
        <AlertBannerContent>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiFlashlightFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Soft appearance with a tinted background
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerClose />
      </AlertBanner>

      <AlertBanner variant="primary" appearance="inverse">
        <AlertBannerContent>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiFlashlightFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Inverse appearance for high contrast
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerClose />
      </AlertBanner>
    </div>
  )
}
