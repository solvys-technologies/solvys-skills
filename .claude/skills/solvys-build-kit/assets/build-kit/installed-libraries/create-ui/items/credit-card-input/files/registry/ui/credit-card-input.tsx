"use client"

import * as React from "react"
import {
  RiBankCardLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
} from "@create-ui/assets/icons"
import {
  AmericanExpressBadge,
  DinnersClubBadge,
  DiscoverBadge,
  EloBadge,
  JcbBadge,
  MaestroBadge,
  MastercardBadge,
  UnionPayBadge,
  VisaBadge,
} from "@create-ui/assets/payments"

import {
  useCreditCardInput,
  type CardType,
} from "@/registry/hooks/use-credit-card-input"
import {
  InputGroup,
  InputGroupCard,
  InputGroupControl,
  InputGroupHelperIcon,
  InputGroupSlot,
  useInputGroup,
} from "@/registry/ui/input-group"

type InputSize = "xs" | "sm" | "md"

type CardBadge = React.ComponentType<React.SVGProps<SVGSVGElement>>

const CARD_BADGES: Partial<Record<CardType, CardBadge>> = {
  visa: VisaBadge,
  mastercard: MastercardBadge,
  "american-express": AmericanExpressBadge,
  "diners-club": DinnersClubBadge,
  discover: DiscoverBadge,
  jcb: JcbBadge,
  maestro: MaestroBadge,
  unionpay: UnionPayBadge,
  elo: EloBadge,
}

function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<T | null>).current = node
    }
  }
}

export interface CreditCardDetails {
  cardType: CardType | null
  isValid: boolean
  isPotentiallyValid: boolean
}

function CardValidationIcon({
  value,
  isValid,
  isPotentiallyValid,
}: {
  value: string
  isValid: boolean
  isPotentiallyValid: boolean
}) {
  const ctx = useInputGroup()
  if (ctx.loading || value.length === 0) return null
  if (isValid) {
    return (
      <InputGroupHelperIcon className="text-body" invalidIcon={null}>
        <RiCheckboxCircleLine />
      </InputGroupHelperIcon>
    )
  }
  if (!isPotentiallyValid) {
    return (
      <InputGroupHelperIcon className="text-error-base" invalidIcon={null}>
        <RiCloseCircleLine />
      </InputGroupHelperIcon>
    )
  }
  return null
}

type CreditCardInputProps = Omit<
  React.ComponentProps<"input">,
  "size" | "type" | "value" | "defaultValue" | "onChange"
> & {
  defaultValue?: string
  onValueChange?: (value: string, details: CreditCardDetails) => void
  size?: InputSize
  invalid?: boolean
  disabled?: boolean
  loading?: boolean
  showLeadingIcon?: boolean
  leading?: React.ReactNode
  showBadge?: boolean
  showValidationIcon?: boolean
  badges?: Partial<Record<CardType, CardBadge>>
  className?: string
  ref?: React.Ref<HTMLInputElement>
}

function CreditCardInput({
  ref,
  defaultValue,
  onValueChange,
  size,
  invalid,
  disabled,
  loading,
  showLeadingIcon = true,
  leading = <RiBankCardLine />,
  showBadge = true,
  showValidationIcon = true,
  badges = CARD_BADGES,
  placeholder,
  className,
  ...inputProps
}: CreditCardInputProps) {
  const card = useCreditCardInput({ defaultValue })
  const { unmaskedValue, cardType, isValid, isPotentiallyValid } = card

  const onValueChangeRef = React.useRef(onValueChange)
  onValueChangeRef.current = onValueChange
  const mountedRef = React.useRef(false)
  React.useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    onValueChangeRef.current?.(unmaskedValue, {
      cardType,
      isValid,
      isPotentiallyValid,
    })
  }, [unmaskedValue, cardType, isValid, isPotentiallyValid])

  const Badge = cardType ? badges[cardType] : undefined

  return (
    <InputGroup
      size={size}
      invalid={invalid}
      disabled={disabled}
      loading={loading}
      className={className}
    >
      <InputGroupSlot>
        {showLeadingIcon ? leading : null}
        <InputGroupControl
          ref={mergeRefs(card.ref, ref)}
          inputMode={card.inputMode}
          type={card.type}
          placeholder={placeholder ?? card.placeholder}
          {...inputProps}
        />
        {showValidationIcon ? (
          <CardValidationIcon
            value={unmaskedValue}
            isValid={isValid}
            isPotentiallyValid={isPotentiallyValid}
          />
        ) : null}
      </InputGroupSlot>
      {showBadge ? (
        <InputGroupCard>
          {Badge ? (
            <Badge />
          ) : (
            <RiBankCardLine className="text-placeholder size-4" />
          )}
        </InputGroupCard>
      ) : null}
    </InputGroup>
  )
}

export { CreditCardInput }
export type { CreditCardInputProps }
