// src/i18n/index.ts
import en from "./locales/en.json"
import fr from "./locales/fr.json"
import ar from "./locales/ar.json"

export type Locale = "en" | "fr" | "lb"
type Dict = Record<string, unknown>

const dictionaries: Record<Locale, Dict> = {
  en,
  fr,
  lb: ar,
}

function get(obj: Dict, path: string) {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (!acc || typeof acc !== "object") return undefined
    return (acc as Dict)[key]
  }, obj)
}

export function createTranslator(locale: Locale) {
  const dict = dictionaries[locale] ?? dictionaries.en

  return function t(keyPath: string) {
    const value = get(dict, keyPath)
    if (typeof value === "string") return value
    const fallback = get(dictionaries.en, keyPath)
    if (typeof fallback === "string") return fallback
    return keyPath
  }
}
