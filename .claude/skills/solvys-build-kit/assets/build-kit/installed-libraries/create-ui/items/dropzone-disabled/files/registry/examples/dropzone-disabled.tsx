import { Dropzone } from "@/registry/ui/dropzone"

export default function DropzoneDisabled() {
  return (
    <div className="w-full max-w-[400px]">
      <Dropzone
        disabled
        multiple
        accept=".zip,.pdf"
        maxSize={25 * 1024 * 1024}
      />
    </div>
  )
}
