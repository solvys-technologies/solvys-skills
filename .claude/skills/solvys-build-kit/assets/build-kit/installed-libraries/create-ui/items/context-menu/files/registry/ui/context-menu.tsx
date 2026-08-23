"use client"

import * as React from "react"
import type { MenuProps as AriaMenuProps } from "react-aria-components"

import { cn } from "@/registry/lib/utils"
import {
  DropdownContext,
  DropdownFooter,
  DropdownHeader,
  DropdownItem,
  DropdownItemContainer,
  DropdownItemContent,
  DropdownItemDescription,
  DropdownItemIndicator,
  DropdownItemLabel,
  DropdownMenu,
  DropdownMisc,
  DropdownPopover,
  DropdownSection,
  DropdownSeparator,
  type DropdownItemProps,
  type DropdownSize,
} from "@/registry/ui/dropdown-menu"

type ContextMenuContextValue = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  triggerRef: React.RefObject<HTMLSpanElement | null>
  openAt: (x: number, y: number) => void
}

const ContextMenuContext = React.createContext<ContextMenuContextValue | null>(
  null
)

function useContextMenuContext() {
  const ctx = React.useContext(ContextMenuContext)
  if (!ctx) {
    throw new Error("ContextMenu parts must be used within <ContextMenu>")
  }
  return ctx
}

function ContextMenu({
  size,
  children,
}: {
  size?: DropdownSize
  children?: React.ReactNode
}) {
  const resolvedSize: DropdownSize = size ?? "sm"
  const [isOpen, setOpen] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  const triggerRef = React.useRef<HTMLSpanElement>(null)

  const openAt = React.useCallback((x: number, y: number) => {
    setPosition({ x, y })
  }, [])

  const value = React.useMemo<ContextMenuContextValue>(
    () => ({ isOpen, onOpenChange: setOpen, triggerRef, openAt }),
    [isOpen, openAt]
  )

  return (
    <DropdownContext.Provider value={{ size: resolvedSize }}>
      <ContextMenuContext.Provider value={value}>
        {children}
        <span
          ref={triggerRef}
          aria-hidden
          data-slot="context-menu-anchor"
          className="pointer-events-none fixed h-0 w-0"
          style={{ left: position.x, top: position.y }}
        />
      </ContextMenuContext.Provider>
    </DropdownContext.Provider>
  )
}

function ContextMenuTrigger({
  className,
  onContextMenu,
  ...props
}: React.ComponentProps<"div">) {
  const { openAt, onOpenChange, isOpen } = useContextMenuContext()

  return (
    <div
      data-slot="context-menu-trigger"
      tabIndex={0}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      className={cn(
        "focus-visible:outline-strong outline-2 outline-offset-2 outline-transparent",
        className
      )}
      onContextMenu={(event) => {
        event.preventDefault()
        if (event.clientX <= 0 && event.clientY <= 0) {
          const rect = event.currentTarget.getBoundingClientRect()
          openAt(rect.left, rect.bottom)
        } else {
          openAt(event.clientX, event.clientY)
        }
        onOpenChange(true)
        onContextMenu?.(event)
      }}
      {...props}
    />
  )
}

function ContextMenuPopover(
  props: React.ComponentProps<typeof DropdownPopover>
) {
  const { isOpen, onOpenChange, triggerRef } = useContextMenuContext()

  return (
    <DropdownPopover
      data-slot="context-menu-popover"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      triggerRef={triggerRef}
      placement="bottom start"
      offset={0}
      {...props}
    />
  )
}

function ContextMenuMenu<T extends object>(props: AriaMenuProps<T>) {
  const { onOpenChange } = useContextMenuContext()

  return (
    <DropdownMenu
      data-slot="context-menu-menu"
      autoFocus="first"
      onClose={() => onOpenChange(false)}
      {...props}
    />
  )
}

const ContextMenuNamespace = Object.assign(ContextMenu, {
  Trigger: ContextMenuTrigger,
  Popover: ContextMenuPopover,
  Menu: ContextMenuMenu,
  Section: DropdownSection,
  Header: DropdownHeader,
  Misc: DropdownMisc,
  Separator: DropdownSeparator,
  Item: DropdownItem,
  ItemContainer: DropdownItemContainer,
  ItemLabel: DropdownItemLabel,
  ItemDescription: DropdownItemDescription,
  ItemContent: DropdownItemContent,
  ItemIndicator: DropdownItemIndicator,
  Footer: DropdownFooter,
})

export {
  ContextMenuNamespace as ContextMenu,
  ContextMenuTrigger,
  ContextMenuPopover,
  ContextMenuMenu,
  DropdownSection as ContextMenuSection,
  DropdownHeader as ContextMenuHeader,
  DropdownMisc as ContextMenuMisc,
  DropdownSeparator as ContextMenuSeparator,
  DropdownItem as ContextMenuItem,
  DropdownItemContainer as ContextMenuItemContainer,
  DropdownItemLabel as ContextMenuItemLabel,
  DropdownItemDescription as ContextMenuItemDescription,
  DropdownItemContent as ContextMenuItemContent,
  DropdownItemIndicator as ContextMenuItemIndicator,
  DropdownFooter as ContextMenuFooter,
}
export type {
  DropdownSize as ContextMenuSize,
  DropdownItemProps as ContextMenuItemProps,
}
