export default function RoundedComponentDemo() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-center gap-2">
        <div className="bg-strongest rounded-component-none size-20" />
        <span className="text-body-xs text-weak">none</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="bg-strongest rounded-component-sm size-20" />
        <span className="text-body-xs text-weak">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="bg-strongest rounded-component-md size-20" />
        <span className="text-body-xs text-weak">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="bg-strongest rounded-component-lg size-20" />
        <span className="text-body-xs text-weak">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="bg-strongest rounded-component-xl size-20" />
        <span className="text-body-xs text-weak">xl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="bg-strongest rounded-component-2xl size-20" />
        <span className="text-body-xs text-weak">2xl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="bg-strongest rounded-component-3xl size-20" />
        <span className="text-body-xs text-weak">3xl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="bg-strongest rounded-component-4xl size-20" />
        <span className="text-body-xs text-weak">4xl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="bg-strongest rounded-component-5xl size-20" />
        <span className="text-body-xs text-weak">5xl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="bg-strongest rounded-component-full size-20" />
        <span className="text-body-xs text-weak">full</span>
      </div>
    </div>
  )
}
