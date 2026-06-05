import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import { codeToHtml } from "shiki"

import { cn } from "@dpds-gov/design-system"

type SupportedLanguage = "tsx" | "ts" | "jsx" | "js" | "bash" | "shell" | "html" | "css" | "json"

export interface CodeBlockProps {
  code: string
  language?: SupportedLanguage
  className?: string
  showCopy?: boolean
  filename?: string
}

export function CodeBlock({
  code,
  language = "tsx",
  className,
  showCopy = true,
  filename,
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false
    codeToHtml(code.trim(), {
      lang: language,
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    })
      .then((result) => {
        if (!cancelled) setHtml(result)
      })
      .catch(() => {
        if (!cancelled) setHtml("")
      })
    return () => {
      cancelled = true
    }
  }, [code, language])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // ignore
    }
  }

  return (
    <div
      className={cn(
        "relative group rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900",
        className
      )}
    >
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-xs font-mono text-gray-600 dark:text-slate-300">
          <span>{filename}</span>
          <span className="uppercase tracking-wider text-[10px] text-gray-400">{language}</span>
        </div>
      )}

      <div className="relative">
        {showCopy && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy code"}
            className="absolute top-2 right-2 z-10 inline-flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-2 py-1 text-xs font-medium text-gray-700 dark:text-slate-200 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-primary-600" />
                <span className="text-primary-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        )}

        {html ? (
          <div
            className="docs-code-block overflow-x-auto text-xs md:text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="docs-code-block overflow-x-auto p-4 text-xs md:text-sm font-mono text-gray-800 dark:text-slate-200">
            <code>{code.trim()}</code>
          </pre>
        )}
      </div>
    </div>
  )
}

export default CodeBlock
