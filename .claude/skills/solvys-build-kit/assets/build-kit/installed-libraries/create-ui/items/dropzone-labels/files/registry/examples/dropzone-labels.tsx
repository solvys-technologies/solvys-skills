import { Dropzone } from "@/registry/ui/dropzone"

export default function DropzoneLabels() {
  return (
    <div className="w-full max-w-[400px]">
      <Dropzone
        accept=".pdf,.docx,.png,.jpg"
        maxSize={10 * 1024 * 1024}
        title="Drag files here or click to browse"
        description="PDF, DOCX, PNG, or JPG up to 10 MB."
      />
    </div>
  )
}
