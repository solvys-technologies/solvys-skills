"use client"

import { SocialLoginButton } from "@/registry/ui/social-login-button"

export default function SocialLoginButtonAsChild() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <SocialLoginButton asChild brand="google">
        <a href="#" aria-label="Continue with Google" />
      </SocialLoginButton>
      <SocialLoginButton asChild brand="apple" appearance="black">
        <a href="#" aria-label="Continue with Apple" />
      </SocialLoginButton>
      <SocialLoginButton asChild brand="github" appearance="white">
        <a href="#" aria-label="Continue with Github" />
      </SocialLoginButton>
    </div>
  )
}
