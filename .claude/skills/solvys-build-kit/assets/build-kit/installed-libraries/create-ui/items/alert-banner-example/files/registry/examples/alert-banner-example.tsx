import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiFlashlightFill,
  RiInformationFill,
  RiProhibited2Fill,
  RiSpam2Fill,
} from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
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

export default function AlertBannerExample() {
  return (
    <div className="flex flex-col gap-16 p-4 sm:p-6 lg:p-12">
      <PrimaryDefaultDemo />
      <ErrorDefaultDemo />
      <SuccessDefaultDemo />
      <InfoDefaultDemo />
      <WarningDefaultDemo />
      <AwayDefaultDemo />
      <NeutralDefaultDemo />
      <SolidDemo />
      <SoftDemo />
      <InverseDemo />
      <VerticalLayoutDemo />
      <VerticalLayoutSmallDemo />
      <SmallSizeDemo />
      <MinimalDemo />
    </div>
  )
}

function PrimaryDefaultDemo() {
  return (
    <SectionFrame title="Primary · Default">
      <AlertBanner variant="primary" appearance="default">
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
          <Button variant="neutral-light" appearance="outline" size="md">
            Update
          </Button>
          <Button variant="neutral-light" appearance="ghost" size="md">
            Action
          </Button>
        </AlertBannerActions>
        <AlertBannerClose />
      </AlertBanner>
    </SectionFrame>
  )
}

function ErrorDefaultDemo() {
  return (
    <SectionFrame title="Error · Default">
      <AlertBanner variant="danger" appearance="default">
        <AlertBannerContent>
          <Badge variant="danger" appearance="outline" size="md">
            Workspace
          </Badge>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiErrorWarningFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Something went wrong
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerActions>
          <Button variant="neutral-light" appearance="outline" size="md">
            Retry
          </Button>
          <Button variant="neutral-light" appearance="ghost" size="md">
            Dismiss
          </Button>
        </AlertBannerActions>
        <AlertBannerClose />
      </AlertBanner>
    </SectionFrame>
  )
}

function SuccessDefaultDemo() {
  return (
    <SectionFrame title="Success · Default">
      <AlertBanner variant="success" appearance="default">
        <AlertBannerContent>
          <Badge variant="success" appearance="outline" size="md">
            Workspace
          </Badge>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiCheckboxCircleFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Your changes were saved
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerActions>
          <Button variant="neutral-light" appearance="outline" size="md">
            View
          </Button>
          <Button variant="neutral-light" appearance="ghost" size="md">
            Dismiss
          </Button>
        </AlertBannerActions>
        <AlertBannerClose />
      </AlertBanner>
    </SectionFrame>
  )
}

function InfoDefaultDemo() {
  return (
    <SectionFrame title="Info · Default">
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
          <Button variant="neutral-light" appearance="outline" size="md">
            Learn more
          </Button>
          <Button variant="neutral-light" appearance="ghost" size="md">
            Skip
          </Button>
        </AlertBannerActions>
        <AlertBannerClose />
      </AlertBanner>
    </SectionFrame>
  )
}

function WarningDefaultDemo() {
  return (
    <SectionFrame title="Warning · Default">
      <AlertBanner variant="warning" appearance="default">
        <AlertBannerContent>
          <Badge variant="warning" appearance="outline" size="md">
            Workspace
          </Badge>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiProhibited2Fill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Subscription expires in 3 days
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerActions>
          <Button variant="neutral-light" appearance="outline" size="md">
            Renew
          </Button>
          <Button variant="neutral-light" appearance="ghost" size="md">
            Later
          </Button>
        </AlertBannerActions>
        <AlertBannerClose />
      </AlertBanner>
    </SectionFrame>
  )
}

function AwayDefaultDemo() {
  return (
    <SectionFrame title="Away · Default">
      <AlertBanner variant="away" appearance="default">
        <AlertBannerContent>
          <Badge variant="away" appearance="outline" size="md">
            Workspace
          </Badge>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiSpam2Fill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              You have been inactive for a while
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerActions>
          <Button variant="neutral-light" appearance="outline" size="md">
            Stay
          </Button>
          <Button variant="neutral-light" appearance="ghost" size="md">
            Sign out
          </Button>
        </AlertBannerActions>
        <AlertBannerClose />
      </AlertBanner>
    </SectionFrame>
  )
}

function NeutralDefaultDemo() {
  return (
    <SectionFrame title="Neutral · Default">
      <AlertBanner variant="neutral" appearance="default">
        <AlertBannerContent>
          <Badge variant="neutral" appearance="outline" size="md">
            Workspace
          </Badge>
          <AlertBannerHeading>
            <AlertBannerIcon>
              <RiFlashlightFill />
            </AlertBannerIcon>
            <AlertBannerDescription>
              Announcement for your team
            </AlertBannerDescription>
          </AlertBannerHeading>
        </AlertBannerContent>
        <AlertBannerActions>
          <Button variant="neutral-light" appearance="outline" size="md">
            Read
          </Button>
          <Button variant="neutral-light" appearance="ghost" size="md">
            Dismiss
          </Button>
        </AlertBannerActions>
        <AlertBannerClose />
      </AlertBanner>
    </SectionFrame>
  )
}

function SolidDemo() {
  return (
    <SectionFrame title="Primary · Solid">
      <AlertBanner variant="primary" appearance="solid">
        <AlertBannerContent>
          <Badge variant="inverse" appearance="outline" size="md">
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
          <Button variant="neutral-light" appearance="soft" size="md">
            Update
          </Button>
          <Button variant="inverse-solid" appearance="ghost" size="md">
            Action
          </Button>
        </AlertBannerActions>
        <AlertBannerClose />
      </AlertBanner>
    </SectionFrame>
  )
}

function SoftDemo() {
  return (
    <SectionFrame title="Primary · Soft">
      <AlertBanner variant="primary" appearance="soft">
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
          <Button variant="neutral-light" appearance="outline" size="md">
            Update
          </Button>
          <Button variant="neutral-light" appearance="ghost" size="md">
            Action
          </Button>
        </AlertBannerActions>
        <AlertBannerClose />
      </AlertBanner>
    </SectionFrame>
  )
}

function InverseDemo() {
  return (
    <SectionFrame title="Primary · Inverse">
      <AlertBanner variant="primary" appearance="inverse">
        <AlertBannerContent>
          <Badge variant="primary" appearance="solid" size="md">
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
          <Button variant="neutral-light" appearance="soft" size="md">
            Update
          </Button>
          <Button variant="inverse-solid" appearance="ghost" size="md">
            Action
          </Button>
        </AlertBannerActions>
        <AlertBannerClose />
      </AlertBanner>
    </SectionFrame>
  )
}

function VerticalLayoutDemo() {
  return (
    <SectionFrame title="Vertical layout">
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
            size="md"
            className="flex-1"
          >
            Update
          </Button>
          <Button
            variant="neutral-light"
            appearance="ghost"
            size="md"
            className="flex-1"
          >
            Action
          </Button>
        </AlertBannerActions>
        <AlertBannerClose />
      </AlertBanner>
    </SectionFrame>
  )
}

function VerticalLayoutSmallDemo() {
  return (
    <SectionFrame title="Vertical layout — small size">
      <AlertBanner
        variant="primary"
        appearance="default"
        layout="vertical"
        size="sm"
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
    </SectionFrame>
  )
}

function SmallSizeDemo() {
  return (
    <SectionFrame title="Small size">
      <AlertBanner variant="primary" appearance="default" size="sm">
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
          <Button variant="neutral-light" appearance="outline" size="sm">
            Update
          </Button>
          <Button variant="neutral-light" appearance="ghost" size="sm">
            Action
          </Button>
        </AlertBannerActions>
        <AlertBannerClose />
      </AlertBanner>
    </SectionFrame>
  )
}

function MinimalDemo() {
  return (
    <SectionFrame title="Minimal — no badge, no actions">
      <div className="flex flex-col gap-3">
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
    </SectionFrame>
  )
}
