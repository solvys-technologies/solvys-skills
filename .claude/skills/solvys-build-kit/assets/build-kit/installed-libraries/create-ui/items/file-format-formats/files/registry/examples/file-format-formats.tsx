import { FileFormat } from "@/registry/pro/ui/file-format"

export default function FileFormatFormats() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <FileFormat format="PDF" />
      <FileFormat format="DOC" />
      <FileFormat format="XLSX" />
      <FileFormat format="SQL" />
      <FileFormat format="HTML" />
      <FileFormat format="JSON" />
      <FileFormat format="PNG" />
      <FileFormat format="MP4" />
      <FileFormat format="MP3" />
      <FileFormat format="ZIP" />
    </div>
  )
}
