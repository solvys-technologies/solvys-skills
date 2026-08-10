import { SocialLoginButton } from "@/registry/ui/social-login-button"

export default function SocialLoginButtonShape() {
  return (
    <div className="flex flex-col items-start gap-3">
      <SocialLoginButton brand="dribbble" shape="pill" />
      <SocialLoginButton brand="dribbble" shape="rounded" />
      <SocialLoginButton brand="dribbble" shape="square" />
    </div>
  )
}
