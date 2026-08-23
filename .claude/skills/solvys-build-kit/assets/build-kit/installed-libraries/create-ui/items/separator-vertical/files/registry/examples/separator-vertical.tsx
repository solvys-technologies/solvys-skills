import { Separator } from "@/registry/pro/ui/separator"

export default function SeparatorVertical() {
  return (
    <div className="flex flex-col gap-8">
      {/* Plain vertical dividers between inline items. */}
      <div className="text-body text-ui-control-md flex items-center gap-4">
        <span>Docs</span>
        <Separator direction="vertical" className="h-5" />
        <span>API</span>
        <Separator direction="vertical" className="h-5" />
        <span>Support</span>
      </div>
      {/* Vertical rule with a centered label between two panels. */}
      <div className="flex h-24 items-stretch gap-4">
        <div className="bg-weak flex-1 rounded-lg" />
        <Separator direction="vertical">OR</Separator>
        <div className="bg-weak flex-1 rounded-lg" />
      </div>
    </div>
  )
}
