"use client"

import * as React from "react"
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  Metadata,
  type CountryCode,
} from "libphonenumber-js/min"

export type PhoneCountryCode = CountryCode

export interface PhoneCountryConfig {
  code: CountryCode
  name: string
  flag: string
  dialCode: string
}

const COUNTRY_NAMES: Partial<Record<CountryCode, string>> = {
  AC: "Ascension Island",
  AD: "Andorra",
  AE: "United Arab Emirates",
  AF: "Afghanistan",
  AG: "Antigua & Barbuda",
  AI: "Anguilla",
  AL: "Albania",
  AM: "Armenia",
  AO: "Angola",
  AR: "Argentina",
  AS: "American Samoa",
  AT: "Austria",
  AU: "Australia",
  AW: "Aruba",
  AX: "Åland Islands",
  AZ: "Azerbaijan",
  BA: "Bosnia & Herzegovina",
  BB: "Barbados",
  BD: "Bangladesh",
  BE: "Belgium",
  BF: "Burkina Faso",
  BG: "Bulgaria",
  BH: "Bahrain",
  BI: "Burundi",
  BJ: "Benin",
  BL: "St. Barthélemy",
  BM: "Bermuda",
  BN: "Brunei",
  BO: "Bolivia",
  BQ: "Caribbean Netherlands",
  BR: "Brazil",
  BS: "Bahamas",
  BT: "Bhutan",
  BW: "Botswana",
  BY: "Belarus",
  BZ: "Belize",
  CA: "Canada",
  CC: "Cocos (Keeling) Islands",
  CD: "Congo - Kinshasa",
  CF: "Central African Republic",
  CG: "Congo - Brazzaville",
  CH: "Switzerland",
  CI: "Côte d’Ivoire",
  CK: "Cook Islands",
  CL: "Chile",
  CM: "Cameroon",
  CN: "China",
  CO: "Colombia",
  CR: "Costa Rica",
  CU: "Cuba",
  CV: "Cape Verde",
  CW: "Curaçao",
  CX: "Christmas Island",
  CY: "Cyprus",
  CZ: "Czechia",
  DE: "Germany",
  DJ: "Djibouti",
  DK: "Denmark",
  DM: "Dominica",
  DO: "Dominican Republic",
  DZ: "Algeria",
  EC: "Ecuador",
  EE: "Estonia",
  EG: "Egypt",
  EH: "Western Sahara",
  ER: "Eritrea",
  ES: "Spain",
  ET: "Ethiopia",
  FI: "Finland",
  FJ: "Fiji",
  FK: "Falkland Islands",
  FM: "Micronesia",
  FO: "Faroe Islands",
  FR: "France",
  GA: "Gabon",
  GB: "United Kingdom",
  GD: "Grenada",
  GE: "Georgia",
  GF: "French Guiana",
  GG: "Guernsey",
  GH: "Ghana",
  GI: "Gibraltar",
  GL: "Greenland",
  GM: "Gambia",
  GN: "Guinea",
  GP: "Guadeloupe",
  GQ: "Equatorial Guinea",
  GR: "Greece",
  GT: "Guatemala",
  GU: "Guam",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HK: "Hong Kong SAR China",
  HN: "Honduras",
  HR: "Croatia",
  HT: "Haiti",
  HU: "Hungary",
  ID: "Indonesia",
  IE: "Ireland",
  IL: "Israel",
  IM: "Isle of Man",
  IN: "India",
  IO: "British Indian Ocean Territory",
  IQ: "Iraq",
  IR: "Iran",
  IS: "Iceland",
  IT: "Italy",
  JE: "Jersey",
  JM: "Jamaica",
  JO: "Jordan",
  JP: "Japan",
  KE: "Kenya",
  KG: "Kyrgyzstan",
  KH: "Cambodia",
  KI: "Kiribati",
  KM: "Comoros",
  KN: "St. Kitts & Nevis",
  KP: "North Korea",
  KR: "South Korea",
  KW: "Kuwait",
  KY: "Cayman Islands",
  KZ: "Kazakhstan",
  LA: "Laos",
  LB: "Lebanon",
  LC: "St. Lucia",
  LI: "Liechtenstein",
  LK: "Sri Lanka",
  LR: "Liberia",
  LS: "Lesotho",
  LT: "Lithuania",
  LU: "Luxembourg",
  LV: "Latvia",
  LY: "Libya",
  MA: "Morocco",
  MC: "Monaco",
  MD: "Moldova",
  ME: "Montenegro",
  MF: "St. Martin",
  MG: "Madagascar",
  MH: "Marshall Islands",
  MK: "North Macedonia",
  ML: "Mali",
  MM: "Myanmar (Burma)",
  MN: "Mongolia",
  MO: "Macao SAR China",
  MP: "Northern Mariana Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MS: "Montserrat",
  MT: "Malta",
  MU: "Mauritius",
  MV: "Maldives",
  MW: "Malawi",
  MX: "Mexico",
  MY: "Malaysia",
  MZ: "Mozambique",
  NA: "Namibia",
  NC: "New Caledonia",
  NE: "Niger",
  NF: "Norfolk Island",
  NG: "Nigeria",
  NI: "Nicaragua",
  NL: "Netherlands",
  NO: "Norway",
  NP: "Nepal",
  NR: "Nauru",
  NU: "Niue",
  NZ: "New Zealand",
  OM: "Oman",
  PA: "Panama",
  PE: "Peru",
  PF: "French Polynesia",
  PG: "Papua New Guinea",
  PH: "Philippines",
  PK: "Pakistan",
  PL: "Poland",
  PM: "St. Pierre & Miquelon",
  PR: "Puerto Rico",
  PS: "Palestinian Territories",
  PT: "Portugal",
  PW: "Palau",
  PY: "Paraguay",
  QA: "Qatar",
  RE: "Réunion",
  RO: "Romania",
  RS: "Serbia",
  RU: "Russia",
  RW: "Rwanda",
  SA: "Saudi Arabia",
  SB: "Solomon Islands",
  SC: "Seychelles",
  SD: "Sudan",
  SE: "Sweden",
  SG: "Singapore",
  SH: "St. Helena",
  SI: "Slovenia",
  SJ: "Svalbard & Jan Mayen",
  SK: "Slovakia",
  SL: "Sierra Leone",
  SM: "San Marino",
  SN: "Senegal",
  SO: "Somalia",
  SR: "Suriname",
  SS: "South Sudan",
  ST: "São Tomé & Príncipe",
  SV: "El Salvador",
  SX: "Sint Maarten",
  SY: "Syria",
  SZ: "Eswatini",
  TA: "Tristan da Cunha",
  TC: "Turks & Caicos Islands",
  TD: "Chad",
  TG: "Togo",
  TH: "Thailand",
  TJ: "Tajikistan",
  TK: "Tokelau",
  TL: "Timor-Leste",
  TM: "Turkmenistan",
  TN: "Tunisia",
  TO: "Tonga",
  TR: "Türkiye",
  TT: "Trinidad & Tobago",
  TV: "Tuvalu",
  TW: "Taiwan",
  TZ: "Tanzania",
  UA: "Ukraine",
  UG: "Uganda",
  US: "United States",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VA: "Vatican City",
  VC: "St. Vincent & Grenadines",
  VE: "Venezuela",
  VG: "British Virgin Islands",
  VI: "U.S. Virgin Islands",
  VN: "Vietnam",
  VU: "Vanuatu",
  WF: "Wallis & Futuna",
  WS: "Samoa",
  XK: "Kosovo",
  YE: "Yemen",
  YT: "Mayotte",
  ZA: "South Africa",
  ZM: "Zambia",
  ZW: "Zimbabwe",
}
const toFlag = (code: string) =>
  String.fromCodePoint(...code.split("").map((c) => 127397 + c.charCodeAt(0)))

export const PHONE_COUNTRIES: Record<CountryCode, PhoneCountryConfig> =
  Object.fromEntries(
    getCountries().map((code) => [
      code,
      {
        code,
        flag: toFlag(code),
        name: COUNTRY_NAMES[code] ?? code,
        dialCode: `+${getCountryCallingCode(code)}`,
      },
    ])
  ) as Record<CountryCode, PhoneCountryConfig>

export interface PhoneValue {
  value: string
  country: CountryCode
  dialCode: string
  nationalNumber: string
  isPossible: boolean
  isValid: boolean
}

export interface UsePhoneInputOptions {
  defaultValue?: string
  defaultCountry?: CountryCode
  country?: CountryCode
  onCountryChange?: (country: CountryCode) => void
  onValueChange?: (value: PhoneValue) => void
}

export interface UsePhoneInputReturn {
  input: {
    ref: React.RefObject<HTMLInputElement | null>
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    inputMode: "tel"
    type: "tel"
    placeholder: string
  }
  country: CountryCode
  setCountry: (country: CountryCode) => void
  config: PhoneCountryConfig
  countries: Record<CountryCode, PhoneCountryConfig>
  digits: string
  value: PhoneValue
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

const onlyDigits = (value: string) => value.replace(/\D/g, "")

const isDigit = (char: string) => char >= "0" && char <= "9"

type NumberingPlanInternals = {
  nationalPrefix?: () => string | undefined
  nationalNumberPattern?: () => string | undefined
}

type PlanFacts = {
  trunkPrefix: string
  maxDigits: number
  pattern: RegExp | undefined
}

const PLANS = new Map<CountryCode, PlanFacts>()

function planOf(country: CountryCode): PlanFacts {
  const cached = PLANS.get(country)
  if (cached) return cached

  const facts: PlanFacts = {
    trunkPrefix: "",
    maxDigits: 0,
    pattern: undefined,
  }
  try {
    const metadata = new Metadata()
    metadata.selectNumberingPlan(country)
    const plan = metadata.numberingPlan
    const internals = plan as unknown as NumberingPlanInternals | undefined
    const lengths = plan?.possibleLengths() ?? []
    const source = internals?.nationalNumberPattern?.()

    facts.maxDigits = lengths.length ? Math.max(...lengths) : 0
    facts.trunkPrefix = internals?.nationalPrefix?.() ?? ""
    facts.pattern = source ? new RegExp(`^(?:${source})$`) : undefined
  } catch {
    // metadata unavailable for this country: every fact stays neutral
  }

  PLANS.set(country, facts)
  return facts
}

function dropLeadingDigits(formatted: string, count: number): string {
  let remaining = count
  let rest = ""

  for (const char of formatted) {
    if (remaining > 0 && char >= "0" && char <= "9") {
      remaining--
      continue
    }
    rest += char
  }

  if (remaining > 0) return ""
  return rest.replace(/^\(\s*\)/, "").replace(/^[\s\-./]+/, "")
}

function accepted(formatted: string, digits: string): string | undefined {
  return formatted && formatted !== digits && onlyDigits(formatted) === digits
    ? formatted
    : undefined
}

function formatWithNationalPattern(
  digits: string,
  country: CountryCode
): string | undefined {
  const national = accepted(new AsYouType(country).input(digits) ?? "", digits)
  if (national) return national

  const prefix = planOf(country).trunkPrefix
  if (!prefix) return undefined

  const prefixed = new AsYouType(country).input(prefix + digits) ?? ""
  return accepted(dropLeadingDigits(prefixed, prefix.length), digits)
}

function formatNationalNumber(digits: string, country: CountryCode): string {
  if (!digits) return ""

  const national = formatWithNationalPattern(digits, country)
  if (national) return national

  const dialCode = `+${getCountryCallingCode(country)}`
  const international = new AsYouType().input(dialCode + digits) ?? ""
  if (international.startsWith(dialCode)) {
    const rest = accepted(
      international.slice(dialCode.length).replace(/^[\s\-./]+/, ""),
      digits
    )
    if (rest) return rest
  }

  return digits
}

function parseInternational(raw: string, fallback: CountryCode) {
  if (!raw.trimStart().startsWith("+")) return undefined

  const parser = new AsYouType()
  parser.input(raw)
  const callingCode = parser.getCallingCode()
  if (!callingCode) return undefined

  const country =
    parser.getCountry() ??
    (callingCode === getCountryCallingCode(fallback) ? fallback : undefined)
  if (!country) return undefined

  return {
    country,
    nationalNumber: onlyDigits(raw).slice(callingCode.length),
  }
}

function seedFrom(defaultValue: string, defaultCountry: CountryCode) {
  const parsed = parseInternational(defaultValue, defaultCountry)
  return {
    country: parsed?.country ?? defaultCountry,
    digits: parsed?.nationalNumber ?? onlyDigits(defaultValue),
  }
}

function toPhoneValue(
  nationalNumber: string,
  country: CountryCode
): PhoneValue {
  const dialCode = PHONE_COUNTRIES[country].dialCode
  const value = nationalNumber ? `${dialCode}${nationalNumber}` : ""

  return {
    value,
    country,
    dialCode,
    nationalNumber,
    isPossible: value ? isPossiblePhoneNumber(value) : false,
    isValid: value ? isValidPhoneNumber(value) : false,
  }
}

const FILLERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

/**
 * Longest national number the digits typed so far can still grow into: the
 * largest length that either a national format lays out (Türkiye 5xx stops at
 * 10, 800x runs to 13) or the country's validation pattern still admits.
 * Falls back to the country-wide maximum when neither knows this prefix.
 */
function maxDigitsFor(country: CountryCode, digits: string) {
  const { maxDigits, pattern } = planOf(country)
  if (!maxDigits) return Number.POSITIVE_INFINITY
  if (!digits) return maxDigits

  for (let length = maxDigits; length >= digits.length; length--) {
    if (formatWithNationalPattern(digits.padEnd(length, "0"), country)) {
      return length
    }
    if (pattern) {
      const tail = length - digits.length
      const reachable = FILLERS.some((filler) =>
        pattern.test(digits + filler.repeat(tail))
      )
      if (reachable) return length
    }
  }

  return maxDigits
}

function caretAfterDigit(formatted: string, count: number) {
  if (count <= 0) return 0

  let seen = 0
  for (let i = 0; i < formatted.length; i++) {
    if (isDigit(formatted[i]) && ++seen === count) return i + 1
  }
  return formatted.length
}

export function usePhoneInput(
  options: UsePhoneInputOptions = {}
): UsePhoneInputReturn {
  const {
    defaultCountry = "DE",
    country: ctrl,
    onCountryChange,
    defaultValue = "",
    onValueChange,
  } = options

  const [seed] = React.useState(() => seedFrom(defaultValue, defaultCountry))

  const isControlled = ctrl !== undefined
  const [internal, setInternal] = React.useState<CountryCode>(seed.country)
  const country = isControlled ? ctrl : internal
  const [digits, setDigits] = React.useState(seed.digits)

  const formatted = React.useMemo(
    () => formatNationalNumber(digits, country),
    [digits, country]
  )
  const value = React.useMemo(
    () => toPhoneValue(digits, country),
    [digits, country]
  )

  const ref = React.useRef<HTMLInputElement | null>(null)
  const caretRef = React.useRef<number | null>(null)

  useIsomorphicLayoutEffect(() => {
    const input = ref.current
    const caretDigits = caretRef.current
    caretRef.current = null

    if (!input || caretDigits === null) return
    if (document.activeElement !== input) return

    const position = caretAfterDigit(formatted, caretDigits)
    input.setSelectionRange(position, position)
  }, [formatted])

  const emit = (nextDigits: string, nextCountry: CountryCode) => {
    onValueChange?.(toPhoneValue(nextDigits, nextCountry))
  }

  const updateCountry = (next: CountryCode) => {
    if (!isControlled) setInternal(next)
    onCountryChange?.(next)
  }

  const setCountry = (next: CountryCode) => {
    updateCountry(next)
    emit(digits, next)
  }

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const input = event.target
    const raw = input.value

    const restore = (caretDigits: number) => {
      input.value = formatted
      const position = caretAfterDigit(formatted, caretDigits)
      input.setSelectionRange(position, position)
    }

    const international = parseInternational(raw, country)
    if (international) {
      caretRef.current = null
      updateCountry(international.country)
      setDigits(international.nationalNumber)
      emit(international.nationalNumber, international.country)
      return
    }

    const caret = input.selectionStart ?? raw.length
    let caretDigits = onlyDigits(raw.slice(0, caret)).length
    let next = onlyDigits(raw)

    if (next === digits && caretDigits > 0 && raw.length < formatted.length) {
      caretDigits -= 1
      next = next.slice(0, caretDigits) + next.slice(caretDigits + 1)
    }

    if (
      next.length > digits.length &&
      next.length > maxDigitsFor(country, digits)
    ) {
      restore(Math.max(0, caretDigits - 1))
      return
    }

    if (next === digits) {
      restore(caretDigits)
      return
    }

    caretRef.current = caretDigits
    setDigits(next)
    emit(next, country)
  }

  return {
    input: {
      ref,
      value: formatted,
      onChange,
      inputMode: "tel",
      type: "tel",
      placeholder: PHONE_COUNTRIES[country].dialCode,
    },
    country,
    setCountry,
    config: PHONE_COUNTRIES[country],
    countries: PHONE_COUNTRIES,
    digits,
    value,
  }
}
