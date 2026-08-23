"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/registry/lib/utils"

type TabsSize = "sm" | "md" | "lg"

type TabsContextValue = {
  size: TabsSize
}

const TabsContext = React.createContext<TabsContextValue>({ size: "md" })

function useTabsContext() {
  return React.useContext(TabsContext)
}

type TabsListContextValue = {
  indicatorReady: boolean
}

const TabsListContext = React.createContext<TabsListContextValue>({
  indicatorReady: false,
})

function useTabsListContext() {
  return React.useContext(TabsListContext)
}

const tabsListVariants = cva([
  // base
  "relative flex flex-row w-full",
  // baseline border once there are 2+ triggers
  "has-[[data-slot=tabs-trigger]~[data-slot=tabs-trigger]]:border-b has-[[data-slot=tabs-trigger]~[data-slot=tabs-trigger]]:border-light",
])

const TAB_SCROLL =
  "-my-1 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex shrink-0 w-full"

const tabsTriggerVariants = cva(
  [
    // base
    "relative flex shrink-0 items-center cursor-pointer select-none whitespace-nowrap outline-none font-semibold [&_[data-slot=tabs-trigger-icon]]:shrink-0 [&_[data-slot=tabs-trigger-content]]:contents [&_[data-slot=tabs-trigger-label]]:px-1",
    // transition
    "transition-colors duration-200",
    // state color
    "data-[state=inactive]:text-body data-[state=inactive]:hover:text-strongest data-[state=active]:text-strongest data-[state=active]:[&_[data-slot=tabs-trigger-icon]]:text-primary-base",
    // focus-visible
    "focus-visible:outline-2 focus-visible:outline-strong focus-visible:outline-offset-2",
    // disabled
    "disabled:cursor-not-allowed disabled:text-disabled! disabled:before:opacity-0!",
    // active line (fallback before measurement; the sliding span draws the live one)
    "before:absolute before:inset-x-0 before:-bottom-px before:h-px before:bg-primary-base before:opacity-0 before:transition-opacity before:duration-200",
  ],
  {
    variants: {
      size: {
        sm: "gap-component-xs p-component-sm rounded-lg text-ui-control-sm [&_[data-slot=tabs-trigger-icon]>svg]:size-4 [&_[data-slot=tabs-trigger-label]]:px-0.5",
        md: "gap-component-xs p-component-md rounded-xl text-ui-control-md [&_[data-slot=tabs-trigger-icon]>svg]:size-5 [&_[data-slot=tabs-trigger-label]]:px-0.5",
        lg: "gap-component-sm p-component-lg rounded-2xl text-ui-control-xl [&_[data-slot=tabs-trigger-icon]>svg]:size-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const tabsContentVariants = cva([
  // base
  "mt-component-lg outline-none",
  // focus-visible
  "focus-visible:outline-2 focus-visible:outline-strong focus-visible:outline-offset-2 focus-visible:rounded-lg",
])

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> & {
  size?: TabsSize
}

function Tabs({ className, size = "md", ...props }: TabsProps) {
  return (
    <TabsContext.Provider value={{ size }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-size={size}
        className={cn("flex flex-col", className)}
        {...props}
      />
    </TabsContext.Provider>
  )
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [indicatorRect, setIndicatorRect] = React.useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })
  const [indicatorReady, setIndicatorReady] = React.useState(false)
  const indicatorReadyRef = React.useRef(false)

  React.useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const update = () => {
      const active = container.querySelector<HTMLElement>(
        '[data-slot="tabs-trigger"][data-state="active"]'
      )
      if (!active) {
        if (indicatorReadyRef.current) {
          indicatorReadyRef.current = false
          setIndicatorReady(false)
        }
        return
      }
      const containerRect = container.getBoundingClientRect()
      const activeRect = active.getBoundingClientRect()
      setIndicatorRect({
        left: activeRect.left - containerRect.left + container.scrollLeft,
        top: activeRect.top - containerRect.top,
        width: activeRect.width,
        height: activeRect.height,
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
      .querySelectorAll<HTMLElement>('[data-slot="tabs-trigger"]')
      .forEach((el) => ro.observe(el))

    const mo = new MutationObserver(update)
    mo.observe(container, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-state"],
      childList: true,
    })

    return () => {
      ro.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <TabsListContext.Provider value={{ indicatorReady }}>
      <div data-slot="tabs-list-scroll" className={TAB_SCROLL}>
        <TabsPrimitive.List
          ref={containerRef}
          data-slot="tabs-list"
          className={cn(tabsListVariants(), className)}
          {...props}
        >
          {indicatorReady && (
            <span
              data-slot="tabs-active-line"
              aria-hidden="true"
              className="bg-primary-base pointer-events-none absolute h-px transition-all duration-300 ease-out"
              style={{
                left: indicatorRect.left,
                top: indicatorRect.top + indicatorRect.height,
                width: indicatorRect.width,
              }}
            />
          )}
          {children}
        </TabsPrimitive.List>
      </div>
    </TabsListContext.Provider>
  )
}

type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  leading?: React.ReactNode
  trailing?: React.ReactNode
}

function TabsTrigger({
  className,
  leading,
  trailing,
  children,
  ...props
}: TabsTriggerProps) {
  const { size } = useTabsContext()
  const { indicatorReady } = useTabsListContext()
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      data-size={size}
      className={cn(
        tabsTriggerVariants({ size }),
        !indicatorReady && "data-[state=active]:before:opacity-100",
        className
      )}
      {...props}
    >
      {leading && (
        <span data-slot="tabs-trigger-icon" data-position="leading">
          {leading}
        </span>
      )}
      {children != null && (
        <span data-slot="tabs-trigger-content">
          <span data-slot="tabs-trigger-label">{children}</span>
        </span>
      )}
      {trailing && (
        <span data-slot="tabs-trigger-icon" data-position="trailing">
          {trailing}
        </span>
      )}
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(tabsContentVariants(), className)}
      {...props}
    />
  )
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
}
export type { TabsSize }
