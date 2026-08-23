import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiFlashlightFill,
  RiInformationFill,
  RiProhibited2Fill,
  RiSpam2Fill,
} from "@create-ui/assets/icons"

import {
  AlertBanner,
  AlertBannerClose,
  AlertBannerContent,
  AlertBannerDescription,
  AlertBannerHeading,
  AlertBannerIcon,
} from "@/registry/pro/ui/alert-banner"

export default function AlertBannerVariants() {
  return (
    <div className="flex w-full flex-col gap-3">
      <AlertBanner variant="primary" appearance="default">
        <AlertBannerContent>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiFlashlightFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Something needs your attention
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerClose />
      </AlertBanner>

      <AlertBanner variant="danger" appearance="default">
        <AlertBannerContent>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiErrorWarningFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Something went wrong
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerClose />
      </AlertBanner>

      <AlertBanner variant="success" appearance="default">
        <AlertBannerContent>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiCheckboxCircleFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Your changes were saved
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerClose />
      </AlertBanner>

      <AlertBanner variant="info" appearance="default">
        <AlertBannerContent>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiInformationFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              A new feature is available
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerClose />
      </AlertBanner>

      <AlertBanner variant="warning" appearance="default">
        <AlertBannerContent>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiProhibited2Fill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Subscription expires in 3 days
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerClose />
      </AlertBanner>

      <AlertBanner variant="away" appearance="default">
        <AlertBannerContent>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiSpam2Fill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              You have been inactive for a while
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerClose />
      </AlertBanner>

      <AlertBanner variant="neutral" appearance="default">
        <AlertBannerContent>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiFlashlightFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Announcement for your team
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerClose />
      </AlertBanner>
    </div>
  )
}
