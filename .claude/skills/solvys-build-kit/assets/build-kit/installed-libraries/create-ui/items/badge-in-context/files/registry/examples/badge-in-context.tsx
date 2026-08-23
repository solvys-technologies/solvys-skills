import {
  RiArchiveLine,
  RiAtLine,
  RiDraftLine,
  RiInboxLine,
} from "@create-ui/assets/icons"

import { cn } from "@/registry/lib/utils"
import { Badge } from "@/registry/ui/badge"

const navItems = [
  { icon: RiInboxLine, label: "Inbox", count: 12, variant: "primary" },
  { icon: RiAtLine, label: "Mentions", count: 3, variant: "neutral" },
  { icon: RiDraftLine, label: "Drafts", count: 2, variant: "neutral" },
  { icon: RiArchiveLine, label: "Archive", count: null, variant: "neutral" },
] as const

const invoices = [
  { id: "INV-2043", amount: "$1,200.00", status: "Paid", variant: "success" },
  { id: "INV-2044", amount: "$480.00", status: "Pending", variant: "warning" },
  { id: "INV-2045", amount: "$3,150.00", status: "Paid", variant: "success" },
  { id: "INV-2046", amount: "$920.00", status: "Failed", variant: "danger" },
] as const

export default function BadgeInContext() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-6 md:flex-row md:items-start">
      <nav className="border-light w-full overflow-hidden rounded-2xl border md:w-56">
        <ul>
          {navItems.map((item, index) => {
            const Icon = item.icon
            const active = index === 0
            return (
              <li
                key={item.label}
                className={cn(
                  "text-body border-light flex items-center gap-2 border-b px-3 py-2.5 text-sm last:border-b-0",
                  active ? "bg-weak" : "hover:bg-weakest"
                )}
              >
                <Icon className="text-placeholder size-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                {item.count !== null && (
                  <Badge variant={item.variant} numberOnly>
                    {item.count}
                  </Badge>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-light w-full overflow-hidden rounded-2xl border md:flex-1">
        <div className="border-light flex items-center gap-2 border-b px-3 py-2.5">
          <span className="text-body flex-1 text-sm font-medium">Invoices</span>
          <Badge variant="primary" size="xs" shape="pill">
            NEW
          </Badge>
        </div>
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="border-light hover:bg-weakest flex items-center gap-3 border-b px-3 py-2.5 last:border-b-0"
          >
            <span className="text-body min-w-0 flex-1 truncate text-sm font-medium">
              {invoice.id}
            </span>
            <span className="text-placeholder text-sm tabular-nums">
              {invoice.amount}
            </span>
            <Badge variant={invoice.variant} shape="pill">
              {invoice.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
