"use client"

import * as React from "react"
import {
  RiRocketLine,
  RiSettings3Line,
  RiTeamLine,
  RiUser3Line,
} from "@create-ui/assets/icons"

import { Stepper, StepperBadgeItem } from "@/registry/ui/stepper"

const steps = [
  { icon: <RiUser3Line />, title: "Create your account" },
  { icon: <RiSettings3Line />, title: "Set up your workspace" },
  { icon: <RiTeamLine />, title: "Invite your team" },
  { icon: <RiRocketLine />, title: "Launch your project" },
]

export default function StepperBadge() {
  const [active, setActive] = React.useState(2)

  return (
    <Stepper layout="badge" className="max-w-[300px]">
      {steps.map((step, i) => (
        <StepperBadgeItem
          key={step.title}
          status={i < active ? "completed" : i === active ? "active" : "locked"}
          leadIcon={step.icon}
          number={`${i + 1}.`}
          title={step.title}
          onClick={() => setActive(i)}
          className="cursor-pointer"
        />
      ))}
    </Stepper>
  )
}
