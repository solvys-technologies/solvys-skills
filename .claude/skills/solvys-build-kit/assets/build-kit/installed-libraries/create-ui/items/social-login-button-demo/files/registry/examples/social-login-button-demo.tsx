import { SocialLoginButton } from "@/registry/ui/social-login-button"

export default function SocialLoginButtonDemo() {
  return (
    <div className="flex w-full items-center justify-center gap-24">
      <div className="flex flex-col items-center justify-center gap-3">
        <SocialLoginButton brand="google" appearance="white" />
        <SocialLoginButton brand="discord" appearance="white" />
        <SocialLoginButton brand="slack" appearance="white" />
        <SocialLoginButton brand="gitlab" appearance="white" />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <SocialLoginButton
            brand="google"
            appearance="white"
            iconOnly
            aria-label="Continue with Google"
          />
          <SocialLoginButton
            brand="discord"
            appearance="white"
            iconOnly
            aria-label="Continue with Apple"
          />
          <SocialLoginButton
            brand="slack"
            appearance="white"
            iconOnly
            aria-label="Continue with Github"
          />
          <SocialLoginButton
            brand="gitlab"
            appearance="white"
            iconOnly
            aria-label="Continue with Dribbble"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <SocialLoginButton brand="google" shape="pill" appearance="colorful" />
        <SocialLoginButton brand="discord" shape="pill" appearance="colorful" />
        <SocialLoginButton brand="slack" shape="pill" appearance="colorful" />
        <SocialLoginButton brand="gitlab" shape="pill" appearance="colorful" />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <SocialLoginButton
            brand="google"
            shape="pill"
            appearance="colorful"
            iconOnly
            aria-label="Continue with X"
          />
          <SocialLoginButton
            brand="discord"
            shape="pill"
            appearance="colorful"
            iconOnly
            aria-label="Continue with X"
          />
          <SocialLoginButton
            brand="slack"
            shape="pill"
            appearance="colorful"
            iconOnly
            aria-label="Continue with X"
          />
          <SocialLoginButton
            brand="gitlab"
            shape="pill"
            appearance="colorful"
            iconOnly
            aria-label="Continue with X"
          />
        </div>
      </div>
    </div>
  )
}
