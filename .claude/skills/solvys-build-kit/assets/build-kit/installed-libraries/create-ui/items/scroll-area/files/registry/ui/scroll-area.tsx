"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"

import { cn } from "@/registry/lib/utils"

const scrollBarVariants = cva(
  [
    // base
    "cn-scroll-area-scrollbar flex touch-none select-none",
    // transition
    "transition-opacity duration-400",
    // visibility
    "data-[state=hidden]:opacity-0 data-[state=visible]:opacity-100",
    // orientation
    "data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:px-3 data-[orientation=horizontal]:py-1 data-[orientation=vertical]:px-1 data-[orientation=vertical]:py-3",
  ],
  {
    variants: {
      appearance: {
        filled: "bg-weak",
        ghost: "",
      },
      size: {
        sm: "data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5",
        md: "data-[orientation=horizontal]:h-3 data-[orientation=vertical]:w-3",
        lg: "data-[orientation=horizontal]:h-4.5 data-[orientation=horizontal]:py-1.5 data-[orientation=vertical]:w-4.5 data-[orientation=vertical]:px-1.5",
      },
    },
    defaultVariants: {
      appearance: "filled",
      size: "md",
    },
  }
)

type ScrollBarVariantProps = VariantProps<typeof scrollBarVariants>

function ScrollArea({
  className,
  children,
  size,
  appearance,
  orientation = "vertical",
  fade = false,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> &
  ScrollBarVariantProps & {
    orientation?: "vertical" | "horizontal" | "both"
    fade?: boolean
  }) {
  const showVertical = orientation === "vertical" || orientation === "both"
  const showHorizontal = orientation === "horizontal" || orientation === "both"

  const viewportRef = React.useRef<HTMLDivElement>(null)
  const [atVerticalEnd, setAtVerticalEnd] = React.useState(false)
  const [atHorizontalEnd, setAtHorizontalEnd] = React.useState(false)

  React.useEffect(() => {
    if (!fade) return
    const viewport = viewportRef.current
    if (!viewport) return

    const update = () => {
      if (showVertical) {
        setAtVerticalEnd(
          viewport.scrollTop + viewport.clientHeight >=
            viewport.scrollHeight - 1
        )
      }
      if (showHorizontal) {
        setAtHorizontalEnd(
          viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 1
        )
      }
    }

    update()
    viewport.addEventListener("scroll", update, { passive: true })
    const resizeObserver = new ResizeObserver(update)
    resizeObserver.observe(viewport)
    const mutationObserver = new MutationObserver(update)
    mutationObserver.observe(viewport, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => {
      viewport.removeEventListener("scroll", update)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [fade, showVertical, showHorizontal])

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("cn-scroll-area relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        data-slot="scroll-area-viewport"
        className="cn-scroll-area-viewport focus-visible:ring-primary-base/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {fade && showVertical && (
        <div
          aria-hidden
          data-slot="scroll-area-fade"
          data-orientation="vertical"
          data-state={atVerticalEnd ? "hidden" : "visible"}
          className="cn-scroll-area-fade to-static-white pointer-events-none absolute inset-x-0 bottom-0 h-15 w-full rounded-b-[inherit] bg-gradient-to-b from-transparent transition-opacity duration-400 data-[state=hidden]:opacity-0 data-[state=visible]:opacity-100"
        />
      )}
      {fade && showHorizontal && (
        <div
          aria-hidden
          data-slot="scroll-area-fade"
          data-orientation="horizontal"
          data-state={atHorizontalEnd ? "hidden" : "visible"}
          className="cn-scroll-area-fade to-static-white pointer-events-none absolute inset-y-0 right-0 h-full w-15 rounded-r-[inherit] bg-gradient-to-r from-transparent transition-opacity duration-400 data-[state=hidden]:opacity-0 data-[state=visible]:opacity-100"
        />
      )}
      {showVertical && (
        <ScrollBar orientation="vertical" size={size} appearance={appearance} />
      )}
      {showHorizontal && (
        <ScrollBar
          orientation="horizontal"
          size={size}
          appearance={appearance}
        />
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  size,
  appearance,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> &
  ScrollBarVariantProps) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      forceMount
      className={cn(scrollBarVariants({ size, appearance }), className)}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="cn-scroll-area-thumb bg-medium relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar, scrollBarVariants }
