import { Button } from "@/registry/ui/button"
import { Spinner } from "@/registry/ui/spinner"

export default function SpinnerLoading() {
  return (
    <div className="grid w-full max-w-3xl items-start gap-4 sm:grid-cols-3">
      {/* Save action: the spinner rides inside a pending primary button. */}
      <div className="border-weak bg-static flex flex-col gap-4 rounded-xl border p-6">
        <span className="text-ui-control-sm text-disabled font-medium">
          Account
        </span>
        <Button loading className="w-full">
          Saving...
        </Button>
      </div>

      {/* Panel placeholder: a large spinner centered on a loading surface. */}
      <div className="border-weak bg-static flex flex-col gap-4 rounded-xl border p-6">
        <span className="text-ui-control-sm text-disabled font-medium">
          Reports
        </span>
        <div className="bg-weak flex min-h-32 flex-col items-center justify-center gap-2 rounded-lg">
          <Spinner size="lg" />
          <span className="text-ui-control-sm text-body">Loading data</span>
        </div>
      </div>

      {/* Inline status: a small spinner leads a row with a muted timestamp. */}
      <div className="border-weak bg-static flex flex-col gap-4 rounded-xl border p-6">
        <span className="text-ui-control-sm text-disabled font-medium">
          Backup
        </span>
        <div className="flex items-center gap-2">
          <Spinner size="xs" />
          <span className="text-ui-control-sm text-body">Syncing changes</span>
          <span className="text-ui-control-sm text-disabled ml-auto">
            2m ago
          </span>
        </div>
      </div>
    </div>
  )
}
