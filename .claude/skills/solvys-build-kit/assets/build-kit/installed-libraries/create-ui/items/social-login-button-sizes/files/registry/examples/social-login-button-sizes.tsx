import { SocialLoginButton } from "@/registry/ui/social-login-button"

export default function SocialLoginButtonSizes() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <SocialLoginButton brand="google" size="lg" />
        <SocialLoginButton brand="apple" appearance="black" size="lg" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <SocialLoginButton brand="google" size="md" />
        <SocialLoginButton brand="apple" appearance="black" size="md" />
      </div>
    </div>
  )
}
