import { FileFormat } from "@/registry/pro/ui/file-format"

export default function FileFormatDemo() {
  return (
    <div className="flex items-end gap-6">
      <FileFormat format="PDF" />
      <FileFormat format="DOC" />
      <FileFormat format="XLSX" />
      <FileFormat format="JS" />
      <FileFormat format="PNG" />
      <FileFormat format="ZIP" />
    </div>
  )
}
