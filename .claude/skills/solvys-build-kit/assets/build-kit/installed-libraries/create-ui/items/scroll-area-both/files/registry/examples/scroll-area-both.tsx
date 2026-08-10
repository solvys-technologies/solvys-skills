import { ScrollArea } from "@/registry/ui/scroll-area"

export default function ScrollAreaBoth() {
  return (
    <ScrollArea
      orientation="both"
      className="bg-weakest text-strong h-72 w-full max-w-96 rounded-md"
    >
      <div className="w-[640px] p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">
          Release matrix
        </h4>
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="bg-weak flex h-16 items-center justify-center rounded-md text-xs font-medium"
            >
              v1.{Math.floor(i / 6)}.{i % 6}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
