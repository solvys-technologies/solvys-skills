import { SocialLoginButton } from "@/registry/ui/social-login-button"

export default function SocialLoginButtonAppearance() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <SocialLoginButton brand="google" appearance="colorful" />
      <SocialLoginButton brand="google" appearance="black" />
      <SocialLoginButton brand="google" appearance="white" />
    </div>
  )
}
