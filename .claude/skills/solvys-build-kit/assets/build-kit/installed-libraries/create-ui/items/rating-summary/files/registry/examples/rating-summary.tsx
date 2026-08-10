import {
  Rating,
  RatingSummary,
  RatingSummaryDot,
  RatingSummaryReviews,
  RatingSummaryScore,
} from "@/registry/pro/ui/rating"
import {
  Avatar,
  AvatarGroup,
  AvatarGroupAction,
  AvatarImage,
} from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"

const people = [
  {
    src: "https://createui.co/avatars/ayla-karagoz.webp",
    name: "Ayla Karagöz",
  },
  {
    src: "https://createui.co/avatars/luca-moretti.webp",
    name: "Luca Moretti",
  },
  { src: "https://createui.co/avatars/yuki-tanaka.webp", name: "Yuki Tanaka" },
  { src: "https://createui.co/avatars/sofia-reis.webp", name: "Sofia Reis" },
]

function ReviewerPile() {
  return (
    <AvatarGroup size="xs">
      {people.map((person) => (
        <Avatar key={person.name}>
          <AvatarImage src={person.src} alt={person.name} />
        </Avatar>
      ))}
      <AvatarGroupAction>+7</AvatarGroupAction>
    </AvatarGroup>
  )
}

export default function RatingSummaryDemo() {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="flex flex-col justify-center gap-6">
        <RatingSummary tint="primary" shape="rounded" size="xs">
          <Rating readOnly value={1} max={1} />
          <RatingSummaryScore value={3.6} />
          <ReviewerPile />
        </RatingSummary>
        <RatingSummary tint="neutral-soft" shape="rounded" size="xs">
          <Rating readOnly value={1} max={1} />
          <RatingSummaryScore value={3.6} />
          <Badge variant="warning" appearance="solid" size="xs">
            Top Rated
          </Badge>
        </RatingSummary>
        <RatingSummary tint="neutral-outline" shape="rounded" size="xs">
          <Rating readOnly value={1} max={1} />
          <RatingSummaryScore value={3.6} />
          <RatingSummaryDot />
          <RatingSummaryReviews count={2341} />
        </RatingSummary>
        <RatingSummary tint="yellow" shape="rounded" size="xs">
          <Rating readOnly value={3.6} />
          <RatingSummaryScore value={3.6} />
        </RatingSummary>
      </div>
      <div className="flex flex-col gap-6">
        <RatingSummary layout="stacked" size="xs">
          <div className="gap-component-sm flex items-center">
            <Rating readOnly value={1} max={1} />
            <RatingSummaryScore value={3.6} />
            <Badge variant="warning" appearance="solid" size="xs">
              Top Rated
            </Badge>
          </div>
          <div className="gap-component-sm flex items-center">
            <ReviewerPile />
            <RatingSummaryReviews count={2341} href="#" />
          </div>
        </RatingSummary>
        <RatingSummary layout="stacked" size="xs">
          <Rating readOnly value={3.6} />
          <div className="gap-component-sm flex items-center">
            <RatingSummaryScore value={3.6} />
            <RatingSummaryDot />
            <RatingSummaryReviews count={2341} href="#" />
            <Badge variant="warning" appearance="solid" size="xs">
              Top Rated
            </Badge>
          </div>
          <ReviewerPile />
        </RatingSummary>
        <RatingSummary layout="row" size="xs">
          <div className="gap-component-sm flex items-center">
            <Rating readOnly value={1} max={1} />
            <RatingSummaryScore value={3.6} />
            <Badge variant="warning" appearance="solid" size="xs">
              Top Rated
            </Badge>
          </div>
          <div className="gap-component-sm flex items-center">
            <ReviewerPile />
            <RatingSummaryReviews count={2341} href="#" />
          </div>
        </RatingSummary>
      </div>
    </div>
  )
}
