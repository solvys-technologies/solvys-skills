import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiInformationFill,
  RiProhibited2Fill,
} from "@create-ui/assets/icons"

import {
  AlertBanner,
  AlertBannerClose,
  AlertBannerContent,
  AlertBannerDescription,
  AlertBannerHeading,
  AlertBannerIcon,
} from "@/registry/pro/ui/alert-banner"

export default function AlertBannerMinimal() {
  return (
    <div className="flex w-full flex-col gap-3">
      <AlertBanner variant="info" appearance="default">
        <AlertBannerContent>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiInformationFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Your account has been updated successfully.
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerClose />
      </AlertBanner>

      <AlertBanner variant="danger" appearance="solid">
        <AlertBannerContent>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiErrorWarningFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Something went wrong. Please try again.
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerClose />
      </AlertBanner>

      <AlertBanner variant="success" appearance="soft">
        <AlertBannerContent>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiCheckboxCircleFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Changes saved successfully.
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerClose />
      </AlertBanner>

      <AlertBanner variant="warning" appearance="inverse">
        <AlertBannerContent>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiProhibited2Fill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Your session will expire in 5 minutes.
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerClose />
      </AlertBanner>
    </div>
  )
}
