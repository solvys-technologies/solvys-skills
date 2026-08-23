"use client"

import * as React from "react"
import { RiArrowDownSLine } from "@create-ui/assets/icons"
import {
  Button as AriaButton,
  ComboBox as AriaComboBox,
  Group as AriaGroup,
  Header as AriaHeader,
  Input as AriaInput,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxSection as AriaListBoxSection,
  Popover as AriaPopover,
  Separator as AriaSeparator,
  ComboBoxStateContext,
  composeRenderProps,
  type ComboBoxProps as AriaComboBoxProps,
  type ListBoxItemProps as AriaListBoxItemProps,
  type PopoverProps as AriaPopoverProps,
  type Key,
  type ListBoxItemRenderProps,
} from "react-aria-components"

import { cn } from "@/registry/lib/utils"
import {
  DROPDOWN_SEPARATOR_CLASSES,
  DropdownContext,
  DropdownFooter,
  dropdownHeaderClasses,
  dropdownHeaderLabelClasses,
  DropdownItemBody,
  DropdownItemContainer,
  DropdownItemContent,
  DropdownItemDescription,
  DropdownItemIndicator,
  DropdownItemLabel,
  dropdownItemRowClasses,
  dropdownItemWrapperClasses,
  dropdownListClasses,
  DropdownMisc,
  dropdownPanelClasses,
  dropdownSectionClasses,
} from "@/registry/ui/dropdown-menu"
import { useOptionalFieldContext } from "@/registry/ui/field"
import {
  InputProvider,
  InputShell,
  inputSlotSizeClasses,
  inputVariants,
} from "@/registry/ui/input"
import { Spinner } from "@/registry/ui/spinner"

type ComboboxSize = "xs" | "sm" | "md"
type ComboboxVariant = "default" | "compact"

type ComboboxContextValue = {
  size: ComboboxSize
  variant: ComboboxVariant
  invalid: boolean
  disabled: boolean
  loading: boolean
}

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null)

function useComboboxContext() {
  return React.useContext(ComboboxContext)
}

function ComboboxProvider({
  size,
  variant,
  invalid,
  disabled,
  loading,
  children,
}: {
  size?: ComboboxSize
  variant?: ComboboxVariant
  invalid?: boolean
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  const fieldCtx = useOptionalFieldContext()
  const resolvedSize: ComboboxSize =
    size ?? (fieldCtx?.size as ComboboxSize) ?? "sm"
  const resolvedVariant: ComboboxVariant = variant ?? "default"
  const resolvedInvalid = invalid ?? fieldCtx?.invalid ?? false
  const resolvedDisabled = disabled ?? fieldCtx?.disabled ?? false
  const resolvedLoading = loading ?? false

  const value = React.useMemo<ComboboxContextValue>(
    () => ({
      size: resolvedSize,
      variant: resolvedVariant,
      invalid: resolvedInvalid,
      disabled: resolvedDisabled,
      loading: resolvedLoading,
    }),
    [
      resolvedSize,
      resolvedVariant,
      resolvedInvalid,
      resolvedDisabled,
      resolvedLoading,
    ]
  )

  return (
    <ComboboxContext.Provider value={value}>
      {children}
    </ComboboxContext.Provider>
  )
}

function Combobox<T extends object>({
  size,
  variant = "default",
  loading,
  isDisabled,
  isInvalid,
  className,
  children,
  ...props
}: Omit<AriaComboBoxProps<T>, "children" | "className"> & {
  size?: ComboboxSize
  variant?: ComboboxVariant
  loading?: boolean
  className?: string
  children?: React.ReactNode
}) {
  const fieldCtx = useOptionalFieldContext()
  const resolvedDisabled = isDisabled ?? fieldCtx?.disabled ?? false
  const resolvedLoading = loading ?? fieldCtx?.loading ?? false
  const resolvedInvalid = isInvalid ?? fieldCtx?.invalid ?? false

  return (
    <ComboboxProvider
      size={size}
      variant={variant}
      invalid={resolvedInvalid}
      disabled={resolvedDisabled}
      loading={resolvedLoading}
    >
      <AriaComboBox
        data-slot="combobox"
        isDisabled={resolvedDisabled || resolvedLoading}
        isInvalid={resolvedInvalid}
        className={composeRenderProps(className, (className) =>
          cn(variant === "compact" ? "w-fit" : "w-full", className)
        )}
        {...(props as AriaComboBoxProps<T>)}
      >
        {children}
      </AriaComboBox>
    </ComboboxProvider>
  )
}

const CHEVRON_SIZE: Record<ComboboxSize, string> = {
  xs: "size-5",
  sm: "size-5.5",
  md: "size-6",
}

function ComboboxInput({
  className,
  inputClassName,
  startContent,
  endContent,
  onClick,
  ...props
}: Omit<React.ComponentProps<typeof AriaInput>, "className"> & {
  className?: string
  inputClassName?: string
  startContent?: React.ReactNode
  endContent?: React.ReactNode
}) {
  const ctx = useComboboxContext()
  const size: ComboboxSize = ctx?.size ?? "sm"
  const variant: ComboboxVariant = ctx?.variant ?? "default"
  const invalid = ctx?.invalid ?? false
  const disabled = ctx?.disabled ?? false
  const loading = ctx?.loading ?? false
  const state = React.useContext(ComboBoxStateContext)
  const isOpen = state?.isOpen ?? false

  return (
    <InputProvider
      size={size}
      invalid={invalid}
      disabled={disabled}
      loading={loading}
    >
      <AriaGroup
        data-slot="combobox-group-anchor"
        className={cn(variant === "compact" ? "w-fit" : "w-full")}
      >
        <InputShell className={cn(variant === "compact" && "w-fit", className)}>
          <div
            data-slot="combobox-input-row"
            className={cn(
              "[&>svg]:text-placeholder flex min-w-px flex-1 items-center [&>svg]:shrink-0",
              inputSlotSizeClasses[size],
              invalid && "[&>svg]:text-error-base",
              disabled && "[&>svg]:text-disabled"
            )}
          >
            {startContent}
            <AriaInput
              data-slot="combobox-input"
              className={cn(
                inputVariants({ size }),
                "h-auto flex-1 p-0",
                inputClassName
              )}
              onClick={(event) => {
                onClick?.(event)
                if (event.defaultPrevented) return
                if (!state || state.isOpen || event.currentTarget.readOnly)
                  return
                state.open(null, "manual")
              }}
              {...props}
            />
            {endContent}
            {loading ? (
              <Spinner variant="info" size={size} />
            ) : (
              <AriaButton
                data-slot="combobox-trigger"
                data-state={isOpen ? "open" : "closed"}
                excludeFromTabOrder
                className="text-placeholder data-[disabled]:text-disabled flex shrink-0 cursor-pointer items-center justify-center outline-hidden data-[disabled]:cursor-not-allowed"
              >
                <RiArrowDownSLine
                  data-slot="combobox-chevron"
                  className={cn(
                    "transition-transform duration-200",
                    CHEVRON_SIZE[size],
                    isOpen && "-rotate-180"
                  )}
                />
              </AriaButton>
            )}
          </div>
        </InputShell>
      </AriaGroup>
    </InputProvider>
  )
}

function ComboboxContent<T extends object>({
  className,
  children,
  footer,
  renderEmptyState,
  placement = "bottom start",
  offset = 8,
  ...props
}: Omit<AriaPopoverProps, "children"> & {
  className?: string
  children?: React.ReactNode | ((item: T) => React.ReactNode)
  footer?: React.ReactNode
  renderEmptyState?: React.ComponentProps<
    typeof AriaListBox
  >["renderEmptyState"]
}) {
  const ctx = useComboboxContext()
  const fieldCtx = useOptionalFieldContext()
  const size: ComboboxSize =
    ctx?.size ?? (fieldCtx?.size as ComboboxSize) ?? "sm"

  return (
    <AriaPopover
      data-slot="combobox-content"
      placement={placement}
      offset={offset}
      className={composeRenderProps(className, (className) =>
        dropdownPanelClasses(size, { animation: "slide", className })
      )}
      {...props}
    >
      <DropdownContext.Provider value={{ size }}>
        <AriaListBox
          data-slot="combobox-listbox"
          renderEmptyState={renderEmptyState}
          className={dropdownListClasses(size)}
        >
          {children}
        </AriaListBox>
        {footer ? <DropdownFooter>{footer}</DropdownFooter> : null}
      </DropdownContext.Provider>
    </AriaPopover>
  )
}

function ComboboxGroup({
  className,
  ...props
}: React.ComponentProps<typeof AriaListBoxSection>) {
  const ctx = useComboboxContext()
  const size: ComboboxSize = ctx?.size ?? "sm"

  return (
    <AriaListBoxSection
      data-slot="combobox-group"
      className={dropdownSectionClasses(size, className)}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AriaHeader>) {
  const ctx = useComboboxContext()
  const size: ComboboxSize = ctx?.size ?? "sm"

  return (
    <AriaHeader
      data-slot="combobox-label"
      data-size={size}
      className={dropdownHeaderClasses(size, className)}
      {...props}
    >
      <span className={dropdownHeaderLabelClasses(size)}>{children}</span>
    </AriaHeader>
  )
}

type ComboboxItemProps = Omit<
  AriaListBoxItemProps<object>,
  "value" | "id" | "children" | "className"
> & {
  className?: string
  value?: Key
  id?: Key
  leading?: React.ReactNode
  description?: React.ReactNode
  trailing?: React.ReactNode
  indicator?: React.ReactNode
  children?:
    | React.ReactNode
    | ((values: ListBoxItemRenderProps) => React.ReactNode)
}

function ComboboxItem({
  className,
  children,
  value,
  id,
  leading,
  description,
  trailing,
  indicator,
  textValue,
  ...props
}: ComboboxItemProps) {
  const ctx = useComboboxContext()
  const size: ComboboxSize = ctx?.size ?? "sm"

  const rowClassName = dropdownItemRowClasses(size)
  const wrapperClassName = dropdownItemWrapperClasses(size, { className })

  if (typeof children === "function") {
    const renderChildren = children
    return (
      <AriaListBoxItem
        data-slot="combobox-item"
        id={id ?? value}
        textValue={textValue}
        className={rowClassName}
        {...props}
      >
        {(renderProps) => (
          <div className={wrapperClassName}>{renderChildren(renderProps)}</div>
        )}
      </AriaListBoxItem>
    )
  }

  const childArray = React.Children.toArray(children)
  const legacyLeading =
    leading === undefined &&
    childArray.length > 1 &&
    React.isValidElement(childArray[0])
      ? childArray[0]
      : undefined
  const resolvedLeading = leading ?? legacyLeading
  const label = legacyLeading ? childArray.slice(1) : children

  const labelNodes = React.Children.toArray(label)
  const resolvedTextValue =
    textValue ??
    (labelNodes.length > 0 &&
    labelNodes.every(
      (node) => typeof node === "string" || typeof node === "number"
    )
      ? labelNodes.join("")
      : undefined)

  return (
    <AriaListBoxItem
      data-slot="combobox-item"
      id={id ?? value}
      textValue={resolvedTextValue}
      className={rowClassName}
      {...props}
    >
      {() => (
        <div className={wrapperClassName}>
          <DropdownItemBody
            slot="combobox"
            leading={resolvedLeading}
            description={description}
            trailing={trailing}
            indicator={indicator}
          >
            {label}
          </DropdownItemBody>
        </div>
      )}
    </AriaListBoxItem>
  )
}

function ComboboxSeparator({
  className,
  ...props
}: React.ComponentProps<typeof AriaSeparator>) {
  return (
    <AriaSeparator
      data-slot="combobox-separator"
      className={cn(DROPDOWN_SEPARATOR_CLASSES, className)}
      {...props}
    />
  )
}

const ComboboxNamespace = Object.assign(Combobox, {
  Provider: ComboboxProvider,
  Input: ComboboxInput,
  Content: ComboboxContent,
  Popover: ComboboxContent,
  Misc: DropdownMisc,
  Item: ComboboxItem,
  Section: ComboboxGroup,
  Group: ComboboxGroup,
  Label: ComboboxLabel,
  Separator: ComboboxSeparator,
  Footer: DropdownFooter,
  ItemContainer: DropdownItemContainer,
  ItemContent: DropdownItemContent,
  ItemLabel: DropdownItemLabel,
  ItemDescription: DropdownItemDescription,
  ItemIndicator: DropdownItemIndicator,
})

export {
  ComboboxNamespace as Combobox,
  ComboboxProvider,
  ComboboxInput,
  ComboboxContent,
  ComboboxGroup,
  ComboboxGroup as ComboboxSection,
  ComboboxLabel,
  ComboboxItem,
  ComboboxSeparator,
  DropdownMisc as ComboboxMisc,
  DropdownFooter as ComboboxFooter,
  DropdownItemContainer as ComboboxItemContainer,
  DropdownItemContent as ComboboxItemContent,
  DropdownItemLabel as ComboboxItemLabel,
  DropdownItemDescription as ComboboxItemDescription,
  DropdownItemIndicator as ComboboxItemIndicator,
  useComboboxContext,
}
export type {
  ComboboxSize,
  ComboboxVariant,
  ComboboxContextValue,
  ComboboxItemProps,
}
