import { RiTerminalBoxFill } from "@create-ui/assets/icons"

import { SectionFrame } from "@/registry/components/example"
import {
  FileFormat,
  type FileFormatAppearance,
  type FileFormatVariant,
} from "@/registry/pro/ui/file-format"

// The full format series from Figma.
const FORMATS = [
  "PDF",
  "DOC",
  "TXT",
  "RTF",
  "MD",
  "MDX",
  "XLSX",
  "CSV",
  "PPTX",
  "SQL",
  "CSS",
  "XML",
  "JS",
  "TSX",
  "JSX",
  "HTML",
  "JSON",
  "YAML",
  "PNG",
  "JPG",
  "SVG",
  "GIF",
  "WEBP",
  "AVIF",
  "HEIC",
  "MP4",
  "MOV",
  "WEBM",
  "MP3",
  "WAV",
  "FIG",
  "AI",
  "PSD",
  "CDR",
  "AEP",
  "ZIP",
  "RAR",
  "7Z",
  "DMG",
  "CUSTOM",
]

// Every appearance × variant series, each shown across all formats.
const SERIES: {
  appearance: FileFormatAppearance
  variant: FileFormatVariant
  title: string
}[] = [
  {
    appearance: "filled",
    variant: "colorful-solid",
    title: "Colorful · Solid · Filled",
  },
  {
    appearance: "outline",
    variant: "colorful-solid",
    title: "Colorful · Solid · Outline",
  },
  {
    appearance: "filled",
    variant: "colorful-soft",
    title: "Colorful · Soft · Filled",
  },
  {
    appearance: "outline",
    variant: "colorful-soft",
    title: "Colorful · Soft · Outline",
  },
  {
    appearance: "filled",
    variant: "neutral-solid",
    title: "Neutral · Solid · Filled",
  },
  {
    appearance: "outline",
    variant: "neutral-solid",
    title: "Neutral · Solid · Outline",
  },
  {
    appearance: "filled",
    variant: "neutral-soft",
    title: "Neutral · Soft · Filled",
  },
  {
    appearance: "outline",
    variant: "neutral-soft",
    title: "Neutral · Soft · Outline",
  },
]

export default function FileFormatExample() {
  return (
    <div className="flex flex-col items-start gap-16">
      <CustomFormats />
      <ProportionalScale />
      <SizedByClassName />
      {SERIES.map(({ appearance, variant, title }) => (
        <FormatGallery
          key={title}
          appearance={appearance}
          variant={variant}
          title={title}
        />
      ))}
    </div>
  )
}

function FormatGallery({
  appearance,
  variant,
  title,
}: {
  appearance: FileFormatAppearance
  variant: FileFormatVariant
  title: string
}) {
  return (
    <SectionFrame title={title}>
      <div className="grid grid-cols-10 gap-6">
        {FORMATS.map((format) => (
          <FileFormat
            key={format}
            format={format}
            appearance={appearance}
            variant={variant}
            className="size-12"
          />
        ))}
      </div>
    </SectionFrame>
  )
}

// Any format the lookup doesn't know becomes fully consumer-driven: pass your
// own `color` (a single string, or a {strong, light} pair for depth), `icon`,
// and `label`. With no `color`, an unknown format reads neutral on its own.
function CustomFormats() {
  return (
    <SectionFrame title="Custom — driven by color, icon, and label props">
      <div className="flex items-end gap-8">
        <FileFormat format="ENV" color="var(--color-indigo-500)" />
        <FileFormat
          format="LOCK"
          color={{
            strong: "var(--color-teal-600)",
            light: "var(--color-teal-400)",
          }}
        />
        <FileFormat
          format="SH"
          label="SH"
          color={{
            strong: "#7CCF00",
            light: "#9AE600",
          }}
          icon={<RiTerminalBoxFill />}
        />
        <FileFormat format="UNKNOWN" />
        {/* A long label is clipped to the page outline, never spilling out. */}
        <FileFormat
          format="DATABASE"
          color={{
            strong: "#FF2056",
            light: "#FF637E",
          }}
        />
      </div>
    </SectionFrame>
  )
}

// The core point: one component, sized with className, scales everything
// proportionally — text, content lines, folded corner, and the border.
function ProportionalScale() {
  return (
    <SectionFrame title="Proportional scaling — everything scales with the box">
      <div className="flex items-end gap-8">
        <FileFormat format="PDF" className="size-6" />
        <FileFormat format="PDF" className="size-10" />
        <FileFormat format="PDF" className="size-16" />
        <FileFormat format="PDF" className="size-24" />
        <FileFormat format="PDF" className="size-40" />
      </div>
    </SectionFrame>
  )
}

function SizedByClassName() {
  return (
    <SectionFrame title="Sized by className — square footprint, any size">
      <div className="flex items-end gap-8">
        <FileFormat format="PDF" className="size-8" />
        <FileFormat format="PDF" className="size-12" />
        <FileFormat format="PDF" className="size-20" />
      </div>
    </SectionFrame>
  )
}
