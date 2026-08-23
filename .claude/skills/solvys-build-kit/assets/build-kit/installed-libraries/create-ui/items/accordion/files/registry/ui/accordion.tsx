"use client"

import * as React from "react"
import { RiArrowDownSLine } from "@create-ui/assets/icons"
import { cva, type VariantProps } from "class-variance-authority"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/registry/lib/utils"

type Appearance =
  | "ghost-default"
  | "ghost-underline"
  | "ghost-rounded"
  | "outline-rounded"
  | "outline-sharp"
  | "filled-rounded"

const AccordionContext = React.createContext<{ appearance: Appearance }>({
  appearance: "ghost-default",
})

const useAccordion = () => React.useContext(AccordionContext)

const accordionVariants = cva("flex w-full min-w-0 flex-col", {
  variants: {
    appearance: {
      "ghost-default": "gap-component-sm",
      "ghost-underline": "",
      "ghost-rounded": "gap-component-sm",
      "outline-rounded": "gap-component-sm",
      "outline-sharp": "",
      "filled-rounded": "gap-component-sm",
    },
  },
  defaultVariants: { appearance: "ghost-default" },
})

const accordionItemVariants = cva(
  [
    // base
    "group/accordion-item relative",
    // transition
    "transition duration-200",
    // has-[trigger:focus-visible]
    "has-[[data-slot=accordion-trigger]:focus-visible]:z-10 has-[[data-slot=accordion-trigger]:focus-visible]:outline-2 has-[[data-slot=accordion-trigger]:focus-visible]:outline-strong has-[[data-slot=accordion-trigger]:focus-visible]:outline-offset-2",
  ],
  {
    variants: {
      appearance: {
        "ghost-default": "data-[state=open]:bg-static",
        "ghost-underline": [
          // base
          "border-weak border-b last:border-b-0",
          // has-[trigger:hover]
          "has-[[data-slot=accordion-trigger]:hover]:border-medium",
          // data-[state=open]
          "data-[state=open]:bg-static data-[state=open]:border-medium",
        ],
        "ghost-rounded": "",
        "outline-rounded": [
          // base
          "bg-static border-light shadow-neutral-2xs border",
          // has-[trigger:hover]
          "has-[[data-slot=accordion-trigger]:hover]:shadow-none",
          // has-[trigger:focus-visible]
          "has-[[data-slot=accordion-trigger]:focus-visible]:shadow-none",
          // has-[trigger:disabled]
          "has-[[data-slot=accordion-trigger]:disabled]:shadow-none",
          // data-[state=open]
          "data-[state=open]:border-medium",
        ],
        "outline-sharp": "border-light -mt-px border first:mt-0",
        "filled-rounded": [
          // base
          "bg-weakest border border-transparent",
          // data-[state=open]
          "data-[state=open]:border-light",
        ],
      },
    },
    compoundVariants: [
      {
        appearance: ["ghost-rounded", "outline-rounded", "filled-rounded"],
        class: "overflow-hidden rounded-xl",
      },
      {
        appearance: ["ghost-rounded", "outline-sharp", "filled-rounded"],
        class: "data-[state=open]:bg-weak",
      },
    ],
    defaultVariants: { appearance: "ghost-default" },
  }
)

const accordionTriggerVariants = cva(
  [
    // base
    "group/accordion-trigger relative flex w-full items-center gap-component-sm p-component-lg text-left outline-hidden text-body text-body-lg font-medium cursor-pointer",
    // transition
    "transition duration-200",
    // hover
    "hover:text-strongest",
    // disabled
    "disabled:cursor-not-allowed disabled:!text-disabled",
    // data-[state=open]
    "data-[state=open]:text-strongest",
    // data-[state=closed]:focus-visible
    "data-[state=closed]:focus-visible:bg-static",
  ],
  {
    variants: {
      appearance: {
        "ghost-default": "px-component-none",
        "ghost-underline": "",
        "ghost-rounded": "",
        "outline-rounded": "",
        "outline-sharp": "",
        "filled-rounded": [
          // data-[state=closed]:hover
          "data-[state=closed]:hover:bg-weak",
          // data-[state=closed]:focus-visible
          "data-[state=closed]:focus-visible:bg-weakest",
        ],
      },
    },
    compoundVariants: [
      {
        appearance: ["ghost-rounded", "outline-rounded", "outline-sharp"],
        class: "data-[state=closed]:hover:bg-weakest",
      },
    ],
    defaultVariants: { appearance: "ghost-default" },
  }
)

const accordionContentVariants = cva("p-component-lg pt-component-none ", {
  variants: {
    appearance: {
      "ghost-default": "p-component-none",
      "ghost-underline": "",
      "ghost-rounded": "",
      "outline-rounded": "",
      "outline-sharp": "",
      "filled-rounded": "",
    },
  },
  defaultVariants: { appearance: "ghost-default" },
})

type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Root> &
  VariantProps<typeof accordionVariants>

function Accordion({
  className,
  appearance = "ghost-default",
  ...props
}: AccordionProps) {
  return (
    <AccordionContext.Provider value={{ appearance: appearance! }}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        data-appearance={appearance}
        className={cn(accordionVariants({ appearance }), className)}
        {...props}
      />
    </AccordionContext.Provider>
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const { appearance } = useAccordion()
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordionItemVariants({ appearance }), className)}
      {...props}
    />
  )
}

type AccordionTriggerProps = React.ComponentProps<
  typeof AccordionPrimitive.Trigger
> & {
  icon?: React.ReactNode
}

function AccordionTrigger({
  className,
  children,
  icon,
  ...props
}: AccordionTriggerProps) {
  const { appearance } = useAccordion()
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(accordionTriggerVariants({ appearance }), className)}
        {...props}
      >
        {icon && (
          <span
            data-slot="accordion-trigger-icon"
            className="shrink-0 [&_svg]:size-5"
          >
            {icon}
          </span>
        )}
        <span
          data-slot="accordion-trigger-label"
          className="gap-component-sm flex min-w-0 flex-1 items-center"
        >
          {children}
        </span>
        <RiArrowDownSLine
          data-slot="accordion-trigger-chevron"
          className="text-placeholder group-data-[state=open]/accordion-trigger:text-body group-disabled/accordion-trigger:!text-disabled size-5 shrink-0 transition-[color,rotate] duration-200 group-data-[state=open]/accordion-trigger:-rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  forceMount,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const { appearance } = useAccordion()
  return (
    <AccordionPrimitive.Content
      forceMount={forceMount}
      data-slot="accordion-content"
      className={cn(
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down text-strongest text-paragraph-sm overflow-hidden duration-250",
        forceMount && "data-[state=closed]:hidden"
      )}
      {...props}
    >
      <div
        className={cn(
          "flex flex-col gap-4",
          accordionContentVariants({ appearance }),
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
