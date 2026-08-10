"use client"

import * as React from "react"

// ---------------------------------------------------------------------------
// useStepper — headless controller for the Stepper component. It owns the
// active step, derives each step's status, and (optionally) drives the
// connector-line fill on a one-step advance, so a working wizard needs only a
// few lines of glue instead of a hand-rolled state machine:
//
//   const stepper = useStepper({ count: steps.length })
//
//   <Stepper>
//     {steps.map((step, i) => (
//       <StepperItem key={i} status={stepper.status(i)}>
//         <StepperIndicator line={<StepperLine {...stepper.lineProps(i)} />}>
//           <StepperIcon>{i + 1}</StepperIcon>
//         </StepperIndicator>
//         <StepperContent>
//           <StepperTitle>{step.title}</StepperTitle>
//           {stepper.isActive(i) && (
//             <StepperActions>
//               <Button onClick={stepper.prev}>Back</Button>
//               <Button onClick={stepper.next}>Continue</Button>
//             </StepperActions>
//           )}
//         </StepperContent>
//       </StepperItem>
//     ))}
//   </Stepper>
//
// Controlled or uncontrolled via activeStep / defaultActiveStep /
// onActiveStepChange (mirrors the useFileUpload options shape). Kept decoupled
// from the component module — lineProps() returns a plain object you spread onto
// <StepperLine>.
// ---------------------------------------------------------------------------

type StepperStatus = "active" | "completed" | "error" | "locked"

// A subset of StepperLineProps, typed structurally so the hook stays independent
// of the component. Spread onto the active step's <StepperLine> to animate its
// outgoing connector; every other step gets `undefined` (the default line). The
// track is forced soft/neutral so the colored fill overlay stays visible as it
// grows (a solid same-color track would hide it).
type StepperLineDriveProps = {
  variant: "neutral-light"
  appearance: "soft"
  fill: boolean
  fillVariant: "info" | "error"
  duration: number
  onFillEnd?: () => void
}

type UseStepperOptions = {
  // Total number of steps.
  count: number
  // Controlled active step index (0-based). Omit to let the hook own it.
  activeStep?: number
  // Initial active step for the uncontrolled case (default 0).
  defaultActiveStep?: number
  // Called whenever the active step changes (including reaching `count` on
  // completion).
  onActiveStepChange?: (step: number) => void
  // Animate the connector-line fill on a one-step advance (default true). When
  // false — or under `prefers-reduced-motion` — advances are instant.
  animate?: boolean
  // Fill duration in ms (default 650).
  duration?: number
  // Fired once the final step is completed (activeStep passes count - 1).
  onComplete?: () => void
}

type UseStepperReturn = {
  // The active step index (0-based). Equals `count` once the flow is complete.
  activeStep: number
  count: number
  // Resolve a step's status for `<StepperItem status={...}>`. `completed` before
  // the active step, `active` (or `error`) at it, `locked` after.
  status: (index: number) => StepperStatus
  isActive: (index: number) => boolean
  isCompleted: (index: number) => boolean
  // The active step is in the error state (see `setError`).
  isError: boolean
  isFirst: boolean
  isLast: boolean
  // Every step has been completed.
  isComplete: boolean
  // A fill animation is in flight — disable Continue/Back while true.
  busy: boolean
  // Advance one step, animating the outgoing line (unless it's the last step,
  // which completes instantly since its connector is hidden).
  next: () => void
  // Go back one step (instant).
  prev: () => void
  // Jump to any step (instant).
  goTo: (index: number) => void
  // Click-to-navigate: animates only when moving to the immediately-next step;
  // every other jump is instant. Ideal for clickable step titles/icons.
  navTo: (index: number) => void
  // Return to the first step and clear any error.
  reset: () => void
  // Mark (or clear) the active step as errored — e.g. after a failed request.
  setError: (value?: boolean) => void
  // Spread onto step `index`'s <StepperLine> to drive its animated fill.
  lineProps: (index: number) => StepperLineDriveProps | undefined
}

// Mirror the OS "reduce motion" setting so advances can skip the line fill.
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

function useStepper(options: UseStepperOptions): UseStepperReturn {
  const {
    count,
    activeStep: controlledActive,
    defaultActiveStep = 0,
    duration = 650,
  } = options

  const isControlled = controlledActive !== undefined
  const [internalActive, setInternalActive] = React.useState(defaultActiveStep)
  const activeStep = isControlled ? controlledActive : internalActive

  // Fill state machine for the active step's outgoing connector.
  const [filling, setFilling] = React.useState(false) // a fill is in flight
  const [armed, setArmed] = React.useState(false) // fill target (0 → 1)
  const [instant, setInstant] = React.useState(false) // snap-reset frame
  const [errored, setErrored] = React.useState(false) // active step errored
  const raf = React.useRef<number | null>(null)
  const busy = filling

  const reduced = usePrefersReducedMotion()

  // Stable refs so the rAF-driven callbacks never read stale render values.
  const optionsRef = React.useRef(options)
  const activeStepRef = React.useRef(activeStep)
  const busyRef = React.useRef(busy)
  const erroredRef = React.useRef(errored)
  React.useEffect(() => {
    optionsRef.current = options
    activeStepRef.current = activeStep
    busyRef.current = busy
    erroredRef.current = errored
  })

  React.useEffect(
    () => () => {
      if (raf.current != null) cancelAnimationFrame(raf.current)
    },
    []
  )

  const commitActive = React.useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(count, next))
      activeStepRef.current = clamped
      if (!isControlled) setInternalActive(clamped)
      optionsRef.current.onActiveStepChange?.(clamped)
      if (clamped >= count) optionsRef.current.onComplete?.()
    },
    [count, isControlled]
  )

  const cancelFill = React.useCallback(() => {
    if (raf.current != null) cancelAnimationFrame(raf.current)
    raf.current = null
    setFilling(false)
    setArmed(false)
    setInstant(false)
  }, [])

  const handleFillEnd = React.useCallback(() => {
    setArmed(false)
    setFilling(false)
    commitActive(activeStepRef.current + 1)
  }, [commitActive])

  // Snap the fill to empty (no transition), then arm it next frame so it grows
  // 0 → 100%, after which handleFillEnd advances. Instant when animation is off
  // or reduced motion is on.
  const runFill = React.useCallback(() => {
    const animateOn = optionsRef.current.animate ?? true
    if (!animateOn || reduced) {
      commitActive(activeStepRef.current + 1)
      return
    }
    setErrored(false)
    setFilling(true)
    setInstant(true)
    setArmed(false)
    if (raf.current != null) cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setInstant(false)
        setArmed(true)
      })
    )
  }, [reduced, commitActive])

  const next = React.useCallback(() => {
    if (busyRef.current || erroredRef.current) return
    // Last step has no outgoing line to animate → complete immediately.
    if (activeStepRef.current >= count - 1) {
      cancelFill()
      commitActive(count)
      return
    }
    runFill()
  }, [count, runFill, cancelFill, commitActive])

  const prev = React.useCallback(() => {
    if (busyRef.current) return
    cancelFill()
    setErrored(false)
    commitActive(activeStepRef.current - 1)
  }, [cancelFill, commitActive])

  const goTo = React.useCallback(
    (index: number) => {
      if (busyRef.current) return
      cancelFill()
      setErrored(false)
      commitActive(index)
    },
    [cancelFill, commitActive]
  )

  const navTo = React.useCallback(
    (index: number) => {
      if (busyRef.current || index === activeStepRef.current) return
      // Animate only a one-step forward move; every other jump is instant.
      if (index === activeStepRef.current + 1 && !erroredRef.current) next()
      else goTo(index)
    },
    [next, goTo]
  )

  const reset = React.useCallback(() => {
    cancelFill()
    setErrored(false)
    commitActive(0)
  }, [cancelFill, commitActive])

  const setError = React.useCallback(
    (value: boolean = true) => {
      cancelFill()
      setErrored(value)
    },
    [cancelFill]
  )

  const status = React.useCallback(
    (index: number): StepperStatus => {
      if (index < activeStep) return "completed"
      if (index === activeStep) return errored ? "error" : "active"
      return "locked"
    },
    [activeStep, errored]
  )

  const isActive = React.useCallback(
    (index: number) => index === activeStep,
    [activeStep]
  )
  const isCompleted = React.useCallback(
    (index: number) => index < activeStep,
    [activeStep]
  )

  const lineProps = React.useCallback(
    (index: number): StepperLineDriveProps | undefined => {
      if (index !== activeStep) return undefined
      return {
        // Soft neutral track so the colored fill overlay stays visible.
        variant: "neutral-light",
        appearance: "soft",
        fill: errored || armed,
        fillVariant: errored ? "error" : "info",
        // The snap-reset frame runs at 0ms; the real fill uses `duration`. When
        // instant, onFillEnd is omitted — StepperLine's rAF fallback (or the
        // next real transition) drives advancement.
        duration: instant ? 0 : duration,
        onFillEnd: !instant && busy ? handleFillEnd : undefined,
      }
    },
    [activeStep, errored, armed, instant, duration, busy, handleFillEnd]
  )

  return {
    activeStep,
    count,
    status,
    isActive,
    isCompleted,
    isError: errored,
    isFirst: activeStep <= 0,
    isLast: activeStep >= count - 1,
    isComplete: activeStep >= count,
    busy,
    next,
    prev,
    goTo,
    navTo,
    reset,
    setError,
    lineProps,
  }
}

export { useStepper }
export type {
  UseStepperOptions,
  UseStepperReturn,
  StepperLineDriveProps,
  StepperStatus,
}
