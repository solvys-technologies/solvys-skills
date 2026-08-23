"use client"

import Link from "next/link"
import { RiAddFill, RiArrowRightSLine } from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import { cn } from "@/registry/lib/utils"
import { TextLink } from "@/registry/ui/text-link"

const variants = [
  "primary",
  "neutral",
  "inverse",
  "danger",
  "success",
  "info",
] as const
const sizes = ["xs", "sm", "md", "lg"] as const
const states = [
  { key: "default", label: "Default", props: {} },
  { key: "visited", label: "Visited", props: { visited: true } },
  { key: "disabled", label: "Disabled", props: { disabled: true } },
] as const

function VariantMatrix() {
  return (
    <SectionFrame title="Variants">
      <table className="border-separate border-spacing-x-6 border-spacing-y-0">
        <thead>
          <tr>
            <th />
            {variants.map((v) => (
              <th
                key={v}
                className="text-body px-4 pt-4 pb-3 text-center text-[10px] font-semibold tracking-wider uppercase"
              >
                {v}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {states.map((s, si) => (
            <tr key={s.key}>
              <td
                className={cn(
                  "text-strongest pr-6 text-right align-middle text-[11px] font-semibold uppercase",
                  si > 0 && "pt-6"
                )}
              >
                {s.label}
              </td>
              {variants.map((v) => (
                <td
                  key={v}
                  className={cn(
                    "px-4 py-1.5 text-center",
                    si > 0 && "pt-6",
                    v === "inverse" && "bg-strongest rounded-md"
                  )}
                >
                  <div className="flex justify-center">
                    <TextLink
                      variant={v}
                      size="md"
                      leading={<RiAddFill />}
                      trailing={<RiArrowRightSLine />}
                      underline
                      {...s.props}
                    >
                      Inline Text Link
                    </TextLink>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </SectionFrame>
  )
}

function SizesSection() {
  return (
    <SectionFrame title="Sizes">
      <div className="flex flex-wrap items-end gap-4">
        {sizes.map((size) => (
          <TextLink
            key={size}
            size={size}
            leading={<RiAddFill />}
            trailing={<RiArrowRightSLine />}
            underline
          >
            Inline Text Link
          </TextLink>
        ))}
      </div>
    </SectionFrame>
  )
}

function UnderlineSection() {
  return (
    <SectionFrame title="Underline">
      <div className="flex flex-wrap items-center gap-6">
        <TextLink
          leading={<RiAddFill />}
          trailing={<RiArrowRightSLine />}
          underline
        >
          With underline
        </TextLink>
        <TextLink leading={<RiAddFill />} trailing={<RiArrowRightSLine />}>
          Without underline
        </TextLink>
      </div>
    </SectionFrame>
  )
}

function InvalidSection() {
  return (
    <SectionFrame title="Invalid">
      <div className="flex flex-wrap items-center gap-6">
        {variants.map((v) => (
          <div
            key={v}
            className={cn(
              "flex justify-center",
              v === "inverse" && "bg-strongest rounded-md px-3 py-2"
            )}
          >
            <TextLink
              variant={v}
              size="md"
              leading={<RiAddFill />}
              trailing={<RiArrowRightSLine />}
              underline
              aria-invalid
            >
              Inline Text Link
            </TextLink>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
}

function AsChildSection() {
  return (
    <SectionFrame title="asChild — slot Next Link">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
            Leading icon
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <TextLink asChild leading={<RiAddFill />} underline>
              <Link href="/">Primary link</Link>
            </TextLink>
            <TextLink
              asChild
              variant="neutral"
              leading={<RiAddFill />}
              underline
            >
              <Link href="/">Neutral link</Link>
            </TextLink>
            <TextLink asChild variant="info" leading={<RiAddFill />} underline>
              <Link href="/">Info link</Link>
            </TextLink>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
            Trailing icon
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <TextLink asChild trailing={<RiArrowRightSLine />} underline>
              <Link href="/">Continue</Link>
            </TextLink>
            <TextLink
              asChild
              variant="success"
              trailing={<RiArrowRightSLine />}
              underline
            >
              <Link href="/">Success link</Link>
            </TextLink>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
            Leading + trailing
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <TextLink
              asChild
              leading={<RiAddFill />}
              trailing={<RiArrowRightSLine />}
              underline
            >
              <Link href="/">Both icons</Link>
            </TextLink>
            <TextLink
              asChild
              variant="danger"
              leading={<RiAddFill />}
              trailing={<RiArrowRightSLine />}
              underline
            >
              <Link href="/">Error link</Link>
            </TextLink>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-body text-[10px] font-semibold tracking-wider uppercase">
            Disabled (aria-disabled on Link)
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <TextLink
              asChild
              disabled
              leading={<RiAddFill />}
              trailing={<RiArrowRightSLine />}
              underline
            >
              <Link href="/">Disabled link</Link>
            </TextLink>
          </div>
        </div>
      </div>
    </SectionFrame>
  )
}

export default function TextLinkExample() {
  return (
    <div className="flex flex-col gap-16">
      <VariantMatrix />
      <SizesSection />
      <UnderlineSection />
      <InvalidSection />
      <AsChildSection />
    </div>
  )
}
