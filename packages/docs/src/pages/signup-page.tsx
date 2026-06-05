import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, Check } from "lucide-react"
import { Button } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"
import { Checkbox } from "@dpds-gov/design-system"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
} from "@dpds-gov/design-system"
import { cn } from "@dpds-gov/design-system"

const passwordStrengthLevels = [
  { label: "Weak", color: "bg-error-500", minLength: 1 },
  { label: "Fair", color: "bg-warning-500", minLength: 6 },
  { label: "Good", color: "bg-primary-400", minLength: 8 },
  { label: "Strong", color: "bg-primary-600", minLength: 10 },
]

function getStrength(pwd: string): number {
  if (!pwd) return 0
  let score = 0
  if (pwd.length >= 6) score++
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return score
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  })

  const strength = getStrength(form.password)
  const strengthInfo = passwordStrengthLevels[Math.min(strength, 3)]

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel – Decorative */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        {/* Blobs */}
        <div className="absolute -top-60 -left-40 size-[700px] rounded-full bg-primary-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 size-[500px] rounded-full bg-primary-600/30 blur-3xl" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative flex flex-col justify-between p-12 w-full">
          {/* Logo area */}
          <div>
            <img
              src="/img/dp-logo-color.svg"
              alt="Dubai Police"
              className="h-10 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>

          {/* Feature list */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Start building today
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Join thousands of teams using our platform to streamline their workflow and boost productivity.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "Free 14-day trial, no credit card required",
                "Full access to all features from day one",
                "Cancel anytime, no questions asked",
                "24/7 dedicated support team",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 size-5 rounded-full bg-primary-400/20 ring-1 ring-primary-300/40 flex items-center justify-center shrink-0">
                    <Check className="size-3 text-primary-300" />
                  </div>
                  <span className="text-sm text-white/80">{item}</span>
                </li>
              ))}
            </ul>

            {/* Social proof avatars */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["MK", "SA", "RJ", "LB"].map((init, i) => (
                  <div
                    key={i}
                    className="size-8 rounded-full bg-primary-400/30 ring-2 ring-primary-800 flex items-center justify-center text-white text-xs font-semibold"
                  >
                    {init}
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/60">
                <span className="font-semibold text-white">2,000+</span> teams already onboard
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Dashboard Inc. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel – Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 overflow-y-auto">
        <div className="mx-auto w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <img src="/img/dp-logo-color.svg" alt="Dubai Police" className="h-9 w-auto" />
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Create an account
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Get started in less than 2 minutes.
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First name
                </Label>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText><User /></InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    onChange={set("firstName")}
                  />
                </InputGroup>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last name
                </Label>
                <InputGroup>
                  <InputGroupInput
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={set("lastName")}
                  />
                </InputGroup>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">
                Email address
              </Label>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText><Mail /></InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                />
              </InputGroup>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText><Lock /></InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={set("password")}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>

              {/* Strength meter */}
              {form.password && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-all duration-300",
                          i < strength ? strengthInfo.color : "bg-border"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Strength:{" "}
                    <span className="font-medium text-foreground">
                      {strengthInfo.label}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-1.5">
              <Label htmlFor="confirm" className="text-sm font-medium">
                Confirm password
              </Label>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText><Lock /></InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={set("confirmPassword")}
                  aria-invalid={
                    form.confirmPassword !== "" && form.confirmPassword !== form.password
                  }
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton onClick={() => setShowConfirm(!showConfirm)} aria-label={showConfirm ? "Hide password" : "Show password"}>
                    {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {form.confirmPassword && form.confirmPassword !== form.password && (
                <p className="text-xs text-destructive">Passwords do not match.</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5 pt-1">
              <Checkbox
                id="terms"
                checked={form.terms}
                onCheckedChange={(v) =>
                  setForm((f) => ({ ...f, terms: v as boolean }))
                }
                className="mt-0.5"
              />
              <Label
                htmlFor="terms"
                className="text-sm inline text-muted-foreground leading-relaxed cursor-pointer select-none"
              >
                I agree to the{" "}
                <Link to="/terms" className="font-medium text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="font-medium text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!form.terms}
            >
              Create account
            </Button>

            {/* Divider */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or sign up with</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <Button type="button" variant="outlineGray" size="md" className="h-11 w-full">
                <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </Button>
              <Button type="button" variant="outlineGray" size="md" className="h-11 w-full">
                <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                  <path d="M11.4 24H0V12.6L11.4 24zM12.6 24H24V12.6L12.6 24zM0 11.4V0h11.4L0 11.4zM12.6 0H24v11.4L12.6 0z" />
                </svg>
                Microsoft
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
