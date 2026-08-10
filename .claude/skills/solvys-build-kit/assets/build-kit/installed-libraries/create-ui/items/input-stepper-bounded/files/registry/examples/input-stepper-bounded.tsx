"use client"

import * as React from "react"

import { InputStepper } from "@/registry/ui/input-stepper"

export default function InputStepperBounded() {
  const [seats, setSeats] = React.useState(1)
  const [tickets, setTickets] = React.useState(20)

  return (
    <div className="flex w-[280px] flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-ui-control-sm text-disabled font-medium">
          Seats (1–10, step 1)
        </span>
        <InputStepper
          value={seats}
          onValueChange={setSeats}
          min={1}
          max={10}
          step={1}
          aria-label="Seats"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-ui-control-sm text-disabled font-medium">
          Tickets (0–20, step 2)
        </span>
        <InputStepper
          value={tickets}
          onValueChange={setTickets}
          min={0}
          max={20}
          step={2}
          aria-label="Tickets"
        />
      </div>
    </div>
  )
}
