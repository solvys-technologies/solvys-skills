import { Button } from "@/registry/ui/button"

export default function ButtonVariants() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="neutral-solid">Neutral Solid</Button>
        <Button variant="neutral-light">Neutral Light</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="bg-strongest flex w-fit flex-wrap items-center justify-center gap-2 rounded-3xl p-3">
        <Button variant="inverse-solid">Inverse Solid</Button>
        <Button variant="inverse-light">Inverse Light</Button>
      </div>
    </div>
  )
}
