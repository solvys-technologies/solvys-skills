import { FileFormat } from "@/registry/pro/ui/file-format"

export default function FileFormatSizes() {
  return (
    <div className="flex items-end gap-6">
      <FileFormat format="MP4" className="size-8" />
      <FileFormat format="MP4" className="size-12" />
      <FileFormat format="MP4" className="size-16" />
      <FileFormat format="MP4" className="size-20" />
    </div>
  )
}
