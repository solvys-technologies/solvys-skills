import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const prefixed =
  (...groups: string[]) =>
  (value: string) =>
    groups.some((group) => value.startsWith(`${group}-`))

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        prefixed(
          "ui",
          "body",
          "paragraph",
          "heading",
          "display",
          "numeric",
          "code"
        ),
      ],
      font: ["display", "body", "numeric"],
      spacing: [prefixed("component", "layout", "section")],
      radius: [prefixed("component")],
      shadow: [prefixed("neutral", "component")],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
