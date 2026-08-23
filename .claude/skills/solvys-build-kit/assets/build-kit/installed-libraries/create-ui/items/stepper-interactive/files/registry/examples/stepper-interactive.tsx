"use client"

import * as React from "react"
import { RiCheckboxCircleFill } from "@create-ui/assets/icons"

import {
  Stepper,
  StepperActions,
  StepperContent,
  StepperContentHead,
  StepperDescription,
  StepperIcon,
  StepperIndicator,
  StepperItem,
  StepperLine,
  StepperTitle,
  StepperTrigger,
} from "@/registry/pro/ui/stepper"
import { Button } from "@/registry/ui/button"

const steps = [
  {
    title: "Create your account",
    description: "Set your email and a password to get started.",
  },
  {
    title: "Set up your workspace",
    description: "Name your workspace and pick a URL.",
  },
  {
    title: "Invite your team",
    description: "Add teammates so they can collaborate with you.",
  },
  {
    title: "Install the CLI",
    description: "Run the install command to finish setting up.",
  },
]

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

export default function StepperInteractive() {
  const total = steps.length
  const [active, setActive] = React.useState(1)
  const [filling, setFilling] = React.useState(false)
  const [armed, setArmed] = React.useState(false)
  const [instant, setInstant] = React.useState(false)
  const raf = React.useRef<number | null>(null)
  const done = active >= total
  const reduced = usePrefersReducedMotion()

  React.useEffect(
    () => () => {
      if (raf.current != null) cancelAnimationFrame(raf.current)
    },
    []
  )

  const statusFor = (i: number) =>
    i < active ? "completed" : i === active ? "active" : "locked"

  const runFill = () => {
    if (reduced) {
      setActive((a) => a + 1)
      return
    }
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
  }

  const jumpTo = (i: number) => {
    if (raf.current != null) cancelAnimationFrame(raf.current)
    setFilling(false)
    setArmed(false)
    setInstant(false)
    setActive(i)
  }

  const advance = () => {
    if (filling) return
    if (active >= total - 1) setActive((a) => a + 1)
    else runFill()
  }

  const navTo = (i: number) => {
    if (filling || i === active) return
    if (i === active + 1) runFill()
    else jumpTo(i)
  }

  const handleFillEnd = () => {
    setArmed(false)
    setActive((a) => a + 1)
    setFilling(false)
  }

  return (
    <div className="flex max-w-[340px] flex-col gap-4">
      <Stepper orientation="vertical">
        {steps.map((step, i) => {
          const status = statusFor(i)
          const isActive = i === active
          const activeLine = isActive ? (
            <StepperLine
              variant="neutral-light"
              appearance="soft"
              fill={armed}
              fillVariant="info"
              duration={instant ? 0 : 650}
              onFillEnd={!instant && filling ? handleFillEnd : undefined}
            />
          ) : undefined
          return (
            <StepperItem key={step.title} status={status}>
              <StepperIndicator line={activeLine}>
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden
                  onClick={() => navTo(i)}
                  disabled={filling}
                  className="focus-visible:outline-primary-base cursor-pointer rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default"
                >
                  <StepperIcon>
                    {status === "completed" ? undefined : i + 1}
                  </StepperIcon>
                </button>
              </StepperIndicator>
              <StepperContent>
                <StepperContentHead>
                  {status === "completed" ? (
                    <StepperTrigger
                      className="min-w-0 flex-1 cursor-pointer"
                      onClick={() => navTo(i)}
                    >
                      <StepperTitle>{step.title}</StepperTitle>
                    </StepperTrigger>
                  ) : (
                    <StepperTitle>{step.title}</StepperTitle>
                  )}
                  <StepperDescription>{step.description}</StepperDescription>
                </StepperContentHead>
                {status === "active" && (
                  <StepperActions>
                    <Button
                      size="sm"
                      variant="neutral-solid"
                      onClick={advance}
                      disabled={filling}
                    >
                      {i === total - 1 ? "Finish" : "Continue"}
                    </Button>
                    {i > 0 && (
                      <Button
                        size="sm"
                        variant="neutral-solid"
                        appearance="soft"
                        onClick={() => jumpTo(i - 1)}
                        disabled={filling}
                      >
                        Back
                      </Button>
                    )}
                  </StepperActions>
                )}
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
            onClick={() => jumpTo(0)}
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  )
}
