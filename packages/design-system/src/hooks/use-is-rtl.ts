import { useEffect, useState } from "react"

/**
 * Returns true when the document direction is RTL. Subscribes to `document.documentElement.dir`
 * via a MutationObserver so the value flips automatically when a host app switches language.
 *
 * Framework-agnostic — works with i18next, react-intl, FormatJS, or no i18n library at all,
 * as long as the host sets `document.documentElement.dir = "rtl"` when it wants RTL layout.
 */
export function useIsRtl(): boolean {
  const get = () =>
    typeof document !== "undefined" && document.documentElement.dir === "rtl"

  const [isRtl, setIsRtl] = useState(get)

  useEffect(() => {
    if (typeof document === "undefined") return
    const observer = new MutationObserver(() => setIsRtl(get()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    })
    return () => observer.disconnect()
  }, [])

  return isRtl
}
