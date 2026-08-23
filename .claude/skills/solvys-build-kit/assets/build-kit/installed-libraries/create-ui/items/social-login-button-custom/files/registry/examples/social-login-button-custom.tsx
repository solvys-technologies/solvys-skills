import { CreateUiWhite } from "@create-ui/assets/social"

import { SocialLoginButton } from "@/registry/ui/social-login-button"

export default function SocialLoginButtonCustom() {
  return (
    <div className="flex w-140 items-center justify-center gap-3">
      <SocialLoginButton
        brand="custom"
        config={{ icon: CreateUiWhite, label: "Create UI", color: "#000000" }}
      />
      <SocialLoginButton
        brand="custom"
        config={{ icon: CreateUiWhite, color: "#000000" }}
        iconOnly
        aria-label="Continue with Create UI"
      />
    </div>
  )
}
