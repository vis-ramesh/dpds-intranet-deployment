import { useState } from "react"
import { Mail, Bell, ShieldCheck, Gift, ArrowRight, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@dpds-gov/design-system"
import { cn } from "@dpds-gov/design-system"

/* ─── Email Preview Shell ─────────────────────────────────────────── */
function EmailShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-border shadow-sm">
      {/* Fake email client header */}
      <div className="flex items-center gap-2 bg-card border-b border-border px-4 py-3">
        <div className="flex gap-1.5">
          <div className="size-3 rounded-full bg-error-400" />
          <div className="size-3 rounded-full bg-warning-400" />
          <div className="size-3 rounded-full bg-primary-400" />
        </div>
        <div className="flex-1 mx-4">
          <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded-md max-w-xs text-xs text-muted-foreground flex items-center px-2 gap-1.5">
            <Mail className="size-3 text-muted-foreground" />
            <span className="truncate">Mail Preview</span>
          </div>
        </div>
      </div>

      {/* Email body wrapper */}
      <div className="p-4 md:p-6">
        <div className="mx-auto max-w-[560px] rounded-xl overflow-hidden bg-white dark:bg-gray-950 shadow-md ring-1 ring-black/5 dark:ring-white/5">
          {children}
        </div>
      </div>
    </div>
  )
}

/* ─── Template 1: Welcome Email ───────────────────────────────────── */
function WelcomeEmail() {
  return (
    <EmailShell>
      {/* Header */}
      <div className="bg-primary-700 px-8 py-10 text-center">
        <div className="mx-auto mb-4 size-14 rounded-2xl bg-white/10 flex items-center justify-center ring-2 ring-white/20">
          <Mail className="size-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">Welcome aboard! 🎉</h1>
        <p className="mt-2 text-sm text-white/70">We're thrilled to have you with us</p>
      </div>

      {/* Body */}
      <div className="px-8 py-8 space-y-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Hi <strong className="text-gray-900 dark:text-gray-100">Ahmed</strong>,
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Your account has been successfully created. You now have full access to all the features and tools that will help you and your team work smarter.
        </p>

        {/* Feature list */}
        <div className="space-y-3 rounded-xl bg-gray-50 dark:bg-gray-900 p-5">
          {[
            "Access to the analytics dashboard",
            "Team collaboration tools",
            "24/7 priority support",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="size-4 text-primary-500 mt-0.5 shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-2 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
          >
            Get started
            <ArrowRight className="size-4" />
          </a>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-600 text-center leading-relaxed">
          If you have any questions, feel free to reach out to our support team at{" "}
          <a href="#" className="text-primary-500 hover:underline">support@example.com</a>
        </p>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 dark:border-gray-800 px-8 py-5 bg-gray-50 dark:bg-gray-900/50">
        <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
          © {new Date().getFullYear()} Dashboard Inc. · All rights reserved
          <br />
          <a href="#" className="hover:underline">Unsubscribe</a>
          {" · "}
          <a href="#" className="hover:underline">Privacy Policy</a>
        </p>
      </div>
    </EmailShell>
  )
}

/* ─── Template 2: Password Reset Email ───────────────────────────── */
function PasswordResetEmail() {
  return (
    <EmailShell>
      {/* Header */}
      <div className="bg-gray-900 dark:bg-gray-800 px-8 py-10 text-center">
        <div className="mx-auto mb-4 size-14 rounded-2xl bg-white/10 flex items-center justify-center ring-2 ring-white/20">
          <ShieldCheck className="size-7 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white">Reset your password</h1>
        <p className="mt-2 text-sm text-white/60">A password reset was requested</p>
      </div>

      {/* Body */}
      <div className="px-8 py-8 space-y-5">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Hi <strong className="text-gray-900 dark:text-gray-100">Sarah</strong>,
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          We received a request to reset the password for your account. Click the button below to create a new password. This link is only valid for <strong className="text-gray-800 dark:text-gray-200">15 minutes</strong>.
        </p>

        {/* CTA */}
        <div className="py-2 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-gray-900 hover:opacity-90 transition-opacity"
          >
            <ShieldCheck className="size-4" />
            Reset password
          </a>
        </div>

        {/* Security notice */}
        <div className="rounded-xl border border-warning-200 dark:border-warning-800/50 bg-warning-50 dark:bg-warning-900/20 p-4">
          <div className="flex items-start gap-3">
            <XCircle className="size-4 text-warning-600 dark:text-warning-400 mt-0.5 shrink-0" />
            <p className="text-xs text-warning-700 dark:text-warning-400 leading-relaxed">
              If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
            </p>
          </div>
        </div>

        {/* Fallback link */}
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            If the button doesn't work, copy and paste this link in your browser:
          </p>
          <p className="mt-1 text-xs text-primary-500 break-all">
            https://app.example.com/reset?token=abc123xyz...
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 dark:border-gray-800 px-8 py-5 bg-gray-50 dark:bg-gray-900/50">
        <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
          © {new Date().getFullYear()} Dashboard Inc. · All rights reserved
          <br />
          <a href="#" className="hover:underline">Unsubscribe</a>
          {" · "}
          <a href="#" className="hover:underline">Privacy Policy</a>
        </p>
      </div>
    </EmailShell>
  )
}

/* ─── Template 3: Notification Email ─────────────────────────────── */
function NotificationEmail() {
  return (
    <EmailShell>
      {/* Accent top bar */}
      <div className="h-1.5 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600" />

      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
              <Bell className="size-4 text-primary-600 dark:text-primary-400" />
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notification</span>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-600">Just now</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 pb-8 space-y-5">
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Your monthly report is ready
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Your <strong>April 2026</strong> analytics report has been generated and is ready for review. Here's a quick summary of your performance:
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total users", value: "12,847", delta: "+8.2%", positive: true },
            { label: "Revenue", value: "AED 94K", delta: "+14.1%", positive: true },
            { label: "Bounce rate", value: "24.3%", delta: "-3.4%", positive: true },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-gray-50 dark:bg-gray-900 p-3 text-center"
            >
              <p className="text-base font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{stat.label}</p>
              <span
                className={cn(
                  "mt-1 inline-block text-xs font-medium",
                  stat.positive ? "text-primary-600 dark:text-primary-400" : "text-error-500"
                )}
              >
                {stat.delta}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3 pt-1">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
          >
            View full report
            <ArrowRight className="size-4" />
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Manage notifications
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 dark:border-gray-800 px-8 py-5 bg-gray-50 dark:bg-gray-900/50">
        <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
          © {new Date().getFullYear()} Dashboard Inc. · All rights reserved
          <br />
          <a href="#" className="hover:underline">Unsubscribe</a>
          {" · "}
          <a href="#" className="hover:underline">Privacy Policy</a>
        </p>
      </div>
    </EmailShell>
  )
}

/* ─── Template 4: Promotional Email ──────────────────────────────── */
function PromoEmail() {
  return (
    <EmailShell>
      {/* Header with gradient */}
      <div
        className="relative px-8 py-12 text-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, oklch(0.36 0.08 160) 0%, oklch(0.55 0.13 162) 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-8 -left-8 size-32 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -right-10 size-40 rounded-full bg-white/5" />
        <div className="absolute top-4 right-8 size-6 rounded-full bg-white/10" />

        <div className="relative">
          <div className="mx-auto mb-3 size-12 rounded-2xl bg-white/15 flex items-center justify-center ring-2 ring-white/20">
            <Gift className="size-6 text-white" />
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/20 mb-4">
            Limited time offer
          </div>
          <h1 className="text-2xl font-bold text-white">Upgrade and save 40%</h1>
          <p className="mt-2 text-sm text-white/70">
            Exclusive offer for existing customers — ends April 30
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 py-8 space-y-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Hi <strong className="text-gray-900 dark:text-gray-100">Mohammed</strong>,
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          As a valued customer, we're offering you an exclusive <strong className="text-primary-600 dark:text-primary-400">40% discount</strong> on upgrading to our Pro plan. Unlock advanced features and take your experience to the next level.
        </p>

        {/* Plan comparison */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border p-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Current (Free)</p>
            <ul className="space-y-2">
              {["5 projects", "2 team members", "Basic analytics"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <div className="size-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 border-primary-400 bg-primary-50 dark:bg-primary-900/20 p-4">
            <p className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-2">Pro ✦</p>
            <ul className="space-y-2">
              {["Unlimited projects", "Unlimited members", "Advanced analytics"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="size-3 text-primary-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing */}
        <div className="rounded-2xl bg-primary-50 dark:bg-primary-900/20 p-5 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">AED 99</span>
            <div className="text-left">
              <span className="block text-xs text-muted-foreground line-through">AED 165</span>
              <span className="block text-xs text-primary-600 dark:text-primary-400 font-semibold">Save 40%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">per month, billed annually</p>
        </div>

        {/* CTA */}
        <div className="text-center pt-1">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-3.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Claim your 40% discount
            <ArrowRight className="size-4" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">
            Offer expires <strong>April 30, 2026</strong>. No hidden fees.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 dark:border-gray-800 px-8 py-5 bg-gray-50 dark:bg-gray-900/50">
        <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
          © {new Date().getFullYear()} Dashboard Inc. · All rights reserved
          <br />
          <a href="#" className="hover:underline">Unsubscribe</a>
          {" · "}
          <a href="#" className="hover:underline">Privacy Policy</a>
        </p>
      </div>
    </EmailShell>
  )
}

/* ─── Main Page ───────────────────────────────────────────────────── */
const templates = [
  {
    id: "welcome",
    label: "Welcome",
    icon: Mail,
    description: "Onboarding email for new users",
    component: WelcomeEmail,
  },
  {
    id: "reset",
    label: "Password Reset",
    icon: ShieldCheck,
    description: "Secure password reset flow",
    component: PasswordResetEmail,
  },
  {
    id: "notification",
    label: "Notification",
    icon: Bell,
    description: "Activity & report digest",
    component: NotificationEmail,
  },
  {
    id: "promo",
    label: "Promotional",
    icon: Gift,
    description: "Marketing & offer emails",
    component: PromoEmail,
  },
]

export default function EmailTemplatesPage() {
  const [active, setActive] = useState("welcome")
  const active_template = templates.find((t) => t.id === active)!
  const ActiveComponent = active_template.component

  return (
    <div className="space-y-8 p-6">
      {/* Page header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">Email Templates</h1>
        <p className="text-sm text-muted-foreground">
          Production-ready email templates designed with best practices for deliverability and engagement.
        </p>
      </div>

      {/* Tab selector */}
      <div className="flex flex-wrap gap-2">
        {templates.map((t) => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                active === t.id
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              )}
            >
              <Icon className="size-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Template info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">{active_template.label} Email</h2>
          <p className="text-sm text-muted-foreground">{active_template.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outlineGray" size="sm">
            Copy HTML
          </Button>
          <Button size="sm">
            <Mail className="size-3.5" />
            Send test
          </Button>
        </div>
      </div>

      {/* Preview */}
      <div className="transition-all duration-300">
        <ActiveComponent />
      </div>

      {/* All templates grid */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">All templates</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={cn(
                  "group rounded-xl border p-4 text-left transition-all hover:border-primary/50 hover:shadow-sm",
                  active === t.id
                    ? "border-primary bg-primary-50 dark:bg-primary-900/20"
                    : "border-border bg-card"
                )}
              >
                <div
                  className={cn(
                    "mb-3 size-9 rounded-lg flex items-center justify-center",
                    active === t.id
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <p className="text-sm font-medium text-foreground">{t.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
