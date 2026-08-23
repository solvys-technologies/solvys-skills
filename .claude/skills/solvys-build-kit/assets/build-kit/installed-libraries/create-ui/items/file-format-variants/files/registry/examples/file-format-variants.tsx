import { FileFormat } from "@/registry/pro/ui/file-format"

export default function FileFormatVariants() {
  return (
    <div className="flex items-end gap-6">
      <FileFormat format="PDF" variant="colorful-solid" />
      <FileFormat format="PDF" variant="colorful-soft" />
      <FileFormat format="PDF" variant="neutral-solid" />
      <FileFormat format="PDF" variant="neutral-soft" />
    </div>
  )
}
