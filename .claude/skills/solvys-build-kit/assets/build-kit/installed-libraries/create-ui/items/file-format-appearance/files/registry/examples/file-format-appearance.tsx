import { FileFormat } from "@/registry/pro/ui/file-format"

export default function FileFormatAppearance() {
  return (
    <div className="flex items-end gap-6">
      <FileFormat format="FIG" appearance="filled" />
      <FileFormat format="FIG" appearance="outline" />
    </div>
  )
}
