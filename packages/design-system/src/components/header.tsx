import { ThemeToggle, type ThemeToggleProps } from "./theme-toggle"
import { useBreadcrumbSlot } from "./breadcrumb-context"
import { UserDropdown } from "./user-dropdown"
import { LangDropdown, type LangDropdownProps } from "./lang-dropdown"
import { useSidebar } from "./sidebar"
import { Menu } from "lucide-react"
import { Button } from "./button"

function HeaderBreadcrumb() {
  const { breadcrumb } = useBreadcrumbSlot()
  return <>{breadcrumb}</>
}

function HeaderAction() {
  const { headerAction } = useBreadcrumbSlot()
  return <>{headerAction}</>
}

export interface HeaderProps {
  /** Current language code, forwarded to LangDropdown. */
  language?: string
  /** Fires when the user picks a different language. */
  onLanguageChange?: (value: string) => void
  /** Translated strings for the language switcher. */
  langLabels?: LangDropdownProps["labels"]
  /** Translated strings for the theme switcher. */
  themeLabels?: ThemeToggleProps["labels"]
}

export function Header({ language, onLanguageChange, langLabels, themeLabels }: HeaderProps = {}) {
  const { state, toggleSidebar } = useSidebar()
  const collapsed = state === "collapsed"

  return (
    <header className="fixed z-10 top-0 right-0 w-full flex h-14 items-center gap-4 border-b dark:border-white/5 px-4 lg:h-[60px] lg:px-6 backdrop-blur-sm z-10 bg-white/0 dark:bg-transparent">
      <Button
        variant="gray"
        size="icon-sm"
        className="xl:hidden shrink-0"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu className="size-5" />
      </Button>
      <div
        className="hidden md:block shrink-0 transition-[width] duration-200 ease-linear"
        style={{ width: collapsed ? "var(--sidebar-width-icon)" : "var(--sidebar-width)" }}
      />
      <div className="w-full flex-1">
        <HeaderBreadcrumb />
      </div>
      <HeaderAction />
      <LangDropdown value={language} onValueChange={onLanguageChange} labels={langLabels} />
      <ThemeToggle labels={themeLabels} />
      <UserDropdown />
    </header>
  )
}
