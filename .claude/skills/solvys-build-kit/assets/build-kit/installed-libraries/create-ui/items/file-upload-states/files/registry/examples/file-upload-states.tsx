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
    progress: 16,
  },
  {
    id: "2",
    name: "design-assets.zip",
    size: 12 * 1024 * 1024,
    format: "ZIP",
    status: "queued",
    progress: 0,
  },
  {
    id: "3",
    name: "promo-video.mp4",
    size: 8 * 1024 * 1024,
    format: "MP4",
    status: "paused",
    progress: 45,
  },
  {
    id: "4",
    name: "logo.png",
    size: 480 * 1024,
    format: "PNG",
    status: "completed",
    progress: 100,
  },
  {
    id: "5",
    name: "huge-archive.zip",
    size: 30 * 1024 * 1024,
    format: "ZIP",
    status: "error",
    progress: 0,
    error: "File exceeds the 25MB limit",
  },
]

export default function FileUploadStates() {
  return (
    <div className="w-full max-w-[400px]">
      <FileUpload multiple>
        <FileUploadList>
          {ROWS.map((file) => (
            <FileUploadItem key={file.id} file={file} />
          ))}
        </FileUploadList>
      </FileUpload>
    </div>
  )
}
