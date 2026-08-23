import { AspectRatio } from "@/registry/ui/aspect-ratio"

// Every box is 100px tall, so each wrapper is 100px x ratio wide. The width has
// to sit on a wrapper: AspectRatio forwards className to its inner inset-0
// element, while the box that actually gets sized is a fixed width:100% parent.
export default function AspectRatioDemo() {
  return (
    <div className="flex w-full max-w-[390px] flex-col gap-6">
      <div className="flex items-center gap-6">
        <div className="w-[100px]">
          <AspectRatio
            ratio={1 / 1}
            className="from-light to-weak rounded-lg bg-gradient-to-br"
          />
        </div>
        <div className="w-[50px]">
          <AspectRatio
            ratio={1 / 2}
            className="from-light to-weak rounded-lg bg-gradient-to-br"
          />
        </div>
        <div className="w-[191px]">
          <AspectRatio
            ratio={1.91}
            className="from-light to-weak rounded-lg bg-gradient-to-br"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="w-[200px]">
          <AspectRatio
            ratio={2 / 1}
            className="from-light to-weak rounded-lg bg-gradient-to-br"
          />
        </div>
        <div className="w-[67px]">
          <AspectRatio
            ratio={2 / 3}
            className="from-light to-weak rounded-lg bg-gradient-to-br"
          />
        </div>
        <div className="w-[75px]">
          <AspectRatio
            ratio={3 / 4}
            className="from-light to-weak rounded-lg bg-gradient-to-br"
          />
        </div>
      </div>
    </div>
  )
}
