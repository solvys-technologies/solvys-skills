"use client"

import { Example, ExampleWrapper } from "@/registry/components/example"
import { SocialLoginButton } from "@/registry/ui/social-login-button"

const allBrands = [
  "apple",
  "behance",
  "discord",
  "dribbble",
  "facebook",
  "github",
  "gitlab",
  "google",
  "linkedin",
  "microsoft",
  "slack",
  "x",
] as const

function AcmeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  )
}

export default function SocialLoginButtonExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      {/* Rounded */}
      <RoundedColorful />
      <RoundedWhite />
      <RoundedBlack />

      {/* Pill */}
      <PillColorful />
      <PillWhite />
      <PillBlack />

      {/* Square */}
      <SquareColorful />
      <SquareWhite />
      <SquareBlack />

      {/* Size: md */}
      <MdColorful />
      <MdWhite />
      <MdBlack />

      {/* Icon Only */}
      <IconOnlyColorful />
      <IconOnlyWhite />
      <IconOnlyBlack />

      {/* Custom */}
      <CustomBrand />
      <SSOExample />

      {/* asChild */}
      <AsChildColorful />
      <AsChildWhite />
      <AsChildBlack />
      <AsChildIconOnly />
    </ExampleWrapper>
  )
}

/* ── Rounded ────────────────────────────────────────────────── */

function RoundedColorful() {
  return (
    <Example title="Rounded / Colorful">
      <div className="flex flex-wrap gap-2">
        {allBrands.map((brand) => (
          <SocialLoginButton key={brand} brand={brand} />
        ))}
      </div>
    </Example>
  )
}

function RoundedWhite() {
  return (
    <Example title="Rounded / White">
      <div className="flex flex-wrap gap-2">
        {allBrands.map((brand) => (
          <SocialLoginButton key={brand} brand={brand} appearance="white" />
        ))}
      </div>
    </Example>
  )
}

function RoundedBlack() {
  return (
    <Example title="Rounded / Black">
      <div className="flex flex-wrap gap-2">
        {allBrands.map((brand) => (
          <SocialLoginButton key={brand} brand={brand} appearance="black" />
        ))}
      </div>
    </Example>
  )
}

/* ── Pill ───────────────────────────────────────────────────── */

function PillColorful() {
  return (
    <Example title="Pill / Colorful">
      <div className="flex flex-wrap gap-2">
        {allBrands.map((brand) => (
          <SocialLoginButton key={brand} brand={brand} shape="pill" />
        ))}
      </div>
    </Example>
  )
}

function PillWhite() {
  return (
    <Example title="Pill / White">
      <div className="flex flex-wrap gap-2">
        {allBrands.map((brand) => (
          <SocialLoginButton
            key={brand}
            brand={brand}
            shape="pill"
            appearance="white"
          />
        ))}
      </div>
    </Example>
  )
}

function PillBlack() {
  return (
    <Example title="Pill / Black">
      <div className="flex flex-wrap gap-2">
        {allBrands.map((brand) => (
          <SocialLoginButton
            key={brand}
            brand={brand}
            shape="pill"
            appearance="black"
          />
        ))}
      </div>
    </Example>
  )
}

/* ── Square ──────────────────────────────────────────────────── */

function SquareColorful() {
  return (
    <Example title="Square / Colorful">
      <div className="flex flex-wrap gap-2">
        {allBrands.map((brand) => (
          <SocialLoginButton key={brand} brand={brand} shape="square" />
        ))}
      </div>
    </Example>
  )
}

function SquareWhite() {
  return (
    <Example title="Square / White">
      <div className="flex flex-wrap gap-2">
        {allBrands.map((brand) => (
          <SocialLoginButton
            key={brand}
            brand={brand}
            shape="square"
            appearance="white"
          />
        ))}
      </div>
    </Example>
  )
}

function SquareBlack() {
  return (
    <Example title="Square / Black">
      <div className="flex flex-wrap gap-2">
        {allBrands.map((brand) => (
          <SocialLoginButton
            key={brand}
            brand={brand}
            shape="square"
            appearance="black"
          />
        ))}
      </div>
    </Example>
  )
}

/* ── Size: md ────────────────────────────────────────────────── */

function MdColorful() {
  return (
    <Example title="Size: md / Colorful">
      <div className="flex flex-wrap gap-2">
        {allBrands.map((brand) => (
          <SocialLoginButton key={brand} brand={brand} size="md" />
        ))}
      </div>
    </Example>
  )
}

function MdWhite() {
  return (
    <Example title="Size: md / White">
      <div className="flex flex-wrap gap-2">
        {allBrands.map((brand) => (
          <SocialLoginButton
            key={brand}
            brand={brand}
            size="md"
            appearance="white"
          />
        ))}
      </div>
    </Example>
  )
}

function MdBlack() {
  return (
    <Example title="Size: md / Black">
      <div className="flex flex-wrap gap-2">
        {allBrands.map((brand) => (
          <SocialLoginButton
            key={brand}
            brand={brand}
            size="md"
            appearance="black"
          />
        ))}
      </div>
    </Example>
  )
}

/* ── Icon Only ───────────────────────────────────────────────── */

function IconOnlyColorful() {
  return (
    <Example title="Icon Only / Colorful">
      <div className="flex flex-wrap gap-2">
        {allBrands.map((brand) => (
          <SocialLoginButton key={brand} brand={brand} iconOnly />
        ))}
      </div>
    </Example>
  )
}

function IconOnlyWhite() {
  return (
    <Example title="Icon Only / White">
      <div className="flex flex-wrap gap-2">
        {allBrands.map((brand) => (
          <SocialLoginButton
            key={brand}
            brand={brand}
            iconOnly
            appearance="white"
          />
        ))}
      </div>
    </Example>
  )
}

function IconOnlyBlack() {
  return (
    <Example title="Icon Only / Black">
      <div className="flex flex-wrap gap-2">
        {allBrands.map((brand) => (
          <SocialLoginButton
            key={brand}
            brand={brand}
            iconOnly
            appearance="black"
          />
        ))}
      </div>
    </Example>
  )
}

/* ── Custom Brand ────────────────────────────────────────────── */

function CustomBrand() {
  return (
    <Example title="Custom Brand">
      <div className="flex flex-wrap gap-2">
        <SocialLoginButton
          brand="custom"
          config={{ icon: AcmeIcon, label: "Acme Corp", color: "#6d28d9" }}
        />
        <SocialLoginButton
          brand="custom"
          config={{ icon: AcmeIcon, label: "Acme Corp" }}
          appearance="white"
        />
        <SocialLoginButton
          brand="custom"
          config={{ icon: AcmeIcon, label: "Acme Corp" }}
          appearance="black"
        />
        <SocialLoginButton
          brand="custom"
          config={{ icon: AcmeIcon, color: "#6d28d9" }}
          iconOnly
        />
        <SocialLoginButton
          brand="custom"
          config={{ icon: AcmeIcon }}
          iconOnly
          appearance="white"
        />
        <SocialLoginButton
          brand="custom"
          config={{ icon: AcmeIcon }}
          iconOnly
          appearance="black"
        />
      </div>
    </Example>
  )
}

function SSOExample() {
  return (
    <Example title="SSO">
      <div className="flex flex-wrap gap-2">
        <SocialLoginButton brand="sso" />
        <SocialLoginButton brand="sso" appearance="white" />
        <SocialLoginButton brand="sso" appearance="black" />
        <SocialLoginButton brand="sso" iconOnly />
        <SocialLoginButton brand="sso" iconOnly appearance="white" />
        <SocialLoginButton brand="sso" iconOnly appearance="black" />
      </div>
    </Example>
  )
}

/* ── asChild — slot into anchor ─────────────────────────────── */

function AsChildColorful() {
  return (
    <Example title="asChild / Colorful (anchor)">
      <div className="flex flex-wrap gap-2">
        <SocialLoginButton asChild brand="google">
          <a href="/auth/google" aria-label="Continue with Google" />
        </SocialLoginButton>
        <SocialLoginButton asChild brand="github">
          <a href="/auth/github" aria-label="Continue with Github" />
        </SocialLoginButton>
        <SocialLoginButton asChild brand="discord" shape="pill">
          <a href="/auth/discord" aria-label="Continue with Discord" />
        </SocialLoginButton>
      </div>
    </Example>
  )
}

function AsChildWhite() {
  return (
    <Example title="asChild / White (anchor)">
      <div className="flex flex-wrap gap-2">
        <SocialLoginButton asChild brand="apple" appearance="white">
          <a href="/auth/apple" aria-label="Continue with Apple" />
        </SocialLoginButton>
        <SocialLoginButton asChild brand="google" appearance="white">
          <a href="/auth/google" aria-label="Continue with Google" />
        </SocialLoginButton>
        <SocialLoginButton
          asChild
          brand="microsoft"
          appearance="white"
          shape="square"
        >
          <a href="/auth/microsoft" aria-label="Continue with Microsoft" />
        </SocialLoginButton>
      </div>
    </Example>
  )
}

function AsChildBlack() {
  return (
    <Example title="asChild / Black (anchor)">
      <div className="flex flex-wrap gap-2">
        <SocialLoginButton asChild brand="x" appearance="black">
          <a href="/auth/x" aria-label="Continue with X" />
        </SocialLoginButton>
        <SocialLoginButton asChild brand="sso" appearance="black" size="md">
          <a href="/auth/sso" aria-label="Single sign-on" />
        </SocialLoginButton>
      </div>
    </Example>
  )
}

function AsChildIconOnly() {
  return (
    <Example title="asChild / Icon Only (anchor)">
      <div className="flex flex-wrap gap-2">
        <SocialLoginButton asChild brand="google" iconOnly>
          <a href="/auth/google" aria-label="Continue with Google" />
        </SocialLoginButton>
        <SocialLoginButton asChild brand="github" iconOnly appearance="white">
          <a href="/auth/github" aria-label="Continue with Github" />
        </SocialLoginButton>
        <SocialLoginButton asChild brand="apple" iconOnly appearance="black">
          <a href="/auth/apple" aria-label="Continue with Apple" />
        </SocialLoginButton>
        <SocialLoginButton
          asChild
          brand="custom"
          config={{ icon: AcmeIcon, color: "#6d28d9" }}
          iconOnly
        >
          <a href="/auth/acme" aria-label="Continue with Acme" />
        </SocialLoginButton>
      </div>
    </Example>
  )
}
