"use client"

import * as React from "react"
import { RiArrowDownSLine } from "@create-ui/assets/icons"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Autocomplete as AriaAutocomplete,
  Button as AriaButton,
  Header as AriaHeader,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxSection as AriaListBoxSection,
  Popover as AriaPopover,
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
  Separator as AriaSeparator,
  composeRenderProps,
  SelectStateContext,
  useFilter,
  type ListBoxItemProps as AriaListBoxItemProps,
  type PopoverProps as AriaPopoverProps,
  type SelectProps as AriaSelectProps,
  type SelectValueProps as AriaSelectValueProps,
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
  DropdownSearch,
  dropdownSectionClasses,
} from "@/registry/ui/dropdown-menu"
import { useOptionalFieldContext } from "@/registry/ui/field"
import { useInputContext } from "@/registry/ui/input"
import { Spinner } from "@/registry/ui/spinner"

type SelectSize = "xs" | "sm" | "md"
type SelectVariant = "default" | "compact"

type SelectContextValue = {
  size: SelectSize
  variant: SelectVariant
  invalid: boolean
  disabled: boolean
  loading: boolean
  hasShell?: boolean
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

function useSelectContext() {
  return React.useContext(SelectContext)
}

function SelectProvider({
  size,
  variant,
  invalid,
  disabled,
  loading,
  children,
}: {
  size?: SelectSize
  variant?: SelectVariant
  invalid?: boolean
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  const fieldCtx = useOptionalFieldContext()
  const inputCtx = useInputContext()
  const resolvedSize: SelectSize =
    size ??
    (inputCtx?.size as SelectSize) ??
    (fieldCtx?.size as SelectSize) ??
    "sm"
  const resolvedVariant: SelectVariant = variant ?? "default"
  const resolvedInvalid = invalid ?? fieldCtx?.invalid ?? false
  const resolvedDisabled = disabled ?? fieldCtx?.disabled ?? false
  const resolvedLoading = loading ?? false

  const value = React.useMemo<SelectContextValue>(
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
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  )
}

const selectShellVariants = cva(
  [
    // base
    "flex items-center border bg-static shadow-neutral-xs outline-4 outline-transparent",
    // transition (mirrors InputShell)
    "transition-[color,background-color,border-color,outline-color,box-shadow] duration-150 ease-out",
    // focus-visible
    "focus-visible:border-heavy focus-visible:outline-light",
    // data-disabled
    "data-disabled:cursor-not-allowed",
    // has-[trigger:open]
    "has-[>[data-state=open]:not([data-invalid=true]):not([data-loading=true])]:border-heavy has-[>[data-state=open]:not([data-invalid=true]):not([data-loading=true])]:outline-light",
    // has-[invalid]
    "has-[>[data-invalid=true]]:border-error-base has-[>[data-invalid=true]]:outline-error-weak",
    // has-[loading]
    "has-[>[data-loading=true]]:pointer-events-none has-[>[data-loading=true]]:border-info-base has-[>[data-loading=true]]:outline-info-weak",
  ],
  {
    variants: {
      size: {
        xs: "rounded-lg h-8",
        sm: "rounded-xl h-10",
        md: "rounded-2xl h-12",
      },
      variant: {
        default: "w-full",
        compact: "w-fit",
      },
      invalid: {
        true: "",
        false: [
          // base
          "border-weak",
          // hover
          "hover:border-light hover:bg-weakest",
          // has-[loading]
          "has-[>[data-loading=true]]:bg-weakest",
          // has-[invalid]:hover
          "has-[>[data-invalid=true]]:hover:bg-static",
        ],
      },
      disabled: {
        true: "bg-weakest",
        false: "",
      },
    },
    defaultVariants: {
      size: "sm",
      variant: "default",
      invalid: false,
      disabled: false,
    },
  }
)

function SelectShell({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const parentCtx = useSelectContext()
  const ctx = React.useMemo<SelectContextValue>(
    () =>
      parentCtx ?? {
        size: "sm",
        variant: "default",
        invalid: false,
        disabled: false,
        loading: false,
      },
    [parentCtx]
  )

  const shellCtx = React.useMemo<SelectContextValue>(
    () => ({ ...ctx, hasShell: true }),
    [ctx]
  )

  return (
    <SelectContext.Provider value={shellCtx}>
      <div
        data-slot="select-shell"
        data-size={ctx.size}
        data-variant={ctx.variant}
        data-invalid={ctx.invalid || undefined}
        data-disabled={ctx.disabled || undefined}
        data-loading={ctx.loading || undefined}
        role="group"
        className={cn(
          selectShellVariants({
            size: ctx.size,
            variant: ctx.variant,
            invalid: ctx.invalid,
            disabled: ctx.disabled,
          }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SelectContext.Provider>
  )
}

const selectTriggerVariants = cva(
  [
    // base
    "flex flex-1 items-center bg-transparent font-medium text-body cursor-pointer",
    // transition (mirrors the Input control)
    "transition-[color,background-color,border-color,outline-color] duration-150 ease-out",
    // focus
    "focus:outline-none",
    // focus-visible
    "focus-visible:outline-none",
    // data-disabled
    "data-[disabled]:text-disabled data-[disabled]:data-[placeholder]:text-disabled data-[disabled]:[&_svg]:text-disabled",
    // data-invalid
    "data-[invalid=true]:text-error-base data-[invalid=true]:data-[placeholder]:text-error-base data-[invalid=true]:[&_svg]:text-error-base",
    // placeholder
    "data-[placeholder]:text-placeholder",
    // data-[loading=true]
    "data-[loading=true]:[&_svg]:text-disabled",
    // svg
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    // chevron
    "[&>svg:last-child]:rotate-0 [&>svg:last-child]:transition [&>svg:last-child]:duration-200 [&[data-state=open]>svg:last-child]:-rotate-180",
    // select-value
    "[&>[data-slot=select-value]]:line-clamp-1 [&>[data-slot=select-value]]:min-w-0 [&>[data-slot=select-value]]:flex-1 [&>[data-slot=select-value]]:truncate [&>[data-slot=select-value]]:text-left",
    // select-value (cloned item row): strip row chrome so the selected label centers and left-aligns like the placeholder
    "[&>[data-slot=select-value]>*]:min-h-0 [&>[data-slot=select-value]>*]:p-0",
  ],
  {
    variants: {
      size: {
        xs: "px-2 py-1.5 text-ui-control-md [&_svg]:size-5 gap-2 h-8",
        sm: "px-2.5 py-2 text-ui-control-lg [&_svg]:size-5 gap-2 h-10",
        md: "px-3 py-2.5 text-ui-control-xl [&_svg]:size-6 gap-3 h-12",
      },
      variant: {
        default: "w-full justify-between",
        compact: "w-auto flex-none justify-start gap-1",
      },
    },
    defaultVariants: {
      size: "sm",
      variant: "default",
    },
  }
)

const CHEVRON_SIZE: Record<SelectSize, string> = {
  xs: "size-5!",
  sm: "size-5.5!",
  md: "size-6!",
}

function Select<T extends object, M extends "single" | "multiple" = "single">({
  size,
  variant = "default",
  loading,
  isDisabled,
  isInvalid,
  children,
  ...props
}: Omit<AriaSelectProps<T, M>, "children"> & {
  size?: SelectSize
  variant?: SelectVariant
  loading?: boolean
  children?: React.ReactNode
}) {
  const fieldCtx = useOptionalFieldContext()
  const resolvedDisabled = isDisabled ?? fieldCtx?.disabled ?? false
  const resolvedLoading = loading ?? fieldCtx?.loading ?? false
  const resolvedInvalid = isInvalid ?? fieldCtx?.invalid ?? false

  return (
    <SelectProvider
      size={size}
      variant={variant}
      invalid={resolvedInvalid}
      disabled={resolvedDisabled}
      loading={resolvedLoading}
    >
      <AriaSelect
        data-slot="select"
        isDisabled={resolvedDisabled || resolvedLoading}
        isInvalid={resolvedInvalid}
        {...(props as AriaSelectProps<T, M>)}
      >
        {children}
      </AriaSelect>
    </SelectProvider>
  )
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof AriaListBoxSection>) {
  const ctx = useSelectContext()
  const size: SelectSize = ctx?.size ?? "sm"

  return (
    <AriaListBoxSection
      data-slot="select-group"
      className={dropdownSectionClasses(size, className)}
      {...props}
    />
  )
}

function SelectValue<T extends object>({
  className,
  placeholder,
  children,
  ...props
}: Omit<AriaSelectValueProps<T>, "children" | "className"> & {
  className?: string
  placeholder?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <AriaSelectValue
      data-slot="select-value"
      className={cn(className)}
      {...props}
    >
      {(renderProps) =>
        renderProps.isPlaceholder
          ? (placeholder ?? renderProps.defaultChildren)
          : (children ?? renderProps.defaultChildren)
      }
    </AriaSelectValue>
  )
}

function SelectTrigger({
  className,
  size: sizeProp,
  variant: variantProp,
  children,
  ...props
}: Omit<React.ComponentProps<typeof AriaButton>, "className" | "children"> & {
  className?: string
  children?: React.ReactNode
} & VariantProps<typeof selectTriggerVariants>) {
  const ctx = useSelectContext()
  const inputCtx = useInputContext()
  const fieldCtx = useOptionalFieldContext()
  const state = React.useContext(SelectStateContext)
  const isOpen = state?.isOpen ?? false
  const isPlaceholder = (state?.selectedItems?.length ?? 0) === 0

  const { "aria-invalid": ariaInvalidProp, ...restProps } =
    props as typeof props & {
      "aria-invalid"?: boolean | "true" | "false"
    }
  const propInvalid = ariaInvalidProp === true || ariaInvalidProp === "true"

  const resolvedSize: SelectSize =
    (sizeProp as SelectSize | undefined) ??
    ctx?.size ??
    (fieldCtx?.size as SelectSize) ??
    "sm"

  const resolvedVariant: SelectVariant =
    (variantProp as SelectVariant | undefined) ?? ctx?.variant ?? "default"

  const loading = ctx?.loading ?? fieldCtx?.loading ?? false
  const invalid = ctx?.invalid ?? fieldCtx?.invalid ?? false
  const disabled = ctx?.disabled ?? fieldCtx?.disabled ?? false
  const resolvedInvalid = invalid || propInvalid

  const triggerEl = (
    <AriaButton
      data-slot="select-trigger"
      data-size={resolvedSize}
      data-variant={resolvedVariant}
      data-state={isOpen ? "open" : "closed"}
      data-loading={loading || undefined}
      data-invalid={resolvedInvalid || undefined}
      data-placeholder={isPlaceholder || undefined}
      aria-busy={loading || undefined}
      aria-invalid={resolvedInvalid || undefined}
      className={cn(
        selectTriggerVariants({
          size: resolvedSize,
          variant: resolvedVariant,
        }),
        className
      )}
      {...restProps}
    >
      {children}
      {loading ? (
        <Spinner variant="info" size={resolvedSize} />
      ) : (
        <RiArrowDownSLine className={CHEVRON_SIZE[resolvedSize]} />
      )}
    </AriaButton>
  )

  if (ctx?.hasShell || inputCtx?.hasShell) {
    return triggerEl
  }

  return (
    <SelectProvider
      size={resolvedSize}
      variant={resolvedVariant}
      invalid={invalid}
      disabled={disabled}
      loading={loading}
    >
      <SelectShell>{triggerEl}</SelectShell>
    </SelectProvider>
  )
}

function SelectSearch(
  props: Omit<React.ComponentProps<typeof DropdownSearch>, "data-slot">
) {
  return <DropdownSearch data-slot="select-search" {...props} />
}

function SelectContent({
  className,
  children,
  footer,
  header,
  filter,
  renderEmptyState,
  placement = "bottom start",
  offset = 8,
  ...props
}: Omit<AriaPopoverProps, "children"> & {
  className?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  header?: React.ReactNode
  filter?: (textValue: string, inputValue: string) => boolean
  renderEmptyState?: React.ComponentProps<
    typeof AriaListBox
  >["renderEmptyState"]
}) {
  const ctx = useSelectContext()
  const fieldCtx = useOptionalFieldContext()

  const size: SelectSize = ctx?.size ?? (fieldCtx?.size as SelectSize) ?? "sm"
  const { contains } = useFilter({ sensitivity: "base" })

  const panel = (
    <>
      {header}
      <AriaListBox
        data-slot="select-listbox"
        renderEmptyState={renderEmptyState}
        className={dropdownListClasses(size)}
      >
        {children}
      </AriaListBox>
      {footer ? <DropdownFooter>{footer}</DropdownFooter> : null}
    </>
  )

  return (
    <AriaPopover
      data-slot="select-content"
      placement={placement}
      offset={offset}
      className={composeRenderProps(className, (className) =>
        dropdownPanelClasses(size, { animation: "slide", className })
      )}
      {...props}
    >
      <DropdownContext.Provider value={{ size }}>
        {header != null ? (
          <AriaAutocomplete filter={filter ?? contains}>
            {panel}
          </AriaAutocomplete>
        ) : (
          panel
        )}
      </DropdownContext.Provider>
    </AriaPopover>
  )
}

function SelectLabel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AriaHeader>) {
  const ctx = useSelectContext()
  const size: SelectSize = ctx?.size ?? "sm"

  return (
    <AriaHeader
      data-slot="select-label"
      data-size={size}
      className={dropdownHeaderClasses(size, className)}
      {...props}
    >
      <span className={dropdownHeaderLabelClasses(size)}>{children}</span>
    </AriaHeader>
  )
}

type SelectItemProps = Omit<
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

function SelectItem({
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
}: SelectItemProps) {
  const ctx = useSelectContext()
  const size: SelectSize = ctx?.size ?? "sm"

  const rowClassName = dropdownItemRowClasses(size)
  const wrapperClassName = dropdownItemWrapperClasses(size, { className })

  if (typeof children === "function") {
    const renderChildren = children
    return (
      <AriaListBoxItem
        data-slot="select-item"
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
      data-slot="select-item"
      id={id ?? value}
      textValue={resolvedTextValue}
      className={rowClassName}
      {...props}
    >
      {() => (
        <div className={wrapperClassName}>
          <DropdownItemBody
            slot="select"
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

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof AriaSeparator>) {
  return (
    <AriaSeparator
      data-slot="select-separator"
      className={cn(DROPDOWN_SEPARATOR_CLASSES, className)}
      {...props}
    />
  )
}

const SelectNamespace = Object.assign(Select, {
  Provider: SelectProvider,
  Shell: SelectShell,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Content: SelectContent,
  Popover: SelectContent,
  Search: SelectSearch,
  Misc: DropdownMisc,
  Item: SelectItem,
  Section: SelectGroup,
  Group: SelectGroup,
  Label: SelectLabel,
  Separator: SelectSeparator,
  ItemContainer: DropdownItemContainer,
  ItemContent: DropdownItemContent,
  ItemLabel: DropdownItemLabel,
  ItemDescription: DropdownItemDescription,
  ItemIndicator: DropdownItemIndicator,
})

export {
  SelectNamespace as Select,
  SelectProvider,
  SelectShell,
  SelectContent,
  SelectGroup,
  SelectGroup as SelectSection,
  SelectItem,
  SelectLabel,
  SelectSearch,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  DropdownMisc as SelectMisc,
  DropdownItemContainer as SelectItemContainer,
  DropdownItemContent as SelectItemContent,
  DropdownItemLabel as SelectItemLabel,
  DropdownItemDescription as SelectItemDescription,
  DropdownItemIndicator as SelectItemIndicator,
  selectShellVariants,
  selectTriggerVariants,
  useSelectContext,
}
export type { SelectSize, SelectVariant, SelectContextValue, SelectItemProps }
