"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { createPortal } from "react-dom"

import { cn } from "@/registry/lib/utils"
import { Button } from "@/registry/ui/button"
import { CloseButton } from "@/registry/ui/close-button"

type ToastContextValue = {
  variant:
    | "primary"
    | "neutral"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "away"
  appearance: "solid" | "soft" | "outline" | "default"
  dismiss: () => void
}

const ToastContext = React.createContext<ToastContextValue>({
  variant: "primary",
  appearance: "solid",
  dismiss: () => {},
})

function useToastContext() {
  return React.useContext(ToastContext)
}

const toastVariants = cva(
  "relative flex min-w-[300px] w-full lg:w-[410px] items-start gap-4 rounded-xl overflow-clip border border-transparent p-component-md",
  {
    variants: {
      variant: {
        primary: "",
        neutral: "",
        danger: "",
        success: "",
        warning: "",
        info: "",
        away: "",
      },
      appearance: {
        solid: "text-static",
        soft: "text-strongest backdrop-blur-3xl",
        outline: "bg-static",
        default: "bg-weakest border-light shadow-neutral-xs text-strongest",
      },
    },
    compoundVariants: [
      // --- Solid ---
      {
        variant: "primary",
        appearance: "solid",
        className: "bg-primary-strong",
      },
      {
        variant: "neutral",
        appearance: "solid",
        className: "bg-stable-strong",
      },
      { variant: "danger", appearance: "solid", className: "bg-error-strong" },
      {
        variant: "success",
        appearance: "solid",
        className: "bg-success-strong",
      },
      {
        variant: "warning",
        appearance: "solid",
        className: "bg-warning-strong",
      },
      { variant: "info", appearance: "solid", className: "bg-info-strong" },
      { variant: "away", appearance: "solid", className: "bg-away-strong" },

      // --- Soft ---
      {
        variant: "primary",
        appearance: "soft",
        className: "bg-primary-weakest",
      },
      {
        variant: "neutral",
        appearance: "soft",
        className: "bg-stable-weakest",
      },
      { variant: "danger", appearance: "soft", className: "bg-error-weakest" },
      {
        variant: "success",
        appearance: "soft",
        className: "bg-success-weakest",
      },
      {
        variant: "warning",
        appearance: "soft",
        className: "bg-warning-weakest",
      },
      { variant: "info", appearance: "soft", className: "bg-info-weakest" },
      { variant: "away", appearance: "soft", className: "bg-away-weakest" },

      // --- Outline ---
      {
        variant: "primary",
        appearance: "outline",
        className: "border-primary-weakest text-primary-strong",
      },
      {
        variant: "neutral",
        appearance: "outline",
        className: "border-stable-weak text-stable-strong",
      },
      {
        variant: "danger",
        appearance: "outline",
        className: "border-error-weak text-error-strong",
      },
      {
        variant: "success",
        appearance: "outline",
        className: "border-success-weak text-success-strong",
      },
      {
        variant: "warning",
        appearance: "outline",
        className: "border-warning-weak text-warning-strong",
      },
      {
        variant: "info",
        appearance: "outline",
        className: "border-info-weak text-info-strong",
      },
      {
        variant: "away",
        appearance: "outline",
        className: "border-away-weak text-away-strong",
      },
    ],
    defaultVariants: {
      variant: "primary",
      appearance: "solid",
    },
  }
)

type Variant = ToastContextValue["variant"]
type Appearance = ToastContextValue["appearance"]

const progressTrackColors: Record<Appearance, Record<Variant, string>> = {
  solid: {
    primary: "bg-primary-800",
    neutral: "bg-neutral-800",
    danger: "bg-red-800",
    success: "bg-green-800",
    warning: "bg-orange-800",
    info: "bg-blue-800",
    away: "bg-yellow-800",
  },
  soft: {
    primary: "bg-primary-weak",
    neutral: "bg-stable-weak",
    danger: "bg-error-weak",
    success: "bg-success-weak",
    warning: "bg-warning-weak",
    info: "bg-info-weak",
    away: "bg-away-weak",
  },
  outline: {
    primary: "bg-primary-alpha-16",
    neutral: "bg-neutral-alpha-16",
    danger: "bg-red-alpha-16",
    success: "bg-green-alpha-16",
    warning: "bg-orange-alpha-16",
    info: "bg-blue-alpha-16",
    away: "bg-yellow-alpha-16",
  },
  default: {
    primary: "bg-weak",
    neutral: "bg-weak",
    danger: "bg-weak",
    success: "bg-weak",
    warning: "bg-weak",
    info: "bg-weak",
    away: "bg-weak",
  },
}

const progressIndicatorColors: Record<Appearance, Record<Variant, string>> = {
  solid: {
    primary: "bg-primary-200",
    neutral: "bg-neutral-200",
    danger: "bg-red-200",
    success: "bg-green-200",
    warning: "bg-orange-200",
    info: "bg-blue-200",
    away: "bg-yellow-200",
  },
  soft: {
    primary: "bg-primary-base",
    neutral: "bg-stable-base",
    danger: "bg-error-base",
    success: "bg-success-base",
    warning: "bg-warning-base",
    info: "bg-info-base",
    away: "bg-away-base",
  },
  outline: {
    primary: "bg-primary-base",
    neutral: "bg-stable-base",
    danger: "bg-error-base",
    success: "bg-success-base",
    warning: "bg-warning-base",
    info: "bg-info-base",
    away: "bg-away-base",
  },
  default: {
    primary: "bg-primary-base",
    neutral: "bg-stable-base",
    danger: "bg-error-base",
    success: "bg-success-base",
    warning: "bg-warning-base",
    info: "bg-info-base",
    away: "bg-away-base",
  },
}

const iconColors: Record<Appearance, Record<Variant, string>> = {
  solid: {
    primary: "text-static",
    neutral: "text-static",
    danger: "text-static",
    success: "text-static",
    warning: "text-static",
    info: "text-static",
    away: "text-static",
  },
  soft: {
    primary: "text-primary-strong",
    neutral: "text-body",
    danger: "text-error-strong",
    success: "text-success-strong",
    warning: "text-warning-strong",
    info: "text-info-strong",
    away: "text-away-strong",
  },
  outline: {
    primary: "text-primary-strong",
    neutral: "text-body",
    danger: "text-error-strong",
    success: "text-success-strong",
    warning: "text-warning-strong",
    info: "text-info-strong",
    away: "text-away-strong",
  },
  default: {
    primary: "text-primary-base",
    neutral: "text-stable-base",
    danger: "text-error-base",
    success: "text-success-base",
    warning: "text-warning-base",
    info: "text-info-base",
    away: "text-away-base",
  },
}

type ToastProps = React.ComponentProps<"div"> &
  VariantProps<typeof toastVariants>

/** Exit transition length. Keep in sync with `duration-300` on the root. */
const TOAST_EXIT_MS = 300

function Toast({
  className,
  variant = "primary",
  appearance = "solid",
  children,
  onDismiss,
  ...props
}: ToastProps & { onDismiss?: () => void }) {
  const [dismissed, setDismissed] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)

  // Kept in a ref so `retire` stays stable: it is called from a transition
  // handler and a timeout, both of which run after the latest render.
  const onDismissRef = React.useRef(onDismiss)
  React.useEffect(() => {
    onDismissRef.current = onDismiss
  })

  const dismiss = React.useCallback(() => {
    setDismissed(true)
  }, [])

  // `transitionend` fires once per animated property, so retire the entry on
  // whichever lands first and ignore the rest.
  const retiredRef = React.useRef(false)
  const retire = React.useCallback(() => {
    if (retiredRef.current) return
    retiredRef.current = true
    setHidden(true)
    onDismissRef.current?.()
  }, [])

  // `transitionend` is not a guarantee: a reduced-motion user gets no
  // transition at all and a backgrounded tab never fires one. Without this
  // fallback the entry would never leave the caller's list — inside the queue
  // that means a toast stuck on screen forever.
  React.useEffect(() => {
    if (!dismissed) return
    const timer = setTimeout(retire, TOAST_EXIT_MS + 50)
    return () => clearTimeout(timer)
  }, [dismissed, retire])

  const handleTransitionEnd = React.useCallback(
    (event: React.TransitionEvent<HTMLDivElement>) => {
      // The event bubbles: the close button's hover tween and the progress
      // bar's countdown both reach this handler and would cut the exit short.
      if (event.target !== event.currentTarget) return
      if (dismissed) retire()
    },
    [dismissed, retire]
  )

  if (hidden) return null

  return (
    <ToastContext.Provider
      value={{ variant: variant!, appearance: appearance!, dismiss }}
    >
      <div
        data-slot="toast"
        data-variant={variant}
        data-appearance={appearance}
        data-dismissed={dismissed || undefined}
        role="status"
        className={cn(
          toastVariants({ variant, appearance }),
          "transition-all duration-300 ease-out",
          dismissed && "scale-95 opacity-0",
          className
        )}
        onTransitionEnd={handleTransitionEnd}
        {...props}
      >
        {children}
      </div>
    </ToastContext.Provider>
  )
}

function ToastBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toast-body"
      className={cn("flex min-w-0 flex-1 items-start gap-2", className)}
      {...props}
    />
  )
}

function ToastIcon({ className, ...props }: React.ComponentProps<"span">) {
  const { variant, appearance } = useToastContext()

  return (
    <span
      data-slot="toast-icon"
      className={cn(
        "shrink-0 [&_svg]:size-5",
        iconColors[appearance]?.[variant],
        className
      )}
      {...props}
    />
  )
}

function ToastContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toast-content"
      className={cn("flex min-w-0 flex-1 flex-col", className)}
      {...props}
    />
  )
}

function ToastTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="toast-title"
      className={cn("text-ui-control-md font-semibold", className)}
      {...props}
    />
  )
}

function ToastDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { appearance } = useToastContext()

  return (
    <p
      data-slot="toast-description"
      className={cn(
        "text-paragraph-xs",
        (appearance === "default" || appearance === "soft") && "text-body",
        className
      )}
      {...props}
    />
  )
}
type ActionButtonProps = Pick<
  React.ComponentProps<typeof Button>,
  "variant" | "appearance"
>

const actionButtonMap: Record<
  ToastContextValue["appearance"],
  ActionButtonProps
> = {
  default: { variant: "neutral-light", appearance: "outline" },
  solid: { variant: "neutral-light", appearance: "soft" },
  soft: { variant: "neutral-light", appearance: "outline" },
  outline: { variant: "neutral-light", appearance: "outline" },
}

function ToastAction({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { appearance } = useToastContext()
  const buttonVariant = appearance === "solid" ? "soft" : "outline"

  return (
    <Button
      data-slot="toast-action"
      variant="neutral-light"
      appearance={buttonVariant}
      size="xs"
      shape="rounded"
      className={cn("shrink-0", className)}
      {...props}
    />
  )
}

function ToastClose({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof CloseButton>) {
  const { appearance, dismiss } = useToastContext()
  const closeVariant = appearance === "solid" ? "inverse" : "neutral"

  return (
    <CloseButton
      data-slot="toast-close"
      variant={closeVariant}
      appearance="soft"
      size="md"
      shape="pill"
      className={cn("shrink-0", className)}
      onClick={(e) => {
        dismiss()
        onClick?.(e)
      }}
      {...props}
    />
  )
}

type ToastProgressProps = React.ComponentProps<"div"> & {
  value: number
  duration?: number
}

function ToastProgress({
  className,
  value,
  duration = 150,
  ...props
}: ToastProgressProps) {
  const { variant, appearance } = useToastContext()

  const trackColor = progressTrackColors[appearance]?.[variant] ?? "bg-weak"
  const indicatorColor =
    progressIndicatorColors[appearance]?.[variant] ?? "bg-primary-base"
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div
      data-slot="toast-progress"
      aria-hidden
      className={cn(
        "absolute right-0 bottom-0 left-0 h-1",
        trackColor,
        className
      )}
      {...props}
    >
      <div
        data-slot="toast-progress-indicator"
        // Linear: an eased countdown looks stalled for its first second.
        className={cn("h-full transition-[width] ease-linear", indicatorColor)}
        style={{
          width: `${clampedValue}%`,
          transitionDuration: `${duration}ms`,
        }}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- *
 * Queue: module-level store + toast() + useToast + Toaster
 * -------------------------------------------------------------------------- */

/** Auto-dismiss delay. Pass `duration: null` on a toast to make it sticky. */
const TOAST_DURATION = 6_000

/** Collapsed-stack geometry. */
const TOAST_GAP = 12
const STACK_OFFSET = 14
const STACK_SCALE_STEP = 0.05
/** How many entries the viewport renders at once; the rest wait in the queue. */
const STACK_VISIBLE = 3
/** Per-entry delay when several land in the same tick, so they file in. */
const STACK_ENTER_STAGGER = 110

type ToastOptions = {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  action?: React.ReactNode
  variant?: Variant
  appearance?: Appearance
  /** ms before auto-dismiss; `null` keeps it until dismissed. */
  duration?: number | null
  /** Render the close button. Defaults to true. */
  dismissible?: boolean
  /** Render a progress bar tracking the remaining lifetime. */
  progress?: boolean
}

type ToastRecord = ToastOptions & { id: string }

/**
 * One module-level queue, one mounted `Toaster`. A per-subtree provider would
 * mean several viewports fighting over the same screen corner, where sibling
 * portals stack by DOM order — so a brand-new toast could render *behind* an
 * older one from a different provider.
 */
const QUEUE_LIMIT = 20
const EMPTY_QUEUE: ToastRecord[] = []

let queue: ToastRecord[] = EMPTY_QUEUE
let sequence = 0
const listeners = new Set<() => void>()

function emit() {
  for (const listener of listeners) listener()
}

function subscribeToQueue(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getQueue() {
  return queue
}

function getServerQueue() {
  return EMPTY_QUEUE
}

/** Push a toast. Returns its id. Callable from anywhere — no provider needed. */
function toast(options: ToastOptions) {
  const id = `toast-${(sequence += 1)}`
  // Newest first: index 0 is the front of the stack.
  queue = [{ id, ...options }, ...queue].slice(0, QUEUE_LIMIT)
  emit()
  return id
}

function dismissToast(id: string) {
  const next = queue.filter((entry) => entry.id !== id)
  if (next.length === queue.length) return
  queue = next
  emit()
}

function dismissAllToasts() {
  if (queue.length === 0) return
  queue = EMPTY_QUEUE
  emit()
}

/** Subscribe to the live queue. `toast` is also importable directly. */
function useToast() {
  const toasts = React.useSyncExternalStore(
    subscribeToQueue,
    getQueue,
    getServerQueue
  )
  return {
    toasts,
    toast,
    dismiss: dismissToast,
    dismissAll: dismissAllToasts,
  }
}

let mountedToasters = 0

type CountdownBar = { value: number; ms: number }

/**
 * Runs a countdown and reports it as a `{value, ms}` pair for `ToastProgress`.
 * Shared by the viewport's stack-wide clock and by the per-entry clock an
 * explicit `duration` opts into, so both pause and resume identically.
 */
function useCountdown({
  duration,
  paused,
  restartKey,
  onElapsed,
}: {
  duration: number | null
  paused: boolean
  /** Changing this rewinds the countdown to its full length. */
  restartKey: string
  onElapsed: () => void
}) {
  const remainingRef = React.useRef(duration ?? 0)
  const startedAtRef = React.useRef(0)
  const [bar, setBar] = React.useState<CountdownBar>({ value: 100, ms: 0 })

  const onElapsedRef = React.useRef(onElapsed)
  React.useEffect(() => {
    onElapsedRef.current = onElapsed
  })

  // Declared before the timer effect so a rewind always lands first.
  React.useEffect(() => {
    remainingRef.current = duration ?? 0
    startedAtRef.current = 0
    setBar({ value: 100, ms: 0 })
  }, [restartKey, duration])

  React.useEffect(() => {
    if (duration === null || duration <= 0) return

    if (paused) {
      // `startedAtRef` is still 0 when the countdown was rewound while already
      // paused — nothing has run yet, so there is no elapsed time to subtract
      // (doing so would burn the whole lifetime in one go).
      if (startedAtRef.current !== 0) {
        const elapsed = Date.now() - startedAtRef.current
        remainingRef.current = Math.max(0, remainingRef.current - elapsed)
        startedAtRef.current = 0
      }
      // Freeze the bar where it is (no transition).
      setBar({ value: (remainingRef.current / duration) * 100, ms: 0 })
      return
    }

    startedAtRef.current = Date.now()
    const ms = remainingRef.current

    // Two frames, not one. A CSS transition only fires if the browser gets a
    // style recalculation at the *start* value before the end value lands —
    // and a card that mounts mid-window renders straight onto whatever the
    // shared bar currently reads. Collapse the rewind and the tween into a
    // single frame and the browser sees 0% → 0%, so every toast after the
    // first would show a dead bar. The extra frame costs ~16ms of a 6s
    // countdown and is invisible.
    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setBar({ value: 0, ms }))
    })
    const timer = setTimeout(() => onElapsedRef.current(), ms)

    return () => {
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
      clearTimeout(timer)
    }
  }, [duration, paused, restartKey])

  return bar
}

/**
 * Lifetime for an entry that opted out of the stack's shared window with an
 * explicit `duration`. Rendered *inside* `Toast` so it can reuse the card's
 * own dismiss transition via context — the timer and the close button end up
 * on the exact same exit path.
 */
function ToastOwnLifecycle({
  duration,
  paused,
  progress,
}: {
  duration: number | null
  paused: boolean
  progress?: boolean
}) {
  const { dismiss } = useToastContext()
  const bar = useCountdown({
    duration,
    paused,
    restartKey: "own",
    onElapsed: dismiss,
  })

  if (!progress) return null
  return <ToastProgress value={bar.value} duration={bar.ms} />
}

/**
 * Lifetime for an entry on the stack's shared window. The viewport owns the
 * clock; this only relays the verdict, so every card starts its exit on the
 * same tick instead of each running a timer of its own.
 */
function ToastSharedLifecycle({
  expired,
  progress,
  bar,
}: {
  expired: boolean
  progress?: boolean
  bar: CountdownBar
}) {
  const { dismiss } = useToastContext()

  React.useEffect(() => {
    if (expired) dismiss()
  }, [expired, dismiss])

  if (!progress) return null
  return <ToastProgress value={bar.value} duration={bar.ms} />
}

const toasterPositionClasses = {
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
} as const

type ToasterPosition = keyof typeof toasterPositionClasses

type ToasterProps = Omit<React.ComponentProps<"ol">, "children"> & {
  position?: ToasterPosition
  /** Entries rendered at once. Extras wait until one leaves. */
  visibleToasts?: number
}

function Toaster({
  className,
  position = "bottom-right",
  visibleToasts = STACK_VISIBLE,
  ...props
}: ToasterProps) {
  const { toasts, dismiss } = useToast()
  const [expanded, setExpanded] = React.useState(false)
  const [heights, setHeights] = React.useState<Record<string, number>>({})
  const [mounted, setMounted] = React.useState(false)
  const listRef = React.useRef<HTMLOListElement>(null)

  React.useEffect(() => setMounted(true), [])

  // Read through a ref so this only ever runs on a queue change. Reacting to
  // `expanded` itself would race the mouseenter that just set it: the browser
  // has not re-hit-tested yet, so `:hover` can still read false and we would
  // collapse the stack the instant the user reaches it.
  const expandedRef = React.useRef(expanded)
  React.useEffect(() => {
    expandedRef.current = expanded
  })

  // A leaving entry takes the hovered card — and any focused close button —
  // out of the DOM with it, and neither `mouseleave` nor `focusout` fires for
  // a node that simply disappears. Expanded pauses every timer, so a stuck
  // `true` here means nothing auto-dismisses again: the stack deadlocks on
  // screen the first time someone closes a toast by hand. Re-derive the state
  // from the DOM instead of trusting the events to arrive.
  React.useEffect(() => {
    if (!expandedRef.current) return
    const el = listRef.current
    if (!el) return
    const active = document.activeElement
    const stillEngaged =
      el.matches(":hover") ||
      (active !== null && active !== document.body && el.contains(active))
    if (!stillEngaged) setExpanded(false)
  }, [toasts])

  React.useEffect(() => {
    mountedToasters += 1
    if (process.env.NODE_ENV !== "production" && mountedToasters > 1) {
      console.warn(
        "[Toast] More than one <Toaster /> is mounted, so every toast renders in each one. Mount it a single time near the root of your app."
      )
    }
    return () => {
      mountedToasters -= 1
    }
  }, [])

  // Nothing left to hover: fall back to the collapsed stack.
  React.useEffect(() => {
    if (toasts.length === 0) setExpanded(false)
  }, [toasts.length])

  const reportHeight = React.useCallback((id: string, height: number) => {
    setHeights((prev) =>
      prev[id] === height ? prev : { ...prev, [id]: height }
    )
  }, [])

  // Only the newest few are mounted; the rest stay queued until one of these
  // leaves. Index 0 is the newest and sits at the front.
  const visible = toasts.slice(0, Math.max(1, visibleToasts))

  // ---- the stack's shared auto-dismiss window ----
  // Entries on the default duration run off *one* clock rather than a timer
  // each. Per-entry timers made the stack drain in waves — the visible cards
  // would go, the queued ones would slide in, and the user would sit through
  // another full countdown. Here the window is measured from the newest
  // arrival and, when it elapses, everything on it leaves at once: mounted
  // cards play their exit, queued entries are dropped straight from the store.
  // An explicit `duration` opts an entry out and gives it its own timer.
  const sharedKey = toasts
    .filter((entry) => entry.duration === undefined)
    .map((entry) => entry.id)
    .join("|")
  const sharedIds = sharedKey === "" ? [] : sharedKey.split("|")

  const sharedIdsRef = React.useRef<string[]>([])
  React.useEffect(() => {
    sharedIdsRef.current = sharedIds
  })

  // Only an arrival rewinds the window. Keying it off the newest id instead
  // would also rewind when that entry is closed by hand, handing the
  // survivors a fresh full lifetime every time the user dismissed one.
  const [generation, setGeneration] = React.useState(0)
  const seenSharedRef = React.useRef<Set<string>>(new Set())

  React.useEffect(() => {
    const added = sharedIds.some((id) => !seenSharedRef.current.has(id))
    seenSharedRef.current = new Set(sharedIds)
    if (added) setGeneration((value) => value + 1)
    // `sharedIds` is derived from `sharedKey`, which is the real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sharedKey])

  // Records *which* entries the window covered when it elapsed rather than a
  // bare flag: a toast pushed while the stack is on its way out is not part of
  // that window, and a flag would dismiss it the moment it mounted.
  const [expiredIds, setExpiredIds] = React.useState<string[]>([])

  const sharedBar = useCountdown({
    duration: sharedIds.length === 0 ? null : TOAST_DURATION,
    paused: expanded,
    restartKey: String(generation),
    onElapsed: React.useCallback(() => setExpiredIds(sharedIdsRef.current), []),
  })

  React.useEffect(() => {
    setExpiredIds([])
  }, [generation])

  const visibleIds = new Set(visible.map((entry) => entry.id))
  const queuedExpiredIds = expiredIds
    .filter((id) => !visibleIds.has(id))
    .join("|")

  // Queued entries were never mounted, so there is no card to animate out —
  // retire them from the store directly on the same tick the visible ones
  // start their exit. Without this they would simply take the freed slots and
  // start the whole cycle over.
  React.useEffect(() => {
    if (queuedExpiredIds === "") return
    for (const id of queuedExpiredIds.split("|")) dismiss(id)
  }, [queuedExpiredIds, dismiss])

  if (!mounted) return null

  const fromTop = position.startsWith("top")
  // Stack grows away from the anchored edge.
  const direction = fromTop ? 1 : -1

  const offsetFor = (index: number) => {
    if (!expanded) return direction * index * STACK_OFFSET
    let acc = 0
    for (let i = 0; i < index; i += 1) {
      acc += (heights[visible[i].id] ?? 0) + TOAST_GAP
    }
    return direction * acc
  }

  const frontHeight = visible.length ? (heights[visible[0].id] ?? 0) : 0
  const stackHeight = visible.reduce(
    (sum, t, i) => sum + (heights[t.id] ?? 0) + (i > 0 ? TOAST_GAP : 0),
    0
  )

  return createPortal(
    <ol
      ref={listRef}
      data-slot="toaster"
      data-position={position}
      data-expanded={expanded || undefined}
      aria-live="polite"
      aria-relevant="additions text"
      className={cn(
        "pointer-events-none fixed z-100 w-[min(420px,calc(100vw-2rem))]",
        // While expanded the whole viewport takes the pointer, so crossing the
        // gaps between cards doesn't read as a mouseleave and collapse the
        // stack. Collapsed it stays transparent to clicks on the page behind.
        expanded && "pointer-events-auto",
        toasterPositionClasses[position],
        className
      )}
      style={{
        height: visible.length ? (expanded ? stackHeight : frontHeight) : 0,
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setExpanded(false)
        }
      }}
      {...props}
    >
      {visible.map((record, index) => (
        <ToasterItem
          key={record.id}
          record={record}
          index={index}
          total={visible.length}
          expanded={expanded}
          fromTop={fromTop}
          offset={offsetFor(index)}
          sharedExpired={expiredIds.includes(record.id)}
          sharedBar={sharedBar}
          onHeight={reportHeight}
          onRemove={dismiss}
        />
      ))}
    </ol>,
    document.body
  )
}

function ToasterItem({
  record,
  index,
  total,
  expanded,
  fromTop,
  offset,
  sharedExpired,
  sharedBar,
  onHeight,
  onRemove,
}: {
  record: ToastRecord
  index: number
  total: number
  expanded: boolean
  fromTop: boolean
  offset: number
  sharedExpired: boolean
  sharedBar: CountdownBar
  onHeight: (id: string, height: number) => void
  onRemove: (id: string) => void
}) {
  const ref = React.useRef<HTMLLIElement>(null)
  const [entered, setEntered] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const report = () => onHeight(record.id, el.offsetHeight)
    report()
    const observer = new ResizeObserver(report)
    observer.observe(el)
    return () => observer.disconnect()
  }, [record.id, onHeight])

  // Stagger by the index this entry had when it mounted, so a batch pushed in
  // one tick files in one-by-one instead of appearing all at once. Captured
  // once — later reshuffles must not re-delay an entry that already entered.
  const enterDelayRef = React.useRef(index * STACK_ENTER_STAGGER)

  React.useEffect(() => {
    const delay = enterDelayRef.current
    if (delay <= 0) {
      const raf = requestAnimationFrame(() => setEntered(true))
      return () => cancelAnimationFrame(raf)
    }
    const timer = setTimeout(() => setEntered(true), delay)
    return () => clearTimeout(timer)
  }, [])

  const scale = expanded ? 1 : 1 - index * STACK_SCALE_STEP
  const enterFrom = fromTop ? -16 : 16

  return (
    <li
      ref={ref}
      data-slot="toaster-item"
      data-index={index}
      className="pointer-events-auto absolute inset-x-0 transition-all duration-300 ease-out motion-reduce:transition-none"
      style={{
        [fromTop ? "top" : "bottom"]: 0,
        zIndex: total - index,
        transformOrigin: fromTop ? "top center" : "bottom center",
        transform: entered
          ? `translateY(${offset}px) scale(${scale})`
          : `translateY(${enterFrom}px) scale(0.95)`,
        opacity: entered ? 1 : 0,
      }}
    >
      <Toast
        variant={record.variant}
        appearance={record.appearance}
        onDismiss={() => onRemove(record.id)}
      >
        <ToastBody>
          {record.icon && <ToastIcon>{record.icon}</ToastIcon>}
          <ToastContent>
            {record.title && <ToastTitle>{record.title}</ToastTitle>}
            {record.description && (
              <ToastDescription>{record.description}</ToastDescription>
            )}
          </ToastContent>
        </ToastBody>
        {record.action}
        {record.dismissible !== false && <ToastClose />}
        {record.duration === undefined ? (
          <ToastSharedLifecycle
            expired={sharedExpired}
            bar={sharedBar}
            progress={record.progress}
          />
        ) : (
          <ToastOwnLifecycle
            duration={record.duration}
            paused={expanded}
            progress={record.progress}
          />
        )}
      </Toast>
    </li>
  )
}

export {
  Toast,
  ToastBody,
  ToastIcon,
  ToastContent,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  ToastProgress,
  Toaster,
  toast,
  useToast,
  toastVariants,
  useToastContext,
  TOAST_DURATION,
}
export type { ToastOptions, ToastRecord, ToasterPosition }
