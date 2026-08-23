import { RiSparklingFill } from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import {
  Popover,
  PopoverActions,
  PopoverActionText,
  PopoverBody,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverImage,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/pro/ui/popover"
import { Button } from "@/registry/ui/button"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

type PopoverSize = "sm" | "md" | "lg"
type PopoverSide = "top" | "right" | "bottom" | "left"
type PopoverAlign = "start" | "center" | "end"

const sizes: PopoverSize[] = ["sm", "md", "lg"]
const sides: PopoverSide[] = ["top", "right", "bottom", "left"]
const alignments: PopoverAlign[] = ["start", "center", "end"]

const footerButtonSize = {
  sm: "xs",
  md: "sm",
  lg: "md",
} as const

const contentVariants = [
  { key: "basic", label: "Basic", props: {} },
  { key: "image", label: "With Image", props: { withImage: true } },
  { key: "close", label: "With Close", props: { showClose: true } },
  {
    key: "full",
    label: "Image + Close",
    props: { withImage: true, showClose: true, withFooter: true },
  },
  { key: "noArrow", label: "No Arrow", props: { showArrow: false } },
] as const

// ---------------------------------------------------------------------------
// Popover demo helper — builds a single trigger + content pair
// ---------------------------------------------------------------------------

function PopoverDemo({
  label,
  size = "sm",
  side = "bottom",
  align = "center",
  showArrow = true,
  showClose = false,
  withImage = false,
  withFooter = false,
  defaultOpen = false,
}: {
  label: string
  size?: PopoverSize
  side?: PopoverSide
  align?: PopoverAlign
  showArrow?: boolean
  showClose?: boolean
  withImage?: boolean
  withFooter?: boolean
  defaultOpen?: boolean
}) {
  return (
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger asChild>
        <Button appearance="outline" size="sm">
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        size={size}
        side={side}
        align={align}
        showArrow={showArrow}
        showClose={showClose}
      >
        {withImage && (
          <PopoverImage>
            <img
              src="https://createui.co/images/create-banner.png"
              alt="Create UI"
            />
          </PopoverImage>
        )}
        <PopoverBody>
          <PopoverHeader>
            <PopoverTitle>
              <RiSparklingFill />
              Popover Title
            </PopoverTitle>
            <PopoverDescription>
              Need help? Use the example format shown for guidance.
            </PopoverDescription>
          </PopoverHeader>
          {withFooter && (
            <PopoverFooter>
              <PopoverActions>
                <Button variant="neutral-solid" size={footerButtonSize[size]}>
                  Done
                </Button>
                <Button
                  variant="neutral-solid"
                  appearance="ghost"
                  size={footerButtonSize[size]}
                >
                  Learn More
                </Button>
              </PopoverActions>
              <PopoverActionText>2/4</PopoverActionText>
            </PopoverFooter>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

// ---------------------------------------------------------------------------
// Root export
// ---------------------------------------------------------------------------

export default function PopoverExample() {
  return (
    <div className="space-y-12">
      <SectionFrame title="Open State">
        <div className="flex items-start gap-48 pb-48">
          <PopoverDemo label="Basic (MD)" size="md" defaultOpen />
          <PopoverDemo
            label="Full (LG)"
            size="lg"
            withImage
            withFooter
            showClose
            defaultOpen
          />
        </div>
      </SectionFrame>

      {sizes.map((size) => (
        <SectionFrame key={size} title={`Size: ${size.toUpperCase()}`}>
          <div className="flex items-center gap-4">
            {contentVariants.map((variant) => (
              <PopoverDemo
                key={variant.key}
                label={variant.label}
                size={size}
                {...variant.props}
              />
            ))}
          </div>
        </SectionFrame>
      ))}

      <SectionFrame title="Sides">
        <div className="flex flex-col gap-3">
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-4">
              {sides.map((side) => (
                <PopoverDemo
                  key={`${size}-${side}`}
                  label={`${size.toUpperCase()} · ${side}`}
                  size={size}
                  side={side}
                />
              ))}
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame title="Alignments">
        <div className="flex flex-col gap-8">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col gap-3">
              <div className="text-ui-control-sm text-placeholder font-medium">
                {size.toUpperCase()}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {sides.map((side) =>
                  alignments.map((align) => (
                    <PopoverDemo
                      key={`${size}-${side}-${align}`}
                      label={`${side} ${align}`}
                      size={size}
                      side={side}
                      align={align}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionFrame>
    </div>
  )
}
