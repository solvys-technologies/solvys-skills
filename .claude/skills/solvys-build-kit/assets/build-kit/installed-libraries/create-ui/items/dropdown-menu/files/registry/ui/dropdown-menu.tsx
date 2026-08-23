"use client"

import * as React from "react"
import { RiCheckLine, RiSearch2Line } from "@create-ui/assets/icons"
import {
  Autocomplete as AriaAutocomplete,
  Header as AriaHeader,
  Input as AriaInput,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  MenuTrigger as AriaMenuTrigger,
  Popover as AriaPopover,
  Pressable as AriaPressable,
  SearchField as AriaSearchField,
  Separator as AriaSeparator,
  Text as AriaText,
  composeRenderProps,
  useFilter,
  type MenuItemProps as AriaMenuItemProps,
  type MenuProps as AriaMenuProps,
  type MenuTriggerProps as AriaMenuTriggerProps,
  type PopoverProps as AriaPopoverProps,
  type MenuItemRenderProps,
} from "react-aria-components"

import { cn } from "@/registry/lib/utils"
import { useOptionalFieldContext } from "@/registry/ui/field"
import {
  InputProvider,
  InputShell,
  inputSlotSizeClasses,
  inputVariants,
} from "@/registry/ui/input"
import { ScrollArea } from "@/registry/ui/scroll-area"

type DropdownSize = "xs" | "sm" | "md"

type DropdownContextValue = {
  size: DropdownSize
  selectionMode?: "none" | "single" | "multiple"
}

const DropdownContext = React.createContext<DropdownContextValue>({
  size: "xs",
})

function useDropdownContext() {
  return React.useContext(DropdownContext)
}

const POPOVER_RADIUS: Record<DropdownSize, string> = {
  xs: "rounded-2xl",
  sm: "rounded-2xl",
  md: "rounded-3xl",
}

const POPOVER_SHADOW: Record<DropdownSize, string> = {
  xs: "shadow-neutral-xs",
  sm: "shadow-neutral-sm",
  md: "shadow-neutral-md",
}

const ITEM_ROW_CLASSES: Record<DropdownSize, string> = {
  xs: "px-component-sm py-layout-none",
  sm: "px-component-sm py-layout-none",
  md: "px-component-md py-layout-none",
}

const ITEM_WRAPPER_CLASSES: Record<DropdownSize, string> = {
  xs: "min-h-9 gap-component-xs p-component-sm text-ui-control-md [&_svg]:size-5",
  sm: "min-h-10 gap-component-sm px-component-md py-component-sm text-ui-control-lg [&_svg]:size-[22px]",
  md: "min-h-12 gap-component-sm p-component-md text-ui-control-xl [&_svg]:size-6",
}

const ITEM_CONTAINER_GAP: Record<DropdownSize, string> = {
  xs: "gap-1.5",
  sm: "gap-1.5",
  md: "gap-component-sm",
}

const ITEM_WRAPPER_RADIUS: Record<DropdownSize, string> = {
  xs: "rounded-component-lg",
  sm: "rounded-component-lg",
  md: "rounded-component-xl",
}

const HEADER_PAD: Record<DropdownSize, string> = {
  xs: "px-component-sm",
  sm: "px-component-md",
  md: "px-component-md",
}

const HEADER_TEXT_CLASSES: Record<DropdownSize, string> = {
  xs: "text-ui-overline-xs",
  sm: "text-ui-overline-sm",
  md: "text-ui-overline-md",
}

const ITEM_DESC_CLASSES: Record<DropdownSize, string> = {
  xs: "text-ui-control-xs",
  sm: "text-ui-control-sm",
  md: "text-ui-control-md",
}

const ITEM_INDICATOR_SIZE: Record<DropdownSize, string> = {
  xs: "size-5",
  sm: "size-[22px]",
  md: "size-6",
}

const FOOTER_CLASSES: Record<DropdownSize, string> = {
  xs: "min-h-12 p-component-sm",
  sm: "min-h-12 p-component-xs",
  md: "min-h-16 p-component-sm",
}

const LIST_CLASSES: Record<DropdownSize, string> = {
  xs: "gap-component-xs py-component-sm",
  sm: "gap-component-sm py-component-sm",
  md: "gap-component-sm py-component-md",
}

const SECTION_GAP: Record<DropdownSize, string> = {
  xs: "gap-component-xs",
  sm: "gap-component-sm",
  md: "gap-component-sm",
}

const HEADER_PY: Record<DropdownSize, string> = {
  xs: "py-component-xs",
  sm: "py-component-sm",
  md: "py-component-sm",
}

const MISC_PAD: Record<DropdownSize, string> = {
  xs: "p-component-xs",
  sm: "p-component-xs",
  md: "p-component-sm",
}

const dropdownItemClasses = {
  row: ITEM_ROW_CLASSES,
  wrapper: ITEM_WRAPPER_CLASSES,
  radius: ITEM_WRAPPER_RADIUS,
  sectionGap: SECTION_GAP,
  panelRadius: POPOVER_RADIUS,
  panelShadow: POPOVER_SHADOW,
  headerPad: HEADER_PAD,
  headerPy: HEADER_PY,
  headerText: HEADER_TEXT_CLASSES,
  list: LIST_CLASSES,
}

type DropdownPanelAnimation = "zoom" | "slide"

function dropdownPanelClasses(
  size: DropdownSize,
  {
    animation = "zoom",
    className,
  }: { animation?: DropdownPanelAnimation; className?: string } = {}
) {
  return cn(
    "bg-static border-light flex flex-col overflow-clip border",
    animation === "zoom"
      ? "min-w-(--trigger-width) outline-hidden data-[entering]:animate-in data-[entering]:fade-in-0 data-[entering]:zoom-in-95 data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95"
      : "relative z-50 max-h-[inherit] min-w-(--trigger-width) duration-200 data-[entering]:animate-in data-[entering]:fade-in-0 data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2",
    POPOVER_RADIUS[size],
    POPOVER_SHADOW[size],
    className
  )
}

function dropdownListClasses(
  size: DropdownSize,
  {
    padded = true,
    scroll = true,
    className,
  }: { padded?: boolean; scroll?: boolean; className?: string } = {}
) {
  return cn(
    "flex min-h-0 flex-col outline-hidden",
    // The menu delegates scrolling to a ScrollArea wrapper; list-based
    // consumers (select, combobox, input-tag) keep native overflow.
    scroll && "overflow-y-auto",
    padded && LIST_CLASSES[size],
    className
  )
}

function dropdownItemRowClasses(size: DropdownSize, className?: string) {
  return cn(
    "group/item block w-full cursor-pointer outline-hidden select-none",
    ITEM_ROW_CLASSES[size],
    "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed",
    className
  )
}

function dropdownItemWrapperClasses(
  size: DropdownSize,
  {
    variant = "default",
    className,
  }: { variant?: "default" | "danger"; className?: string } = {}
) {
  return cn(
    "relative flex flex-1 items-center text-left transition-colors",
    ITEM_WRAPPER_CLASSES[size],
    ITEM_WRAPPER_RADIUS[size],
    variant === "danger" ? "text-error-strong" : "text-body",
    "[&_svg]:shrink-0",
    "group-data-[focused]/item:bg-weakest",
    "group-data-[disabled]/item:text-disabled",
    className
  )
}

function dropdownHeaderClasses(size: DropdownSize, className?: string) {
  return cn("flex items-center", HEADER_PAD[size], HEADER_PY[size], className)
}

function dropdownHeaderLabelClasses(size: DropdownSize, className?: string) {
  return cn(
    "text-placeholder block flex-1 truncate uppercase",
    HEADER_PAD[size],
    HEADER_TEXT_CLASSES[size],
    className
  )
}

function dropdownSectionClasses(size: DropdownSize, className?: string) {
  return cn("flex flex-col", SECTION_GAP[size], className)
}

const DROPDOWN_SEPARATOR_CLASSES = "bg-light h-px w-full shrink-0 border-0"

function dropdownFooterClasses(
  size: DropdownSize,
  { divider = true, className }: { divider?: boolean; className?: string } = {}
) {
  return cn(
    "gap-component-sm relative flex shrink-0 items-center",
    FOOTER_CLASSES[size],
    divider &&
      "before:bg-light before:absolute before:inset-x-0 before:top-0 before:h-px before:content-['']",
    className
  )
}

function Dropdown({
  size,
  children,
  ...props
}: AriaMenuTriggerProps & { size?: DropdownSize }) {
  const fieldCtx = useOptionalFieldContext()
  const resolvedSize: DropdownSize =
    size ?? (fieldCtx?.size as DropdownSize) ?? "xs"

  const childArray = React.Children.toArray(children)
  const popover = childArray.find(
    (child) => React.isValidElement(child) && child.type === DropdownPopover
  )
  const triggerChildren = childArray.filter((child) => child !== popover)
  const triggerChild =
    triggerChildren.length === 1 && React.isValidElement(triggerChildren[0]) ? (
      triggerChildren[0]
    ) : (
      <span className="flex w-fit cursor-pointer">{triggerChildren}</span>
    )

  return (
    <DropdownContext.Provider value={{ size: resolvedSize }}>
      <AriaMenuTrigger {...props}>
        <AriaPressable>{triggerChild}</AriaPressable>
        {popover}
      </AriaMenuTrigger>
    </DropdownContext.Provider>
  )
}

function DropdownPopover({
  className,
  children,
  header,
  filter,
  ...props
}: Omit<AriaPopoverProps, "children"> & {
  children?: React.ReactNode
  header?: React.ReactNode
  filter?: (textValue: string, inputValue: string) => boolean
}) {
  const { size } = useDropdownContext()
  const { contains } = useFilter({ sensitivity: "base" })

  return (
    <AriaPopover
      data-slot="dropdown-popover"
      data-size={size}
      className={composeRenderProps(className, (className) =>
        dropdownPanelClasses(size, { animation: "zoom", className })
      )}
      {...props}
    >
      {header != null ? (
        <AriaAutocomplete filter={filter ?? contains}>
          {header}
          {children}
        </AriaAutocomplete>
      ) : (
        children
      )}
    </AriaPopover>
  )
}

function DropdownMenu<T extends object>({
  className,
  ...props
}: AriaMenuProps<T>) {
  const { size } = useDropdownContext()

  return (
    <DropdownContext.Provider
      value={{ size, selectionMode: props.selectionMode }}
    >
      <ScrollArea
        appearance="ghost"
        size="sm"
        className="flex min-h-0 flex-1 flex-col"
      >
        <AriaMenu
          data-slot="dropdown-menu"
          data-size={size}
          className={composeRenderProps(className, (className) =>
            dropdownListClasses(size, { scroll: false, className })
          )}
          {...props}
        />
      </ScrollArea>
    </DropdownContext.Provider>
  )
}

function DropdownSection({
  className,
  ...props
}: React.ComponentProps<typeof AriaMenuSection>) {
  const { size } = useDropdownContext()

  return (
    <AriaMenuSection
      data-slot="dropdown-section"
      data-size={size}
      className={dropdownSectionClasses(size, className)}
      {...props}
    />
  )
}

function DropdownHeader({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AriaHeader>) {
  const { size } = useDropdownContext()

  return (
    <AriaHeader
      data-slot="dropdown-header"
      data-size={size}
      className={dropdownHeaderClasses(size, className)}
      {...props}
    >
      <span className={dropdownHeaderLabelClasses(size)}>{children}</span>
    </AriaHeader>
  )
}

function DropdownMisc({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = useDropdownContext()

  return (
    <div
      data-slot="dropdown-misc"
      data-size={size}
      className={cn(
        "bg-static flex shrink-0 items-center gap-2",
        MISC_PAD[size],
        className
      )}
      {...props}
    />
  )
}

const SEARCH_MISC_PAD: Record<DropdownSize, string> = {
  xs: "p-component-sm pb-component-none",
  sm: "p-component-xs pb-component-none",
  md: "p-component-sm pb-component-none",
}

function DropdownSearch({
  className,
  inputClassName,
  icon = <RiSearch2Line />,
  placeholder = "Search",
  autoFocus = true,
  "aria-label": ariaLabel = "Search",
  "data-slot": dataSlot = "dropdown-search",
  ...props
}: Omit<
  React.ComponentProps<typeof AriaSearchField>,
  "children" | "className"
> & {
  className?: string
  inputClassName?: string
  icon?: React.ReactNode
  placeholder?: string
  "data-slot"?: string
}) {
  const { size } = useDropdownContext()

  return (
    <DropdownMisc data-slot={dataSlot} className={SEARCH_MISC_PAD[size]}>
      <InputProvider size={size}>
        <InputShell>
          <AriaSearchField
            aria-label={ariaLabel}
            autoFocus={autoFocus}
            className={cn(
              "[&>svg]:text-placeholder flex min-h-px min-w-px flex-1 items-center bg-transparent font-medium [&>svg]:shrink-0",
              inputSlotSizeClasses[size],
              className
            )}
            {...props}
          >
            {icon}
            <AriaInput
              placeholder={placeholder}
              className={cn(
                inputVariants({ size }),
                "h-auto p-0",
                inputClassName
              )}
            />
          </AriaSearchField>
        </InputShell>
      </InputProvider>
    </DropdownMisc>
  )
}

function DropdownSeparator({
  className,
  ...props
}: React.ComponentProps<typeof AriaSeparator>) {
  return (
    <AriaSeparator
      data-slot="dropdown-separator"
      className={cn(DROPDOWN_SEPARATOR_CLASSES, className)}
      {...props}
    />
  )
}

type DropdownItemProps = Omit<AriaMenuItemProps, "children"> & {
  variant?: "default" | "danger"
  leading?: React.ReactNode
  description?: React.ReactNode
  trailing?: React.ReactNode
  indicator?: React.ReactNode
  children?:
    | React.ReactNode
    | ((values: MenuItemRenderProps) => React.ReactNode)
}

function DropdownItem({
  className,
  children,
  variant = "default",
  leading,
  description,
  trailing,
  indicator,
  textValue,
  ...props
}: DropdownItemProps) {
  const { size, selectionMode } = useDropdownContext()

  const isRenderProp = typeof children === "function"
  const isStringLabel =
    typeof children === "string" || typeof children === "number"
  const hasSmartProp =
    leading !== undefined ||
    description !== undefined ||
    trailing !== undefined ||
    indicator !== undefined
  const isSmart = !isRenderProp && (hasSmartProp || isStringLabel)

  const resolvedTextValue =
    textValue ?? (isStringLabel ? String(children) : undefined)

  const wrapperClassName = dropdownItemWrapperClasses(size, {
    variant,
    className: className as string,
  })

  const rowClassName = dropdownItemRowClasses(size)

  if (isSmart) {
    return (
      <AriaMenuItem
        data-slot="dropdown-item"
        data-size={size}
        data-variant={variant}
        textValue={resolvedTextValue}
        className={rowClassName}
        {...props}
      >
        {() => (
          <div className={wrapperClassName}>
            <DropdownItemBody
              leading={leading}
              description={description}
              trailing={trailing}
              indicator={indicator}
              showIndicator={Boolean(selectionMode && selectionMode !== "none")}
            >
              {children as React.ReactNode}
            </DropdownItemBody>
          </div>
        )}
      </AriaMenuItem>
    )
  }

  return (
    <AriaMenuItem
      data-slot="dropdown-item"
      data-size={size}
      data-variant={variant}
      textValue={resolvedTextValue}
      className={rowClassName}
      {...props}
    >
      {composeRenderProps(
        children as AriaMenuItemProps["children"],
        (children) => (
          <div className={wrapperClassName}>{children}</div>
        )
      )}
    </AriaMenuItem>
  )
}

function DropdownItemBody({
  leading,
  description,
  trailing,
  indicator,
  showIndicator = true,
  slot = "dropdown",
  children,
}: {
  leading?: React.ReactNode
  description?: React.ReactNode
  trailing?: React.ReactNode
  indicator?: React.ReactNode
  showIndicator?: boolean
  slot?: string
  children?: React.ReactNode
}) {
  return (
    <>
      <DropdownItemContainer>
        {leading}
        {description !== undefined ? (
          <DropdownItemContent>
            <DropdownItemLabel>{children}</DropdownItemLabel>
            <DropdownItemDescription>{description}</DropdownItemDescription>
          </DropdownItemContent>
        ) : (
          <DropdownItemLabel>{children}</DropdownItemLabel>
        )}
      </DropdownItemContainer>
      {trailing ? (
        <span
          data-slot={`${slot}-item-trailing`}
          className="flex shrink-0 items-center"
        >
          {trailing}
        </span>
      ) : null}
      {showIndicator && indicator !== null ? (
        <DropdownItemIndicator>{indicator}</DropdownItemIndicator>
      ) : null}
    </>
  )
}

function DropdownItemLabel({
  className,
  ...props
}: React.ComponentProps<typeof AriaText>) {
  return (
    <AriaText
      slot="label"
      data-slot="dropdown-item-label"
      className={cn("min-w-0 flex-1 truncate", className)}
      {...props}
    />
  )
}

function DropdownItemDescription({
  className,
  ...props
}: React.ComponentProps<typeof AriaText>) {
  const { size } = useDropdownContext()

  return (
    <AriaText
      slot="description"
      data-slot="dropdown-item-description"
      data-size={size}
      className={cn(
        "text-placeholder min-w-0 flex-1 truncate",
        ITEM_DESC_CLASSES[size],
        className
      )}
      {...props}
    />
  )
}

function DropdownItemContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { size } = useDropdownContext()

  return (
    <div
      data-slot="dropdown-item-container"
      data-size={size}
      className={cn(
        "flex min-w-0 flex-1 items-center",
        ITEM_CONTAINER_GAP[size],
        className
      )}
      {...props}
    />
  )
}

function DropdownItemContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-item-content"
      className={cn("flex min-w-0 flex-1 flex-col justify-center", className)}
      {...props}
    />
  )
}

function DropdownItemIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  const { size } = useDropdownContext()

  return (
    <span
      data-slot="dropdown-item-indicator"
      data-size={size}
      className={cn(
        "text-placeholder ml-auto hidden shrink-0 items-center justify-center group-data-[selected]/item:flex",
        ITEM_INDICATOR_SIZE[size],
        className
      )}
      {...props}
    >
      {children ?? <RiCheckLine />}
    </span>
  )
}

function DropdownFooter({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = useDropdownContext()

  return (
    <div
      data-slot="dropdown-footer"
      data-size={size}
      className={dropdownFooterClasses(size, { className })}
      {...props}
    />
  )
}

const DropdownNamespace = Object.assign(Dropdown, {
  Popover: DropdownPopover,
  Menu: DropdownMenu,
  Section: DropdownSection,
  Header: DropdownHeader,
  Misc: DropdownMisc,
  Search: DropdownSearch,
  Separator: DropdownSeparator,
  Item: DropdownItem,
  ItemBody: DropdownItemBody,
  ItemContainer: DropdownItemContainer,
  ItemLabel: DropdownItemLabel,
  ItemDescription: DropdownItemDescription,
  ItemContent: DropdownItemContent,
  ItemIndicator: DropdownItemIndicator,
  Footer: DropdownFooter,
})

export {
  DropdownContext,
  dropdownItemClasses,
  dropdownPanelClasses,
  dropdownListClasses,
  dropdownItemRowClasses,
  dropdownItemWrapperClasses,
  dropdownHeaderClasses,
  dropdownHeaderLabelClasses,
  dropdownSectionClasses,
  dropdownFooterClasses,
  DROPDOWN_SEPARATOR_CLASSES,
  DropdownNamespace as Dropdown,
  DropdownPopover,
  DropdownMenu,
  DropdownSection,
  DropdownHeader,
  DropdownMisc,
  DropdownSearch,
  DropdownSeparator,
  DropdownItem,
  DropdownItemBody,
  DropdownItemContainer,
  DropdownItemLabel,
  DropdownItemDescription,
  DropdownItemContent,
  DropdownItemIndicator,
  DropdownFooter,
}
export type { DropdownSize, DropdownItemProps, DropdownPanelAnimation }
