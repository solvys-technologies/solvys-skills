import { getCountryFlag, type FlagComponent } from "./country-flags"

/**
 * ISO 4217 currency code → ISO 3166-1 alpha-2 country code (or `EU` for the
 * Eurozone). Covers the ~50 currencies most likely to appear in pickers; extend
 * as needed. Lookups via {@link getCurrencyFlag} normalize input case.
 */
export const CURRENCY_TO_COUNTRY: Record<string, string> = {
  AED: "AE",
  ARS: "AR",
  AUD: "AU",
  BHD: "BH",
  BRL: "BR",
  CAD: "CA",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CZK: "CZ",
  DKK: "DK",
  EGP: "EG",
  EUR: "EU",
  GBP: "GB",
  HKD: "HK",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  ISK: "IS",
  JPY: "JP",
  KES: "KE",
  KRW: "KR",
  KWD: "KW",
  MAD: "MA",
  MXN: "MX",
  MYR: "MY",
  NGN: "NG",
  NOK: "NO",
  NZD: "NZ",
  PEN: "PE",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  SAR: "SA",
  SEK: "SE",
  SGD: "SG",
  THB: "TH",
  TRY: "TR",
  TWD: "TW",
  UAH: "UA",
  USD: "US",
  VND: "VN",
  ZAR: "ZA",
}

export function getCurrencyCountry(code: string): string | undefined {
  return CURRENCY_TO_COUNTRY[code.toUpperCase()]
}

export function getCurrencyFlag(code: string): FlagComponent | undefined {
  const country = getCurrencyCountry(code)
  return country ? getCountryFlag(country) : undefined
}
