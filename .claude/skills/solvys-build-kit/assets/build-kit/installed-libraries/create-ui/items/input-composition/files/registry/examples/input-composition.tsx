import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select"

export default function InputComposition() {
  return (
    <div className="flex w-100 flex-col gap-4">
      <div className="flex w-full gap-2">
        <Input type="search" placeholder="Search…" className="flex-1" />
        <Button>Search</Button>
      </div>
      <div className="flex w-full gap-2">
        <Input type="text" placeholder="Enter amount" className="flex-1" />
        <Select defaultValue="usd">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">USD</SelectItem>
            <SelectItem value="eur">EUR</SelectItem>
            <SelectItem value="gbp">GBP</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
