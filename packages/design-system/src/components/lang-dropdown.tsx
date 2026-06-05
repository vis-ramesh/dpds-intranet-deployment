import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select"

export interface LangDropdownProps {
  /** Current language code (e.g. "en", "ar"). Defaults to "en". */
  value?: string
  /** Fires with the selected language code. */
  onValueChange?: (value: string) => void
  /** Override the rendered strings. Defaults are English. */
  labels?: {
    language?: string
    english?: string
    arabic?: string
  }
}

export function LangDropdown({ value, onValueChange, labels }: LangDropdownProps = {}) {
  const language = labels?.language ?? "Language"
  const english = labels?.english ?? "English"
  const arabic = labels?.arabic ?? "Arabic"
  const current = value === "ar" ? "ar" : "en"

  return (
    <Select value={current} onValueChange={onValueChange}>
      <SelectTrigger
        className="w-28 dark:text-sage-100 border-0 h-10 rounded-full dark:bg-sage-800/30 px-4"
        aria-label={language}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">{english}</SelectItem>
          <SelectItem value="ar">{arabic}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
