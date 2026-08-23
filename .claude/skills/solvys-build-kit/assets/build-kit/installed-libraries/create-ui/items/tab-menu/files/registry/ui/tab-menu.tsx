"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/registry/lib/utils"

type TabMenuVariant = "horizontal-line"
type TabMenuSize = "sm" | "md" | "lg"
type TabMenuIndicator = "bottom"

type TabMenuContextValue = {
  variant: TabMenuVariant
  size: TabMenuSize
  indicator: TabMenuIndicator | undefined
  value: string | undefined
  onValueChange: ((value: string) => void) | undefined
  indicatorReady: boolean
}

const TabMenuContext = React.createContext<TabMenuContextValue>({
  variant: "horizontal-line",
  size: "md",
  indicator: undefined,
  value: undefined,
  onValueChange: undefined,
  indicatorReady: false,
})

function useTabMenuContext() {
  return React.useContext(TabMenuContext)
}

const tabMenuVariants = cva("relative flex", {
  variants: {
    variant: {
      "horizontal-line": "flex-row",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
    indicator: {
      bottom: "",
    },
  },
  compoundVariants: [
    {
      variant: "horizontal-line",
      indicator: "bottom",
      className:
        "has-[[data-slot=tab-menu-item]~[data-slot=tab-menu-item]]:border-b " +
        "has-[[data-slot=tab-menu-item]~[data-slot=tab-menu-item]]:border-light",
    },
  ],
  defaultVariants: {
    variant: "horizontal-line",
    size: "md",
    indicator: "bottom",
  },
})

const tabMenuItemVariants = cva(
  [
    // base
    "relative flex shrink-0 outline-none cursor-pointer [&_[data-slot=tab-menu-item-icon]]:shrink-0",
    // transition
    "transition-colors duration-200",
    // before
    "before:opacity-0 before:transition-opacity before:duration-200",
    // disabled
    "disabled:cursor-not-allowed disabled:bg-transparent! disabled:text-disabled! disabled:before:opacity-0!",
    // aria-disabled
    "aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:bg-transparent! aria-disabled:text-disabled! aria-disabled:before:opacity-0!",
    // data-[active=false]
    "data-[active=false]:text-body",
    // data-[active=false]:hover
    "data-[active=false]:hover:text-strongest",
  ],
  {
    variants: {
      variant: {
        "horizontal-line": [
          // base
          "items-center [&_[data-slot=tab-menu-item-content]]:contents [&_[data-slot=tab-menu-item-label]]:px-1",
          // data-[active=true]
          "data-[active=true]:[&_[data-slot=tab-menu-item-icon]]:text-primary-base",
        ],
      },
      size: {
        sm:
          "gap-component-xs p-component-sm rounded-lg text-ui-control-sm font-semibold " +
          "[&_[data-slot=tab-menu-item-icon]>svg]:size-4",
        md:
          "gap-component-sm p-component-md rounded-xl text-ui-control-md font-semibold " +
          "[&_[data-slot=tab-menu-item-icon]>svg]:size-5",
        lg:
          "gap-component-sm p-component-lg rounded-2xl text-ui-control-xl font-semibold " +
          "[&_[data-slot=tab-menu-item-icon]>svg]:size-6",
      },
      indicator: {
        bottom:
          "before:absolute before:left-0 before:right-0 before:-bottom-0.25 before:h-px before:bg-strongest",
      },
    },
    compoundVariants: [
      {
        variant: "horizontal-line",
        className: "data-[active=true]:text-strongest",
      },
      {
        variant: "horizontal-line",
        size: "md",
        className:
          "gap-component-xs [&_[data-slot=tab-menu-item-label]]:px-0.5",
      },
      {
        variant: "horizontal-line",
        size: "sm",
        className: "[&_[data-slot=tab-menu-item-label]]:px-0.5",
      },
    ],
    defaultVariants: {
      variant: "horizontal-line",
      size: "md",
      indicator: "bottom",
    },
  }
)

const TAB_SCROLL =
  "-my-1 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex shrink-0"

type TabMenuProps = React.ComponentProps<"div"> &
  VariantProps<typeof tabMenuVariants> & {
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    indicator?: TabMenuIndicator
  }

function TabMenu({
  className,
  variant = "horizontal-line",
  size = "md",
  indicator = "bottom",
  value: valueProp,
  defaultValue,
  onValueChange,
  children,
  ...props
}: TabMenuProps) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(
    defaultValue
  )
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp : internalValue

  const handleValueChange = React.useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange]
  )

  const containerRef = React.useRef<HTMLDivElement>(null)
  const [indicatorRect, setIndicatorRect] = React.useState<{
    left: number
    top: number
    width: number
    height: number
  }>({ left: 0, top: 0, width: 0, height: 0 })
  const [indicatorReady, setIndicatorReady] = React.useState(false)
  const indicatorReadyRef = React.useRef(false)

  React.useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const update = () => {
      const activeItem = container.querySelector<HTMLElement>(
        '[data-slot="tab-menu-item"][data-active="true"]'
      )
      if (!activeItem) {
        if (indicatorReadyRef.current) {
          indicatorReadyRef.current = false
          setIndicatorReady(false)
        }
        return
      }
      const containerRect = container.getBoundingClientRect()
      const itemRect = activeItem.getBoundingClientRect()
      setIndicatorRect({
        left: itemRect.left - containerRect.left + container.scrollLeft,
        top: itemRect.top - containerRect.top,
        width: itemRect.width,
        height: itemRect.height,
      })
      if (!indicatorReadyRef.current) {
        indicatorReadyRef.current = true
        setIndicatorReady(true)
      }
    }

    update()

    const ro = new ResizeObserver(update)
    ro.observe(container)
    container
      .querySelectorAll<HTMLElement>('[data-slot="tab-menu-item"]')
      .forEach((el) => ro.observe(el))

    const mo = new MutationObserver(update)
    mo.observe(container, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-active"],
      childList: true,
    })

    return () => {
      ro.disconnect()
      mo.disconnect()
    }
  }, [variant, size, indicator])

  const variantResolved = variant!
  const sizeResolved = size!

  return (
    <TabMenuContext.Provider
      value={{
        variant: variantResolved,
        size: sizeResolved,
        indicator,
        value,
        onValueChange: handleValueChange,
        indicatorReady,
      }}
    >
      <div data-slot="tab-menu-scroll" className={TAB_SCROLL}>
        <div
          ref={containerRef}
          data-slot="tab-menu"
          data-variant={variant}
          data-size={size}
          data-indicator={indicator}
          role="group"
          className={cn(
            tabMenuVariants({ variant, size, indicator }),
            className
          )}
          {...props}
        >
          {indicatorReady && (
            <span
              data-slot="tab-menu-active-line"
              aria-hidden="true"
              className={cn(
                "bg-primary-base pointer-events-none absolute h-px transition-all duration-300 ease-out"
              )}
              style={{
                left: indicatorRect.left,
                top: indicatorRect.top + indicatorRect.height,
                width: indicatorRect.width,
              }}
            />
          )}
          {children}
        </div>
      </div>
    </TabMenuContext.Provider>
  )
}

type TabMenuItemProps = Omit<React.ComponentProps<"button">, "value"> & {
  asChild?: boolean
  value?: string
  selected?: boolean
  leading?: React.ReactNode
  trailing?: React.ReactNode
  label?: React.ReactNode
}

function TabMenuItem({
  className,
  asChild = false,
  value,
  selected: selectedProp,
  disabled,
  leading,
  trailing,
  label,
  onClick,
  children,
  ...props
}: TabMenuItemProps) {
  const { variant, size, indicator, indicatorReady, ...ctx } =
    useTabMenuContext()

  const selected =
    selectedProp ??
    (value !== undefined && ctx.value !== undefined && ctx.value === value)

  const showFallbackCue = selected && !indicatorReady
  const fallbackLine =
    showFallbackCue && indicator
      ? "before:opacity-100! before:bg-primary-base!"
      : undefined

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    onClick?.(event)
    if (!event.defaultPrevented && value !== undefined) {
      ctx.onValueChange?.(value)
    }
  }

  const slotChildren = asChild ? React.Children.toArray(children) : []
  const slot =
    slotChildren.length === 1 &&
    React.isValidElement<{ children?: React.ReactNode }>(slotChildren[0]) &&
    slotChildren[0].type !== React.Fragment
      ? slotChildren[0]
      : null
  const labelContent = slot ? (slot.props.children ?? label) : label
  const extraChildren = slot ? null : children

  const Comp = asChild && slot ? Slot.Root : "button"

  const content = (
    <>
      {leading && (
        <span data-slot="tab-menu-item-icon" data-position="leading">
          {leading}
        </span>
      )}
      {(labelContent != null || extraChildren != null) && (
        <span data-slot="tab-menu-item-content">
          {labelContent != null && (
            <span data-slot="tab-menu-item-label">{labelContent}</span>
          )}
          {extraChildren}
        </span>
      )}
      {trailing && (
        <span data-slot="tab-menu-item-icon" data-position="trailing">
          {trailing}
        </span>
      )}
    </>
  )

  const inner = slot ? React.cloneElement(slot, undefined, content) : content

  return (
    <Comp
      data-slot="tab-menu-item"
      data-variant={variant}
      data-size={size}
      data-indicator={indicator}
      data-state={selected ? "on" : "off"}
      data-active={selected ? "true" : "false"}
      data-value={value}
      aria-pressed={asChild ? undefined : selected}
      aria-disabled={asChild ? disabled || undefined : undefined}
      disabled={asChild ? undefined : disabled}
      tabIndex={asChild && disabled ? -1 : undefined}
      type={asChild ? undefined : "button"}
      onClick={handleClick}
      className={cn(
        tabMenuItemVariants({ variant, size, indicator }),
        fallbackLine,
        className
      )}
      {...props}
    >
      {inner}
    </Comp>
  )
}

export { TabMenu, TabMenuItem, tabMenuVariants, tabMenuItemVariants }
