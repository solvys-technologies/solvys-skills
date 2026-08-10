"use client"

import * as React from "react"
import {
  RiArrowLeftDoubleFill,
  RiArrowLeftSLine,
  RiArrowRightDoubleFill,
  RiArrowRightSLine,
} from "@create-ui/assets/icons"

import { cn } from "@/registry/lib/utils"
import { Button, buttonVariants } from "@/registry/ui/button"
import {
  ButtonGroup,
  ButtonGroupItem,
  buttonGroupItemVariants,
} from "@/registry/ui/button-group"

type PaginationVariant = "compact" | "compact-grouped"
type PaginationShape = "rounded" | "pill"

type PaginationContextValue = {
  variant: PaginationVariant
  shape: PaginationShape

  grouped: boolean
}

const PaginationContext = React.createContext<PaginationContextValue>({
  variant: "compact-grouped",
  shape: "rounded",
  grouped: true,
})

function usePaginationContext() {
  return React.useContext(PaginationContext)
}

const pillPad = (shape: PaginationShape) =>
  shape === "pill" ? "px-1.5" : undefined

const STATIC_CHIP = cn(
  buttonGroupItemVariants({ variant: "soft", size: "md", iconOnly: false }),
  "hover:bg-static cursor-default"
)
const MOBILE_COMPACT = cn(
  "[&_[data-slot=pagination-ellipsis]]:max-md:hidden",
  "[&_[data-slot=pagination-link]:nth-child(n+5_of_[data-slot=pagination-link])]:max-md:hidden"
)

function useControllable<T>(
  controlled: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): [T, (value: T) => void] {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const isControlled = controlled !== undefined
  const value = isControlled ? controlled : uncontrolled
  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )
  return [value, setValue]
}

function getPaginationRange(
  current: number,
  total: number,
  siblingCount = 1,
  boundaryCount = 1,
  min = 1
): (number | "ellipsis")[] {
  const items: (number | "ellipsis")[] = []
  for (let page = min; page <= total; page++) {
    const inBoundary =
      page < min + boundaryCount || page > total - boundaryCount
    const inSiblings =
      page >= current - siblingCount && page <= current + siblingCount
    if (inBoundary || inSiblings) {
      items.push(page)
    } else if (items[items.length - 1] !== "ellipsis") {
      items.push("ellipsis")
    }
  }
  return items
}

type PaginationBaseProps = Omit<React.ComponentProps<"nav">, "children"> & {
  variant?: PaginationVariant
  shape?: PaginationShape
}

type PaginationAutoProps = PaginationBaseProps & {
  totalPages: number
  page?: number
  defaultPage?: number
  onPageChange?: (page: number) => void
  minPage?: number
  getPageHref?: (page: number) => string
  siblingCount?: number
  boundaryCount?: number
  children?: never
}

type PaginationCompoundProps = PaginationBaseProps & {
  children: React.ReactNode
  totalPages?: never
  page?: never
  defaultPage?: never
  onPageChange?: never
  minPage?: never
  getPageHref?: never
  siblingCount?: never
  boundaryCount?: never
}

type PaginationProps = PaginationAutoProps | PaginationCompoundProps

function Pagination({
  className,
  variant = "compact-grouped",
  shape = "rounded",
  children,
  page,
  defaultPage,
  onPageChange,
  totalPages,
  minPage = 1,
  getPageHref,
  siblingCount = 1,
  boundaryCount = 1,
  ...props
}: PaginationProps) {
  const grouped = variant === "compact-grouped"
  const ctx = React.useMemo(
    () => ({ variant, shape, grouped }),
    [variant, shape, grouped]
  )

  const [currentPage, setCurrentPage] = useControllable(
    page,
    defaultPage ?? minPage,
    onPageChange
  )

  const navigate = React.useCallback(
    (target: number) => {
      if (Number.isNaN(target) || totalPages == null) return
      const clamped = Math.min(Math.max(target, minPage), totalPages)

      if (clamped !== currentPage) setCurrentPage(clamped)
    },
    [minPage, totalPages, currentPage, setCurrentPage]
  )

  const safePage =
    totalPages != null
      ? Math.min(Math.max(currentPage, minPage), totalPages)
      : currentPage

  return (
    <PaginationContext.Provider value={ctx}>
      <nav
        role="navigation"
        aria-label="pagination"
        data-slot="pagination"
        data-variant={variant}
        data-shape={shape}
        className={cn(
          "inline-flex items-center justify-center",
          MOBILE_COMPACT,
          className
        )}
        {...props}
      >
        {children == null && totalPages != null ? (
          <>
            <AutoPaginationBody
              currentPage={safePage}
              totalPages={totalPages}
              minPage={minPage}
              items={getPaginationRange(
                safePage,
                totalPages,
                siblingCount,
                boundaryCount,
                minPage
              )}
              navigate={navigate}
              getPageHref={getPageHref}
            />
            {!getPageHref && (
              <span
                className="sr-only"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                Page {safePage} of {totalPages}
              </span>
            )}
          </>
        ) : (
          children
        )}
      </nav>
    </PaginationContext.Provider>
  )
}

type PaginationActionComponent = React.ComponentType<PaginationButtonProps>

type AutoPaginationBodyProps = {
  currentPage: number
  totalPages: number
  minPage: number
  items: (number | "ellipsis")[]
  navigate: (target: number) => void
  getPageHref?: (page: number) => string
}

function AutoPaginationBody({
  currentPage,
  totalPages,
  minPage,
  items,
  navigate,
  getPageHref,
}: AutoPaginationBodyProps) {
  const atStart = currentPage <= minPage
  const atEnd = currentPage >= totalPages

  const action = (
    Comp: PaginationActionComponent,
    target: number,
    disabled: boolean
  ) => {
    if (getPageHref) {
      return disabled ? (
        <Comp disabled />
      ) : (
        <Comp asChild>
          <a href={getPageHref(target)} />
        </Comp>
      )
    }
    return (
      <Comp
        disabled={disabled}
        onClick={disabled ? undefined : () => navigate(target)}
      />
    )
  }

  const links = items.map((item, index) =>
    item === "ellipsis" ? (
      <PaginationEllipsis key={`ellipsis-${index}`} />
    ) : getPageHref ? (
      <PaginationLink key={item} isActive={item === currentPage} asChild>
        <a href={getPageHref(item)}>{item}</a>
      </PaginationLink>
    ) : (
      <PaginationLink
        key={item}
        isActive={item === currentPage}
        onClick={() => navigate(item)}
      >
        {item}
      </PaginationLink>
    )
  )

  return (
    <PaginationContent>
      {action(PaginationFirst, minPage, atStart)}
      {action(PaginationPrevious, currentPage - 1, atStart)}
      {links}
      {action(PaginationNext, currentPage + 1, atEnd)}
      {action(PaginationLast, totalPages, atEnd)}
    </PaginationContent>
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { shape, grouped } = usePaginationContext()

  if (grouped) {
    return (
      <ButtonGroup
        data-slot="pagination-content"
        variant="soft"
        shape={shape}
        size="md"
        className={className}
        {...props}
      />
    )
  }

  return (
    <div
      data-slot="pagination-content"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

type PaginationButtonProps = Omit<React.ComponentProps<"button">, "type"> & {
  asChild?: boolean
}

type PaginationLinkProps = PaginationButtonProps & {
  isActive?: boolean
}

function PaginationLink({
  className,
  isActive,
  asChild,
  disabled,
  children,
  ...props
}: PaginationLinkProps) {
  const { shape, grouped } = usePaginationContext()

  if (grouped) {
    return (
      <ButtonGroupItem
        data-slot="pagination-link"
        variant="soft"
        size="md"
        active={isActive}
        asChild={asChild}
        disabled={disabled}
        className={className}
        {...props}
        aria-current={isActive ? "page" : undefined}
        aria-pressed={undefined}
      >
        {children}
      </ButtonGroupItem>
    )
  }

  return (
    <Button
      data-slot="pagination-link"
      variant="neutral-solid"
      appearance="ghost"
      size="md"
      shape={shape}
      asChild={asChild}
      disabled={disabled}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        isActive ? "bg-weak hover:bg-weak" : "hover:bg-weakest",
        pillPad(shape),
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

type PaginationActionProps = PaginationButtonProps & {
  dataSlot: string
  ariaLabel: string
  defaultIcon: React.ReactNode
}

function PaginationAction({
  className,
  asChild,
  children,
  dataSlot,
  ariaLabel,
  defaultIcon,
  disabled,
  ...props
}: PaginationActionProps) {
  const { shape, grouped } = usePaginationContext()
  const icon = asChild ? defaultIcon : (children ?? defaultIcon)
  const slot =
    asChild && React.isValidElement<{ children?: React.ReactNode }>(children)
      ? children
      : null

  if (grouped) {
    const groupedChild = slot ? React.cloneElement(slot, undefined, icon) : icon
    return (
      <ButtonGroupItem
        data-slot={dataSlot}
        aria-label={ariaLabel}
        variant="soft"
        size="md"
        iconOnly
        asChild={asChild}
        disabled={disabled}
        className={className}
        {...props}
      >
        {groupedChild}
      </ButtonGroupItem>
    )
  }

  return (
    <Button
      data-slot={dataSlot}
      aria-label={ariaLabel}
      variant="neutral-solid"
      appearance="ghost"
      size="md"
      shape={shape}
      iconOnly
      asChild={asChild}
      disabled={disabled}
      className={className}
      {...props}
    >
      {slot ? React.cloneElement(slot, undefined, icon) : icon}
    </Button>
  )
}

function PaginationFirst(props: PaginationButtonProps) {
  return (
    <PaginationAction
      dataSlot="pagination-first"
      ariaLabel="Go to first page"
      defaultIcon={<RiArrowLeftDoubleFill />}
      {...props}
    />
  )
}

function PaginationPrevious(props: PaginationButtonProps) {
  return (
    <PaginationAction
      dataSlot="pagination-previous"
      ariaLabel="Go to previous page"
      defaultIcon={<RiArrowLeftSLine />}
      {...props}
    />
  )
}

function PaginationNext(props: PaginationButtonProps) {
  return (
    <PaginationAction
      dataSlot="pagination-next"
      ariaLabel="Go to next page"
      defaultIcon={<RiArrowRightSLine />}
      {...props}
    />
  )
}

function PaginationLast(props: PaginationButtonProps) {
  return (
    <PaginationAction
      dataSlot="pagination-last"
      ariaLabel="Go to last page"
      defaultIcon={<RiArrowRightDoubleFill />}
      {...props}
    />
  )
}

function PaginationEllipsis({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  const { shape, grouped } = usePaginationContext()

  if (grouped) {
    return (
      <span
        data-slot="pagination-ellipsis"
        className={cn(STATIC_CHIP, className)}
        {...props}
      >
        <span className="px-component-xs inline-flex items-center justify-center gap-1.5">
          <span aria-hidden="true">{children ?? "..."}</span>
          <span className="sr-only">More pages</span>
        </span>
      </span>
    )
  }

  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn(
        buttonVariants({
          variant: "neutral-solid",
          appearance: "ghost",
          size: "md",
          shape,
        }),
        "cursor-default hover:bg-transparent",
        pillPad(shape),
        className
      )}
      {...props}
    >
      <span className="px-component-xs" aria-hidden="true">
        {children ?? "..."}
      </span>
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationFirst,
  PaginationPrevious,
  PaginationNext,
  PaginationLast,
  PaginationEllipsis,
  getPaginationRange,
}

export type { PaginationProps, PaginationVariant, PaginationShape }
