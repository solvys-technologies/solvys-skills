import { RiTerminalBoxFill } from "@create-ui/assets/icons"

import { FileFormat } from "@/registry/pro/ui/file-format"

export default function FileFormatCustom() {
  return (
    <div className="flex items-end gap-6">
      <FileFormat format="ENV" color="var(--color-indigo-500)" />
      <FileFormat
        format="LOCK"
        color={{
          strong: "var(--color-teal-600)",
          light: "var(--color-teal-400)",
        }}
      />
      <FileFormat
        format="SH"
        label="SH"
        color={{ strong: "#7CCF00", light: "#9AE600" }}
        icon={<RiTerminalBoxFill />}
      />
      <FileFormat format="CRUI" />
    </div>
  )
}
