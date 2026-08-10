"use client"

import * as React from "react"
import {
  RiCheckboxCircleFill,
  RiFlagFill,
  RiSettings3Line,
} from "@create-ui/assets/icons"
import { AnimatePresence, motion } from "motion/react"

import { SectionFrame } from "@/registry/components/example"
import { cn } from "@/registry/lib/utils"
import {
  Stepper,
  StepperActions,
  StepperBadgeItem,
  StepperCompactItem,
  StepperContent,
  StepperContentHead,
  StepperDescription,
  StepperDots,
  StepperHeading,
  StepperIcon,
  StepperIndicator,
  StepperItem,
  StepperLine,
  StepperTitle,
  StepperTrigger,
  type StepperLineProps,
} from "@/registry/pro/ui/stepper"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const variants = [
  "primary",
  "info",
  "success",
  "error",
  "neutral-light",
  "neutral-solid",
] as const
const appearances = ["soft", "outline", "solid"] as const
const sizes = ["sm", "md"] as const
const shapes = ["rounded", "pill"] as const

const ColHeading =
  "text-body px-2 pb-2 text-center text-[10px] font-semibold tracking-wider uppercase"
const RowHeading =
  "text-strongest pr-4 text-right align-middle text-[11px] font-medium"
const GroupLabel =
  "text-body text-[10px] font-semibold tracking-wider uppercase"

// ---------------------------------------------------------------------------
// StepperIcon — Variant × Appearance
// ---------------------------------------------------------------------------

const VariantAppearance = React.memo(function VariantAppearance() {
  return (
    <SectionFrame title="StepperIcon — Variant × Appearance">
      <table className="border-separate border-spacing-x-6 border-spacing-y-3">
        <thead>
          <tr>
            <th />
            {appearances.map((a) => (
              <th key={a} className={ColHeading}>
                {a}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((v) => (
            <tr key={v}>
              <td className={RowHeading}>{v}</td>
              {appearances.map((a) => (
                <td key={a} className="text-center">
                  <div className="flex justify-center">
                    <StepperIcon variant={v} appearance={a}>
                      2
                    </StepperIcon>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// StepperIcon — Sizes
// ---------------------------------------------------------------------------

const Sizes = React.memo(function Sizes() {
  return (
    <SectionFrame title="StepperIcon — Sizes">
      <div className="space-y-4">
        {sizes.map((size) => (
          <div key={size} className="space-y-2">
            <p className={GroupLabel}>{size}</p>
            <div className="flex flex-wrap items-center gap-3">
              {variants.map((v) => (
                <StepperIcon key={v} variant={v} size={size}>
                  2
                </StepperIcon>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// StepperIcon — Shape (rounded / pill)
// ---------------------------------------------------------------------------

const Shapes = React.memo(function Shapes() {
  return (
    <SectionFrame title="StepperIcon — Shape">
      <div className="space-y-4">
        {shapes.map((shape) => (
          <div key={shape} className="space-y-2">
            <p className={GroupLabel}>{shape}</p>
            <div className="flex flex-wrap items-center gap-3">
              {appearances.map((a) => (
                <StepperIcon
                  key={a}
                  variant="primary"
                  appearance={a}
                  shape={shape}
                >
                  2
                </StepperIcon>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// StepperIcon — Content (icon / number / empty / auto status)
// ---------------------------------------------------------------------------

const contentDemos = [
  {
    label: "icon",
    node: (
      <StepperIcon variant="primary">
        <RiFlagFill />
      </StepperIcon>
    ),
  },
  { label: "number", node: <StepperIcon variant="primary">2</StepperIcon> },
  { label: "empty", node: <StepperIcon variant="primary" /> },
  { label: "success", node: <StepperIcon variant="success" /> },
  { label: "error", node: <StepperIcon variant="error" /> },
]

const Content = React.memo(function Content() {
  return (
    <SectionFrame title="StepperIcon — Content">
      <div className="flex flex-wrap items-start gap-6">
        {contentDemos.map((d) => (
          <div key={d.label} className="flex flex-col items-center gap-1.5">
            {d.node}
            <span className={GroupLabel}>{d.label}</span>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// StepperIcon — Sub Step
// ---------------------------------------------------------------------------

const SubStep = React.memo(function SubStep() {
  return (
    <SectionFrame title="StepperIcon — Sub Step">
      <table className="border-separate border-spacing-x-6 border-spacing-y-3">
        <thead>
          <tr>
            <th />
            {appearances.map((a) => (
              <th key={a} className={ColHeading}>
                {a}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((v) => (
            <tr key={v}>
              <td className={RowHeading}>{v}</td>
              {appearances.map((a) => (
                <td key={a} className="text-center">
                  <div className="flex justify-center">
                    <StepperIcon variant={v} appearance={a} step="sub" />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// StepperItem
// ---------------------------------------------------------------------------

const iconOverrideSteps = [
  { title: "Choose a plan", desc: "Pick the tier that fits your team." },
  { title: "Add payment", desc: "Enter your billing details." },
  { title: "Confirm", desc: "Review and start your subscription." },
] as const

function IconVariantStepper({
  variant,
}: {
  variant: "primary" | "neutral-solid"
}) {
  const total = iconOverrideSteps.length
  const [active, setActive] = React.useState(1)
  const [filling, setFilling] = React.useState<null | "advance" | "error">(null)
  const [errored, setErrored] = React.useState(false)
  const [armed, setArmed] = React.useState(false)
  const [instant, setInstant] = React.useState(false)
  const raf = React.useRef<number | null>(null)
  const busy = filling !== null
  const reduced = usePrefersReducedMotion()

  React.useEffect(
    () => () => {
      if (raf.current != null) cancelAnimationFrame(raf.current)
    },
    []
  )

  const statusOf = (i: number): "completed" | "active" | "error" | "locked" => {
    if (i < active) return "completed"
    if (i === active) return errored ? "error" : "active"
    return "locked"
  }

  const runFill = (mode: "advance" | "error") => {
    if (reduced) {
      if (mode === "error") setErrored(true)
      else setActive((a) => a + 1)
      return
    }
    setErrored(false)
    setFilling(mode)
    setInstant(true)
    setArmed(false)
    if (raf.current != null) cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setInstant(false)
        setArmed(true)
      })
    )
  }
  const jumpTo = (i: number) => {
    if (raf.current != null) cancelAnimationFrame(raf.current)
    setFilling(null)
    setErrored(false)
    setArmed(false)
    setInstant(false)
    setActive(i)
  }
  const navTo = (i: number) => {
    if (busy || i === active) return
    if (i === active + 1 && !errored) runFill("advance")
    else jumpTo(i)
  }
  const advance = () => {
    if (busy || errored || active >= total - 1) return
    runFill("advance")
  }
  const simulateError = () => {
    if (busy || errored || active >= total - 1) return
    runFill("error")
  }
  const retry = () => {
    runFill("advance")
  }
  const handleFillEnd = () => {
    if (filling === "advance") {
      setArmed(false)
      setActive((a) => a + 1)
      setFilling(null)
    } else if (filling === "error") {
      setFilling(null)
      setErrored(true)
    }
  }

  return (
    <Stepper orientation="vertical" className="w-[300px]">
      {iconOverrideSteps.map((step, i) => {
        const status = statusOf(i)
        const isActive = i === active
        const activeLine = isActive ? (
          <StepperLine
            variant={variant}
            appearance="soft"
            fill={errored || armed}
            fillVariant={errored ? "error" : variant}
            duration={instant ? 0 : 650}
            onFillEnd={!instant && busy ? handleFillEnd : undefined}
          />
        ) : undefined
        return (
          <StepperItem key={step.title} status={status} variant={variant}>
            <StepperIndicator line={activeLine}>
              <button
                type="button"
                tabIndex={-1}
                aria-hidden
                onClick={() => navTo(i)}
                disabled={busy}
                className="focus-visible:outline-primary-base cursor-pointer rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default"
              >
                <StepperIcon variant={status === "error" ? "error" : undefined}>
                  {status === "error" ? undefined : i + 1}
                </StepperIcon>
              </button>
            </StepperIndicator>
            <StepperContent>
              <StepperContentHead>
                {i < active ? (
                  <StepperTrigger
                    className="min-w-0 flex-1 cursor-pointer"
                    onClick={() => navTo(i)}
                  >
                    <StepperTitle>{step.title}</StepperTitle>
                  </StepperTrigger>
                ) : (
                  <StepperTitle>{step.title}</StepperTitle>
                )}
                <StepperDescription>
                  {status === "error"
                    ? "Something went wrong. Please try again."
                    : step.desc}
                </StepperDescription>
              </StepperContentHead>
              {isActive && (
                <StepperActions>
                  {status === "error" ? (
                    <Button size="sm" variant="neutral-solid" onClick={retry}>
                      Retry
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="neutral-solid"
                        appearance="soft"
                        disabled={active === 0 || busy}
                        onClick={() => navTo(active - 1)}
                      >
                        Back
                      </Button>
                      <Button
                        size="sm"
                        variant="neutral-solid"
                        disabled={active === total - 1 || busy}
                        onClick={advance}
                      >
                        Continue
                      </Button>
                      <Button
                        size="sm"
                        variant="neutral-solid"
                        appearance="soft"
                        disabled={active === total - 1 || busy}
                        onClick={simulateError}
                      >
                        Simulate error
                      </Button>
                    </>
                  )}
                </StepperActions>
              )}
            </StepperContent>
          </StepperItem>
        )
      })}
    </Stepper>
  )
}

const IconVariantOverride = React.memo(function IconVariantOverride() {
  return (
    <div className="flex flex-wrap gap-16">
      <SectionFrame title="StepperItem — primary icon">
        <IconVariantStepper variant="primary" />
      </SectionFrame>
      <SectionFrame title="StepperItem — neutral-solid icon">
        <IconVariantStepper variant="neutral-solid" />
      </SectionFrame>
    </div>
  )
})

// ---------------------------------------------------------------------------
// StepperDots
// ---------------------------------------------------------------------------

const dotShapes = ["bar", "circle", "pill"] as const
const dotSizes = ["md", "sm", "xs"] as const
const dotVariants = ["neutral", "primary", "inverse"] as const
const dotAppearances = ["solid", "outline"] as const

const DotShapes = React.memo(function DotShapes() {
  return (
    <SectionFrame title="StepperDots — shape × size">
      <div className="flex flex-wrap gap-x-16 gap-y-6">
        {dotSizes.map((size) => (
          <div key={size} className="space-y-3">
            <p className={GroupLabel}>{size}</p>
            <div className="flex flex-col gap-4">
              {dotShapes.map((shape) => (
                <div key={shape} className="flex items-center gap-4">
                  <span className="text-strongest w-12 text-[11px] font-medium">
                    {shape}
                  </span>
                  <StepperDots
                    shape={shape}
                    size={size}
                    count={5}
                    defaultActiveIndex={4}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
})

function DotsCell({
  variant,
  appearance,
  highlighted,
}: {
  variant: (typeof dotVariants)[number]
  appearance: (typeof dotAppearances)[number]
  highlighted?: boolean
}) {
  return (
    <div className={cn("rounded-component-md inline-flex px-3 py-2")}>
      <StepperDots
        shape="pill"
        count={5}
        defaultActiveIndex={4}
        variant={variant}
        appearance={appearance}
        highlighted={highlighted}
      />
    </div>
  )
}

const DotVariants = React.memo(function DotVariants() {
  return (
    <SectionFrame title="StepperDots — variant × appearance">
      <table className="border-separate border-spacing-x-6 border-spacing-y-3">
        <thead>
          <tr>
            <th />
            {dotAppearances.map((a) => (
              <th key={a} className={ColHeading}>
                {a}
              </th>
            ))}
            <th className={ColHeading}>highlighted</th>
          </tr>
        </thead>
        <tbody>
          {dotVariants.map((v) => (
            <tr key={v}>
              <td className={RowHeading}>{v}</td>
              {dotAppearances.map((a) => (
                <td key={a}>
                  <DotsCell variant={v} appearance={a} />
                </td>
              ))}
              <td>
                <DotsCell variant={v} appearance="solid" highlighted />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// StepperLine
// ---------------------------------------------------------------------------

const lineVariants = [
  "neutral-light",
  "neutral-solid",
  "primary",
  "info",
  "success",
  "error",
] as const

const LineShowcase = React.memo(function LineShowcase() {
  return (
    <SectionFrame title="StepperLine — variant × appearance">
      <table className="border-separate border-spacing-x-6 border-spacing-y-3">
        <thead>
          <tr>
            <th />
            <th className={ColHeading}>solid</th>
            <th className={ColHeading}>soft</th>
            <th className={ColHeading}>solid ↓</th>
            <th className={ColHeading}>soft ↓</th>
          </tr>
        </thead>
        <tbody>
          {lineVariants.map((variant) => (
            <tr key={variant}>
              <td className={RowHeading}>{variant}</td>
              <td>
                <StepperLine
                  orientation="horizontal"
                  variant={variant}
                  appearance="solid"
                  className="w-16 flex-none"
                />
              </td>
              <td>
                <StepperLine
                  orientation="horizontal"
                  variant={variant}
                  appearance="soft"
                  className="w-16 flex-none"
                />
              </td>
              <td>
                <div className="flex justify-center">
                  <StepperLine
                    orientation="vertical"
                    variant={variant}
                    appearance="solid"
                    className="h-10 flex-none"
                  />
                </div>
              </td>
              <td>
                <div className="flex justify-center">
                  <StepperLine
                    orientation="vertical"
                    variant={variant}
                    appearance="soft"
                    className="h-10 flex-none"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// StepperItem
// ---------------------------------------------------------------------------

type HState = {
  key: string
  status: "active" | "completed" | "error" | "locked"
  badge: "info" | "success" | "danger" | "neutral"
  num?: string
  disabled?: boolean
}

const hStates: HState[] = [
  { key: "active", status: "active", badge: "info", num: "2" },
  { key: "completed", status: "completed", badge: "success" },
  { key: "error", status: "error", badge: "danger" },
  { key: "locked", status: "locked", badge: "neutral", num: "2" },
  {
    key: "disabled",
    status: "locked",
    badge: "neutral",
    num: "2",
    disabled: true,
  },
]

function HItem({ size, state }: { size: "md" | "sm"; state: HState }) {
  return (
    <Stepper
      orientation="horizontal"
      size={size}
      className="w-[300px] [&>li:last-child_[data-slot=stepper-line]]:block"
    >
      <StepperItem status={state.status} disabled={state.disabled}>
        <StepperIndicator>
          <StepperIcon>{state.num}</StepperIcon>
        </StepperIndicator>
        <StepperContent>
          <StepperContentHead>
            <StepperHeading>
              <StepperTitle>Step indicator title</StepperTitle>
              <Badge
                variant={state.badge}
                appearance="soft"
                shape="pill"
                size={size}
              >
                Done
              </Badge>
            </StepperHeading>
            <StepperDescription>
              Your confirmation has been successfully received!
            </StepperDescription>
          </StepperContentHead>
          <StepperActions>
            <Button size="sm" variant="neutral-solid" disabled={state.disabled}>
              Update
            </Button>
            <Button
              size="sm"
              variant="neutral-solid"
              appearance="soft"
              disabled={state.disabled}
            >
              Cancel
            </Button>
          </StepperActions>
        </StepperContent>
      </StepperItem>
    </Stepper>
  )
}

const HorizontalItems = React.memo(function HorizontalItems() {
  return (
    <div className="flex flex-wrap gap-16">
      {(["md", "sm"] as const).map((size) => (
        <SectionFrame key={size} title={`StepperItem — horizontal · ${size}`}>
          <div className="flex flex-col gap-8">
            {hStates.map((s) => (
              <div key={s.key} className="flex flex-col gap-2">
                <p className={GroupLabel}>{s.key}</p>
                <HItem size={size} state={s} />
              </div>
            ))}
          </div>
        </SectionFrame>
      ))}
    </div>
  )
})

// ---------------------------------------------------------------------------
// Composition demos
// ---------------------------------------------------------------------------

function VItem({ size, state }: { size: "md" | "sm"; state: HState }) {
  return (
    <Stepper
      orientation="vertical"
      size={size}
      className="w-[300px] [&>li:last-child_[data-slot=stepper-line]]:block"
    >
      <StepperItem status={state.status} disabled={state.disabled}>
        <StepperIndicator>
          <StepperIcon>{state.num}</StepperIcon>
        </StepperIndicator>
        <StepperContent>
          <StepperContentHead>
            <StepperHeading>
              <StepperTitle>Step indicator title</StepperTitle>
              <Badge
                variant={state.badge}
                appearance="soft"
                shape="pill"
                size={size}
              >
                Done
              </Badge>
            </StepperHeading>
            <StepperDescription>
              Your confirmation has been successfully received!
            </StepperDescription>
          </StepperContentHead>
          <StepperActions>
            <Button size="sm" variant="neutral-solid" disabled={state.disabled}>
              Update
            </Button>
            <Button
              size="sm"
              variant="neutral-solid"
              appearance="soft"
              disabled={state.disabled}
            >
              Cancel
            </Button>
          </StepperActions>
        </StepperContent>
      </StepperItem>
    </Stepper>
  )
}

const VerticalItems = React.memo(function VerticalItems() {
  return (
    <div className="flex flex-wrap gap-16">
      {(["md", "sm"] as const).map((size) => (
        <SectionFrame key={size} title={`StepperItem — vertical · ${size}`}>
          <div className="flex flex-col gap-8">
            {hStates.map((s) => (
              <div key={s.key} className="flex flex-col gap-2">
                <p className={GroupLabel}>{s.key}</p>
                <VItem size={size} state={s} />
              </div>
            ))}
          </div>
        </SectionFrame>
      ))}
    </div>
  )
})

// ---------------------------------------------------------------------------
// StepperItem
// ---------------------------------------------------------------------------

const compactStates: {
  key: string
  status: "active" | "completed" | "error" | "locked"
  disabled?: boolean
}[] = [
  { key: "active", status: "active" },
  { key: "completed", status: "completed" },
  { key: "error", status: "error" },
  { key: "locked", status: "locked" },
  { key: "disabled", status: "locked", disabled: true },
]

const compactAlignments = ["top", "left", "right"] as const

function CompactShowcase({ size }: { size: "md" | "sm" }) {
  return (
    <SectionFrame title={`StepperItem — compact · ${size}`}>
      <div className="flex flex-col gap-8">
        {compactAlignments.map((alignment) => (
          <div key={alignment} className="space-y-3">
            <p className={GroupLabel}>{alignment} icon</p>
            <div className="flex flex-wrap items-start gap-6">
              {compactStates.map((s) => (
                <Stepper
                  key={s.key}
                  orientation="horizontal"
                  layout="compact"
                  size={size}
                  className="w-48 [&>li:last-child_[data-slot=stepper-line]]:block"
                >
                  <StepperCompactItem
                    status={s.status}
                    alignment={alignment}
                    disabled={s.disabled}
                    indicator="1"
                    step="Step 1"
                    title="Step Title"
                  />
                </Stepper>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  )
}

const CompactItems = React.memo(function CompactItems() {
  return (
    <div className="flex flex-col gap-16">
      <CompactShowcase size="md" />
      <CompactShowcase size="sm" />
    </div>
  )
})

// ---------------------------------------------------------------------------
// StepperItem — badge
// ---------------------------------------------------------------------------

const BadgeItems = React.memo(function BadgeItems() {
  return (
    <div className="flex flex-wrap gap-16">
      {(["md", "sm"] as const).map((size) => (
        <SectionFrame key={size} title={`StepperItem — badge · ${size}`}>
          <Stepper orientation="vertical" size={size} layout="badge">
            {hStates.map((s) => (
              <StepperBadgeItem
                key={s.key}
                status={s.status}
                disabled={s.disabled}
                leadIcon={<RiSettings3Line />}
                number="1."
                title="Step indicator title"
              />
            ))}
          </Stepper>
        </SectionFrame>
      ))}
    </div>
  )
})

// ---------------------------------------------------------------------------
// Assembled steppers
// ---------------------------------------------------------------------------

type FlowStep = {
  key: string
  num?: string
  title: string
  short: string
  desc?: string
  disabled?: boolean
  sub?: boolean
}

const flow: FlowStep[] = [
  {
    key: "create",
    num: "1",
    title: "Create your account",
    short: "Create",
    desc: "Your account is ready. You signed up with jane@createui.co and can update your login details anytime in settings.",
  },
  {
    key: "verify",
    num: "2",
    title: "Verify your email",
    short: "Verify",
    desc: "Confirmed. We verified your email address, so you will receive product updates and security alerts.",
  },
  {
    key: "workspace",
    num: "3",
    title: "Set up your workspace",
    short: "Set up",
    desc: "Name your workspace, pick a URL, and choose whether it is for personal or team use.",
  },
  {
    key: "invite",
    num: "4",
    title: "Invite your team",
    short: "Invite",
    desc: "Add teammates by email so they can access shared projects and component libraries.",
  },
  { key: "connect", title: "Connect Figma", short: "Connect", sub: true },
  {
    key: "install",
    num: "5",
    title: "Install the CLI",
    short: "Install",
    disabled: true,
  },
]

type FlowStatus = "completed" | "active" | "locked"

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return reduced
}

function useFlow(defaultActive = 2) {
  const [active, setActive] = React.useState(defaultActive)
  const statusOf = (i: number): FlowStatus =>
    i < active ? "completed" : i === active ? "active" : "locked"
  return { active, setActive, statusOf }
}

function useAnimatedFlow(total: number, defaultActive = 2) {
  const [active, setActive] = React.useState(defaultActive)
  const [filling, setFilling] = React.useState<null | "advance">(null)
  const [armed, setArmed] = React.useState(false)
  const [instant, setInstant] = React.useState(false)
  const raf = React.useRef<number | null>(null)
  const busy = filling !== null
  const reduced = usePrefersReducedMotion()

  React.useEffect(
    () => () => {
      if (raf.current != null) cancelAnimationFrame(raf.current)
    },
    []
  )

  const statusOf = (i: number): FlowStatus =>
    i < active ? "completed" : i === active ? "active" : "locked"

  const runFill = () => {
    if (reduced) {
      setActive((a) => a + 1)
      return
    }
    setFilling("advance")
    setInstant(true)
    setArmed(false)
    if (raf.current != null) cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setInstant(false)
        setArmed(true)
      })
    )
  }

  const jumpTo = (i: number) => {
    if (raf.current != null) cancelAnimationFrame(raf.current)
    setFilling(null)
    setArmed(false)
    setInstant(false)
    setActive(i)
  }

  const navTo = (i: number) => {
    if (busy || i === active) return
    if (i === active + 1) runFill()
    else jumpTo(i)
  }

  const advance = () => {
    if (busy || active >= total - 1) return
    runFill()
  }

  const handleFillEnd = () => {
    setArmed(false)
    setActive((a) => a + 1)
    setFilling(null)
  }

  const lineFor = (i: number): StepperLineProps | undefined =>
    i === active
      ? {
          variant: "neutral-light",
          appearance: "soft",
          fill: armed,
          fillVariant: "info",
          duration: instant ? 0 : 650,
          onFillEnd: !instant && busy ? handleFillEnd : undefined,
        }
      : undefined

  return { active, statusOf, navTo, advance, busy, lineFor }
}

function flowBadge(
  status: FlowStatus,
  disabled?: boolean
): { label: string; variant: "info" | "neutral" } | null {
  if (disabled) return { label: "Soon", variant: "neutral" }
  if (status === "active") return { label: "Active", variant: "info" }
  if (status === "locked") return { label: "Upcoming", variant: "neutral" }
  return null
}

function FlowRichItem({
  step,
  size,
  index,
  nav,
  hideBadge = false,
}: {
  step: FlowStep
  size: "md" | "sm"
  index: number
  nav: ReturnType<typeof useAnimatedFlow>
  hideBadge?: boolean
}) {
  const status = nav.statusOf(index)
  const badge = hideBadge ? null : flowBadge(status, step.disabled)
  const go = step.disabled ? undefined : () => nav.navTo(index)
  const line = nav.lineFor(index)
  return (
    <StepperItem status={status} disabled={step.disabled}>
      <StepperIndicator line={line ? <StepperLine {...line} /> : undefined}>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={go}
          disabled={step.disabled || nav.busy}
          className="focus-visible:outline-primary-base cursor-pointer rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default"
        >
          <StepperIcon shape="pill" step={step.sub ? "sub" : "main"}>
            {status === "completed" ? undefined : step.num}
          </StepperIcon>
        </button>
      </StepperIndicator>
      <StepperContent>
        <StepperContentHead>
          <StepperHeading>
            {go ? (
              <StepperTrigger
                className="min-w-0 flex-1 cursor-pointer"
                onClick={go}
              >
                <StepperTitle>{step.title}</StepperTitle>
              </StepperTrigger>
            ) : (
              <StepperTitle>{step.title}</StepperTitle>
            )}
            {badge && (
              <Badge
                variant={badge.variant}
                appearance="soft"
                shape="pill"
                size={size}
                disabled={step.disabled}
              >
                {badge.label}
              </Badge>
            )}
          </StepperHeading>
          {step.desc && <StepperDescription>{step.desc}</StepperDescription>}
        </StepperContentHead>
        {status === "active" && !step.disabled && (
          <StepperActions>
            <Button
              size="sm"
              variant="neutral-solid"
              onClick={nav.advance}
              disabled={nav.busy}
            >
              Continue
            </Button>
            <Button
              size="sm"
              variant="neutral-solid"
              appearance="soft"
              onClick={nav.advance}
              disabled={nav.busy}
            >
              Skip for now
            </Button>
          </StepperActions>
        )}
      </StepperContent>
    </StepperItem>
  )
}

function FlowVertical({ size }: { size: "md" | "sm" }) {
  const nav = useAnimatedFlow(flow.length)
  return (
    <Stepper orientation="vertical" size={size} className="w-[300px]">
      {flow.map((s, i) => (
        <FlowRichItem key={s.key} step={s} size={size} index={i} nav={nav} />
      ))}
    </Stepper>
  )
}

function FlowHorizontal({ size }: { size: "md" | "sm" }) {
  const nav = useAnimatedFlow(flow.length)
  return (
    <Stepper
      orientation="horizontal"
      size={size}
      className={size === "md" ? "w-[1560px]" : "w-[1400px]"}
    >
      {flow.map((s, i) => (
        <FlowRichItem
          key={s.key}
          step={s}
          size={size}
          index={i}
          nav={nav}
          hideBadge={i === flow.length - 1}
        />
      ))}
    </Stepper>
  )
}

function CompactFlow({
  size,
  alignment,
}: {
  size: "md" | "sm"
  alignment: "top" | "left" | "right"
}) {
  const nav = useAnimatedFlow(flow.length)
  return (
    <Stepper
      orientation="horizontal"
      layout="compact"
      size={size}
      className="w-full"
    >
      {flow.map((s, i) => {
        const line = nav.lineFor(i)
        return (
          <StepperCompactItem
            key={s.key}
            status={nav.statusOf(i)}
            alignment={alignment}
            disabled={s.disabled}
            indicator={s.num}
            step={`Step ${i + 1}`}
            title={s.short}
            onClick={s.disabled || nav.busy ? undefined : () => nav.navTo(i)}
            className={cn(!s.disabled && "cursor-pointer")}
            line={
              line ? (
                <StepperLine orientation="horizontal" {...line} />
              ) : undefined
            }
          />
        )
      })}
    </Stepper>
  )
}

function BadgeFlow({ size }: { size: "md" | "sm" }) {
  const { setActive, statusOf } = useFlow()
  return (
    <Stepper
      orientation="vertical"
      size={size}
      layout="badge"
      className="w-[280px]"
    >
      {flow.map((s, i) => (
        <StepperBadgeItem
          key={s.key}
          status={statusOf(i)}
          disabled={s.disabled}
          number={`${i + 1}.`}
          title={s.title}
          onClick={s.disabled ? undefined : () => setActive(i)}
          className={cn(!s.disabled && "cursor-pointer")}
        />
      ))}
    </Stepper>
  )
}

const AssembledSteppers = React.memo(function AssembledSteppers() {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-wrap gap-16">
        <SectionFrame title="Onboarding — vertical · md">
          <FlowVertical size="md" />
        </SectionFrame>
        <SectionFrame title="Onboarding — vertical · sm">
          <FlowVertical size="sm" />
        </SectionFrame>
        <SectionFrame title="Onboarding — badge · md">
          <BadgeFlow size="md" />
        </SectionFrame>
        <SectionFrame title="Onboarding — badge · sm">
          <BadgeFlow size="sm" />
        </SectionFrame>
      </div>
      {(["md", "sm"] as const).map((size) => (
        <SectionFrame key={size} title={`Onboarding — horizontal · ${size}`}>
          <div className="max-w-full overflow-x-auto">
            <FlowHorizontal size={size} />
          </div>
        </SectionFrame>
      ))}
      {(["md", "sm"] as const).map((size) => (
        <SectionFrame key={size} title={`Onboarding — compact · ${size}`}>
          <div className="flex flex-col gap-6">
            {(["top", "left", "right"] as const).map((a) => (
              <div key={a} className="max-w-full overflow-x-auto pb-1">
                <CompactFlow size={size} alignment={a} />
              </div>
            ))}
          </div>
        </SectionFrame>
      ))}
    </div>
  )
})

// ---------------------------------------------------------------------------
// Interactive
// ---------------------------------------------------------------------------

const interactiveSteps = [
  {
    title: "Create your account",
    desc: "Set your email and a password to get started.",
  },
  {
    title: "Set up your workspace",
    desc: "Name your workspace and pick a URL.",
  },
  {
    title: "Invite your team",
    desc: "Add teammates so they can collaborate with you.",
  },
  {
    title: "Install the CLI",
    desc: "Run the install command to finish setting up.",
  },
]

const statusBadge: Record<
  "active" | "completed" | "error" | "locked",
  { variant: "info" | "success" | "danger" | "neutral"; label: string }
> = {
  active: { variant: "info", label: "In progress" },
  completed: { variant: "success", label: "Done" },
  error: { variant: "danger", label: "Failed" },
  locked: { variant: "neutral", label: "Upcoming" },
}

function InteractiveStepper() {
  const total = interactiveSteps.length
  const [active, setActive] = React.useState(0)
  const [filling, setFilling] = React.useState<null | "advance" | "error">(null)
  const [errored, setErrored] = React.useState(false)
  const [armed, setArmed] = React.useState(false)
  const [instant, setInstant] = React.useState(false)
  const raf = React.useRef<number | null>(null)
  const busy = filling !== null
  const done = active >= total
  const reduced = usePrefersReducedMotion()

  React.useEffect(
    () => () => {
      if (raf.current != null) cancelAnimationFrame(raf.current)
    },
    []
  )

  const statusFor = (
    i: number
  ): "completed" | "active" | "error" | "locked" => {
    if (i < active) return "completed"
    if (i === active) return errored ? "error" : "active"
    return "locked"
  }

  const runFill = (mode: "advance" | "error") => {
    if (reduced) {
      // No line animation — resolve the outcome immediately.
      if (mode === "error") setErrored(true)
      else {
        setErrored(false)
        setActive((a) => a + 1)
      }
      return
    }
    setErrored(false)
    setFilling(mode)
    setInstant(true)
    setArmed(false)
    if (raf.current != null) cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setInstant(false)
        setArmed(true)
      })
    )
  }

  const goTo = (i: number) => {
    if (busy) return
    if (raf.current != null) cancelAnimationFrame(raf.current)
    setFilling(null)
    setErrored(false)
    setArmed(false)
    setInstant(false)
    setActive(i)
  }
  const navTo = (i: number) => {
    if (busy || i === active) return
    if (i === active + 1) runFill("advance")
    else goTo(i)
  }
  const startAdvance = () => {
    if (busy || errored) return
    if (active >= total - 1) setActive((a) => a + 1)
    else runFill("advance")
  }
  const startError = () => {
    if (busy || errored) return
    if (active >= total - 1) setErrored(true)
    else runFill("error")
  }
  const retry = () => {
    if (active >= total - 1) {
      setErrored(false)
      setActive((a) => a + 1)
    } else {
      runFill("advance")
    }
  }
  const handleFillEnd = () => {
    if (filling === "advance") {
      setArmed(false)
      setActive((a) => a + 1)
      setFilling(null)
    } else if (filling === "error") {
      setFilling(null)
      setErrored(true)
    }
  }

  return (
    <div className="flex w-[340px] flex-col gap-4">
      <Stepper orientation="vertical">
        {interactiveSteps.map((s, i) => {
          const status = statusFor(i)
          const isActive = i === active
          const activeLine = isActive ? (
            <StepperLine
              variant="neutral-light"
              appearance="soft"
              fill={errored || armed}
              fillVariant={errored ? "error" : "info"}
              duration={instant ? 0 : 650}
              onFillEnd={!instant && busy ? handleFillEnd : undefined}
            />
          ) : undefined
          return (
            <StepperItem key={s.title} status={status}>
              <StepperIndicator line={activeLine}>
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden
                  onClick={() => navTo(i)}
                  disabled={busy}
                  className="focus-visible:outline-primary-base cursor-pointer rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default"
                >
                  <StepperIcon shape="rounded">
                    {status === "completed" || status === "error"
                      ? undefined
                      : i + 1}
                  </StepperIcon>
                </button>
              </StepperIndicator>
              <StepperContent className="gap-0">
                <StepperContentHead>
                  <StepperHeading>
                    {i < active ? (
                      <StepperTrigger
                        className="min-w-0 flex-1 cursor-pointer"
                        onClick={() => navTo(i)}
                      >
                        <StepperTitle>{s.title}</StepperTitle>
                      </StepperTrigger>
                    ) : (
                      <StepperTitle>{s.title}</StepperTitle>
                    )}
                    <Badge
                      variant={statusBadge[status].variant}
                      appearance="soft"
                      shape="pill"
                      size="sm"
                    >
                      {statusBadge[status].label}
                    </Badge>
                  </StepperHeading>
                  <StepperDescription>
                    {status === "error"
                      ? "Something went wrong. Please try again."
                      : s.desc}
                  </StepperDescription>
                </StepperContentHead>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="actions"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <StepperActions className="pt-component-lg">
                        {status === "error" ? (
                          <Button
                            size="sm"
                            variant="neutral-solid"
                            onClick={retry}
                          >
                            Retry
                          </Button>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="neutral-solid"
                              onClick={startAdvance}
                              disabled={busy}
                            >
                              {i === total - 1 ? "Finish" : "Continue"}
                            </Button>
                            <Button
                              size="sm"
                              variant="neutral-solid"
                              appearance="soft"
                              onClick={startError}
                              disabled={busy}
                            >
                              Simulate error
                            </Button>
                          </>
                        )}
                      </StepperActions>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StepperContent>
            </StepperItem>
          )
        })}
      </Stepper>
      {done && (
        <div className="bg-success-weakest text-success-strong rounded-component-lg px-component-md py-component-sm text-ui-control-md flex items-center gap-2">
          <RiCheckboxCircleFill className="size-5 shrink-0" />
          <span className="font-semibold">All steps complete!</span>
          <Button
            size="sm"
            variant="neutral-solid"
            appearance="soft"
            className="ml-auto"
            onClick={() => goTo(0)}
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  )
}

const InteractiveSection = React.memo(function InteractiveSection() {
  return (
    <SectionFrame title="Interactive — advance · navigate · error">
      <InteractiveStepper />
    </SectionFrame>
  )
})

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function StepperExample() {
  return (
    <div className="flex flex-col gap-16">
      <InteractiveSection />
      <AssembledSteppers />
      <VariantAppearance />
      <div className="flex flex-wrap gap-16">
        <Sizes />
        <Shapes />
        <Content />
      </div>
      <SubStep />
      <IconVariantOverride />
      <DotShapes />
      <DotVariants />
      <LineShowcase />
      <HorizontalItems />
      <VerticalItems />
      <CompactItems />
      <BadgeItems />
    </div>
  )
}
