import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@dpds-gov/design-system"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"
import { Checkbox } from "@dpds-gov/design-system"
import { cn } from "@dpds-gov/design-system"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel – Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo */}
          <div className="mb-10">
            <img
              src="/img/dp-logo-color.svg"
              alt="Logo"
              className="h-10 w-auto object-contain dark:hidden"
            />
            <img
              src="/img/dp-logo-color.svg"
              alt="Logo"
              className="h-10 w-auto object-contain hidden dark:block"
            />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sign in to your account to continue.
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </InputGroup>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText><Lock /></InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    size="icon-sm"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(v) => setRemember(v as boolean)}
              />
              <Label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer select-none"
              >
                Remember me for 30 days
              </Label>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" size="xl">
              Sign in
            </Button>

            {/* Divider */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <Button type="button" variant="outlineGray" size="md" className="h-11 w-full">
                <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
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

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel – Decorative */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-primary-900">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 size-[600px] rounded-full bg-primary-700/40 blur-3xl" />
          <div className="absolute -bottom-40 -left-20 size-[500px] rounded-full bg-primary-500/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] rounded-full bg-primary-600/30 blur-2xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col justify-between p-12 w-full">
          {/* Top badge */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/20">
              <span className="size-1.5 rounded-full bg-primary-300 animate-pulse" />
              Secure & Trusted Platform
            </span>
          </div>

          {/* Center quote */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="size-5 text-primary-300 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-xl font-medium leading-relaxed text-white">
                "This platform has completely transformed how our team manages daily operations. The interface is intuitive and the insights are incredibly valuable."
              </blockquote>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary-400/40 ring-2 ring-primary-300/30 flex items-center justify-center text-white font-semibold text-sm">
                AK
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Ahmed Al-Karimi</p>
                <p className="text-xs text-white/60">Senior Operations Manager</p>
              </div>
            </div>
          </div>

          {/* Bottom dots */}
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === 0 ? "w-6 bg-primary-300" : "w-1.5 bg-white/30"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
