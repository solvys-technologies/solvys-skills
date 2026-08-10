import type { UploadFile } from "@/registry/hooks/use-file-upload"
import {
  FileUpload,
  FileUploadItem,
  FileUploadList,
} from "@/registry/pro/ui/file-upload"

const ROWS: UploadFile[] = [
  {
    id: "1",
    name: "annual-report.pdf",
    size: 2.3 * 1024 * 1024,
    format: "PDF",
    status: "uploading",
    progress: 64,
  },
  {
    id: "2",
    name: "logo.png",
    size: 480 * 1024,
    format: "PNG",
    status: "completed",
    progress: 100,
  },
]

export default function FileUploadListSizes() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-6">
      <FileUpload size="lg" multiple>
        <FileUploadList>
          {ROWS.map((file) => (
            <FileUploadItem key={file.id} file={file} />
          ))}
        </FileUploadList>
      </FileUpload>
      <FileUpload size="sm" multiple>
        <FileUploadList>
          {ROWS.map((file) => (
            <FileUploadItem key={`sm-${file.id}`} file={file} />
          ))}
        </FileUploadList>
      </FileUpload>
    </div>
  )
}
