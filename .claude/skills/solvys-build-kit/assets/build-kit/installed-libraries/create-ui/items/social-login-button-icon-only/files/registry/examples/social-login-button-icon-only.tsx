import { SocialLoginButton } from "@/registry/ui/social-login-button"

export default function SocialLoginButtonIconOnly() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <SocialLoginButton
        brand="google"
        iconOnly
        aria-label="Continue with Google"
      />
      <SocialLoginButton
        brand="apple"
        appearance="black"
        iconOnly
        aria-label="Continue with Apple"
      />
      <SocialLoginButton
        brand="github"
        appearance="white"
        iconOnly
        aria-label="Continue with Github"
      />
      <SocialLoginButton brand="x" iconOnly aria-label="Continue with X" />
      <SocialLoginButton
        brand="discord"
        shape="pill"
        iconOnly
        aria-label="Continue with Discord"
      />
    </div>
  )
}
