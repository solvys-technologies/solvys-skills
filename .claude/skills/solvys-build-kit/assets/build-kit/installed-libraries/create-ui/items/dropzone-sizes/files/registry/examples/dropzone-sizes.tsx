import { Dropzone } from "@/registry/ui/dropzone"

export default function DropzoneSizes() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-6">
      <Dropzone size="sm" accept=".zip,.pdf" maxSize={25 * 1024 * 1024} />
      <Dropzone size="md" accept=".zip,.pdf" maxSize={25 * 1024 * 1024} />
      <Dropzone size="lg" accept=".zip,.pdf" maxSize={25 * 1024 * 1024} />
    </div>
  )
}
