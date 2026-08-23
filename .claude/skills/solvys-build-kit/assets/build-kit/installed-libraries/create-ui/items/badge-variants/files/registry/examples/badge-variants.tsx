import { Badge } from "@/registry/ui/badge"

export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Error</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="verified">Verified</Badge>
      <Badge variant="highlighted">Highlighted</Badge>
      <Badge variant="away">Away</Badge>
      <Badge variant="inverse">Inverse</Badge>
      <Badge variant="neutral-static">Neutral Static</Badge>
      <Badge variant="inverse-static">Inverse Static</Badge>
    </div>
  )
}
