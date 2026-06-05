import type { ReactNode } from "react"

import { cn } from "@dpds-gov/design-system"

export interface ProseProps {
  children: ReactNode
  className?: string
}

/**
 * Typographic container for prose docs pages. Applies sensible defaults
 * to descendant headings, paragraphs, lists, links, code, and blockquotes.
 *
 * Hand-rolled (no @tailwindcss/typography dep) so the dark-mode tokens
 * stay aligned with the rest of the docs site.
 */
export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "w-full text-base leading-relaxed text-gray-700 dark:text-slate-300",
        // Headings
        "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-semibold [&_h2]:font-mono [&_h2]:tracking-tight [&_h2]:text-gray-900 [&_h2]:dark:text-slate-100",
        "[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:md:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:dark:text-slate-100",
        "[&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-gray-900 [&_h4]:dark:text-slate-100",
        // First-child reset (no top margin on the first heading)
        "[&>:first-child]:mt-0",
        // Body copy
        "[&_p]:my-4",
        "[&_p+p]:mt-4",
        // Lead paragraph (lead class is opt-in via a child element)
        "[&_p.lead]:text-lg [&_p.lead]:text-gray-600 [&_p.lead]:dark:text-slate-400",
        // Lists
        "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:ps-6",
        "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:ps-6",
        "[&_li]:my-1.5",
        "[&_li_p]:my-1.5",
        // Inline code
        "[&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.875em] [&_code]:font-mono [&_code]:text-gray-800 [&_code]:dark:text-slate-200",
        // Links
        "[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/30 [&_a:hover]:decoration-primary",
        // Blockquotes
        "[&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:ps-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:dark:text-slate-400",
        // Horizontal rule
        "[&_hr]:my-8 [&_hr]:border-border",
        // Strong / em
        "[&_strong]:font-semibold [&_strong]:text-gray-900 [&_strong]:dark:text-slate-100",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Prose
