"use client"

import * as React from "react"
import { RiCheckboxCircleFill } from "@create-ui/assets/icons"
import { AnimatePresence, motion } from "motion/react"

import {
  Stepper,
  StepperActions,
  StepperContent,
  StepperContentHead,
  StepperDescription,
  StepperHeading,
  StepperIcon,
  StepperIndicator,
  StepperItem,
  StepperLine,
  StepperTitle,
  StepperTrigger,
} from "@/registry/pro/ui/stepper"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

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

export default function StepperDemoPro() {
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
    <div className="flex max-w-[340px] flex-col gap-4">
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
