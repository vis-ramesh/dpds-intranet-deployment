import { useState, type ReactNode } from "react"
import { Check, Code2, Copy, Eye } from "lucide-react"

import { cn } from "@dpds-gov/design-system"
import { CodeBlock, type CodeBlockProps } from "./code-block"

export interface PreviewBlockProps {
  children: ReactNode
  code?: string
  language?: CodeBlockProps["language"]
  title?: string
  description?: string
  center?: boolean
  className?: string
}

export function PreviewBlock({
  children,
  code,
  language = "tsx",
  title,
  description,
  center = true,
  className,
}: PreviewBlockProps) {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const hasCode = Boolean(code)

  async function handleCopy() {
    if (!code) return
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const btnClass =
    "inline-flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-2 py-1 text-xs font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {(title || description) && (
        <div>
          {title && (
            <h3 className="text-sm font-semibold font-mono text-gray-900 dark:text-slate-100">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{description}</p>
          )}
        </div>
      )}

      <div className="relative h-full rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden bg-gray-50/60 dark:bg-slate-900/40">
        {hasCode && (
          <div className="absolute top-2 inset-e-2 z-10 flex items-center gap-1.5">
               {showCode && (
              <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? "Copied" : "Copy code"}
                className={btnClass}
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-green-500" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowCode((v) => !v)}
              aria-pressed={showCode}
              className={btnClass}
            >
              {showCode ? (
                <>
                  <Eye className="size-3.5" />
                  <span>View preview</span>
                </>
              ) : (
                <>
                  <Code2 className="size-3.5" />
                  <span>View code</span>
                </>
              )}
            </button>

       
          </div>
        )}

        {showCode && hasCode ? (
          <CodeBlock code={code!} language={language} className="border-0 rounded-none" showCopy={false} />
        ) : (
          <div
            className={cn(
              "min-h-[120px] p-6 md:p-8 flex flex-wrap gap-3",
              center && "items-center justify-center"
            )}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default PreviewBlock
