"use client"

import * as React from "react"

import { Stepper, StepperBadgeItem } from "@/registry/ui/stepper"

const steps = [
  "Create your account",
  "Verify your email",
  "Set up your workspace",
  "Invite your team",
]

export default function StepperDemo() {
  const [active, setActive] = React.useState(2)

  return (
    <Stepper layout="badge" className="max-w-[280px]">
      {steps.map((title, i) => (
        <StepperBadgeItem
          key={title}
          status={i < active ? "completed" : i === active ? "active" : "locked"}
          number={`${i + 1}.`}
          title={title}
          onClick={() => setActive(i)}
          className="cursor-pointer"
        />
      ))}
    </Stepper>
  )
}
