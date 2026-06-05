import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Eye, EyeOff } from "lucide-react"

import { PhoneInput } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
import { Calendar } from "@dpds-gov/design-system"
import { CardWidget, CardWidgetContent, CardWidgetHeader, CardWidgetTitle } from "@dpds-gov/design-system"
import { Checkbox } from "@dpds-gov/design-system"
import { Input, FileInput, MultiFileInput } from "@dpds-gov/design-system"
import { Label } from "@dpds-gov/design-system"
import { Popover, PopoverContent, PopoverTrigger } from "@dpds-gov/design-system"
import { RadioGroup, RadioGroupItem } from "@dpds-gov/design-system"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dpds-gov/design-system"
import { Slider } from "@dpds-gov/design-system"
import { Switch } from "@dpds-gov/design-system"
import { Textarea } from "@dpds-gov/design-system"
import { Toggle } from "@dpds-gov/design-system"
import { cn } from "@dpds-gov/design-system"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@dpds-gov/design-system"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@dpds-gov/design-system"

type FormSection =
  | "form"
  | "input"
  | "select"
  | "checkbox"
  | "radio"
  | "textarea"
  | "datepicker"
  | "fileupload"
  | "slider"
  | "toggle"
  | "switch"
  | "text-editor"

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <CardWidget>
      <CardWidgetHeader>
        <CardWidgetTitle>{title}</CardWidgetTitle>
      </CardWidgetHeader>
      <CardWidgetContent>{children}</CardWidgetContent>
    </CardWidget>
  )
}

export default function FormsPage({ section }: { section: FormSection }) {
  const [sliderValue, setSliderValue] = useState([50])
  const [switchOn, setSwitchOn] = useState(true)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [showPassword, setShowPassword] = useState(false)
  const [_counter, _setCounter] = useState(0)

  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div>
          <h1 className="text-[40px] font-bold font-mono tracking-tight text-secondary-600 dark:text-success-300 text-4xl">Forms</h1>
          <p className="text-sm md:text-2xl text-gray-500">shadcn form controls showcase</p>
        </div>

        {section === "form" && (
          <SectionCard title="Form">
            <form className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="md:col-span-2">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </SectionCard>
        )}

        {section === "input" && (
          <SectionCard title="Input Variants">
            <div className="space-y-8 max-w-md">

              {/* Default */}
              <div className="space-y-2">
                <Label>Default</Label>
                <Input placeholder="Email address" />
                <Input placeholder="Disabled" disabled />
              </div>


              <InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon> 
dfg
  </InputGroupAddon>
</InputGroup>

              {/* Password */}
              <div className="space-y-2">
                <Label>Password</Label>
                <InputGroup>
                  <InputGroupInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton className="bg-transparent" type="button" onClick={() => setShowPassword((v) => !v)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </div>

              {/* Leading Dropdown — Phone with intl-tel-input */}
              <div className="space-y-2">
                <Label htmlFor="phone">Leading Dropdown</Label>
                <PhoneInput id="phone" />
              </div>

              {/* Trailing Dropdown */}
              <div className="space-y-2">
                <Label>Trailing Dropdown</Label>
                <div className="flex">
                  <Input placeholder="Amount" className="rounded-r-none" />
                  <Select defaultValue="usd">
                    <SelectTrigger className="w-[90px] rounded-l-none border-l-0 focus:z-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                      <SelectItem value="gbp">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* OTP */}
              <div className="space-y-2">
                <Label>OTP</Label>
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    {Array.from({ length: 6 }, (_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* Date & Time */}
              <div className="space-y-2">
                <Label>Date &amp; Time</Label>
                <Input type="datetime-local" />
              </div>

              {/* Leading Text */}
              <div className="space-y-2">
                <Label>Leading Text</Label>
                <InputGroup>
                  <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
                  <InputGroupInput placeholder="example.com" />
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon><InputGroupText>$</InputGroupText></InputGroupAddon>
                  <InputGroupInput placeholder="0.00" />
                </InputGroup>
              </div>
            </div>
          </SectionCard>
        )}

        {section === "select" && (
          <SectionCard title="Select">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Single Select</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Disabled Select</Label>
                <Select disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Disabled" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SectionCard>
        )}

        {section === "checkbox" && (
          <SectionCard title="Checkbox">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="newsletter" defaultChecked />
                <Label htmlFor="newsletter">Subscribe to newsletter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="disabled" disabled />
                <Label htmlFor="disabled" className="text-muted-foreground">
                  Disabled option
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="disabled-checked" disabled defaultChecked />
                <Label htmlFor="disabled-checked" className="text-muted-foreground">
                  Disabled &amp; checked
                </Label>
              </div>
            </div>
          </SectionCard>
        )}

        {section === "radio" && (
          <SectionCard title="Radio">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Subscription plan</Label>
                <RadioGroup defaultValue="pro">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="starter" id="starter" />
                    <Label htmlFor="starter">Starter</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pro" id="pro" />
                    <Label htmlFor="pro">Pro</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="enterprise" id="enterprise" />
                    <Label htmlFor="enterprise">Enterprise</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Disabled group</Label>
                <RadioGroup defaultValue="a" disabled>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="a" id="da" />
                    <Label htmlFor="da" className="text-muted-foreground">Option A</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="b" id="db" />
                    <Label htmlFor="db" className="text-muted-foreground">Option B</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </SectionCard>
        )}

        {section === "textarea" && (
          <SectionCard title="Textarea">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" aria-invalid placeholder="Write your message..." className="min-h-[120px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disabled-ta">Disabled</Label>
                <Textarea id="disabled-ta" aria-invalid placeholder="Cannot type here" disabled />
              </div>
            </div>
          </SectionCard>
        )}

        {section === "datepicker" && (
          <SectionCard title="Date Picker">
            <div className="space-y-2">
              <Label>Pick a date</Label>
              <Popover>
                <PopoverTrigger
                  className={cn(
                    "inline-flex w-[240px] items-center justify-start gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-normal shadow-xs hover:bg-accent hover:text-accent-foreground",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </SectionCard>
        )}

        {section === "fileupload" && (
          <div className="flex flex-col gap-6">
            <SectionCard title="Single File Upload">
              <FileInput id="demo-single" />
            </SectionCard>
            <SectionCard title="Multi File Upload">
              <MultiFileInput maxFiles={5} accept=".pdf,.doc,.docx,.jpg,.png" />
            </SectionCard>
          </div>
        )}

        {section === "slider" && (
          <SectionCard title="Slider">
            <div className="space-y-6 max-w-sm">
              <div className="space-y-2">
                <Label>Volume: {sliderValue[0]}</Label>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={sliderValue}
                  onValueChange={(val) =>
                    setSliderValue(Array.isArray(val) ? [...val] : [val as number])
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Disabled Slider</Label>
                <Slider defaultValue={[30]} disabled />
              </div>
            </div>
          </SectionCard>
        )}

        {section === "toggle" && (
          <SectionCard title="Toggle">
            <div className="flex flex-wrap gap-3">
              <Toggle aria-label="Bold" variant="default">
                <span className="font-bold">B</span>
              </Toggle>
              <Toggle aria-label="Italic" variant="outline">
                <span className="italic">I</span>
              </Toggle>
              <Toggle aria-label="Underline" variant="outline" defaultPressed>
                <span className="underline">U</span>
              </Toggle>
              <Toggle aria-label="Disabled" disabled>
                Disabled
              </Toggle>
            </div>
          </SectionCard>
        )}

        {section === "switch" && (
          <SectionCard title="Switch">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="notifications"
                  checked={switchOn}
                  onCheckedChange={setSwitchOn}
                />
                <Label htmlFor="notifications">
                  Notifications {switchOn ? "on" : "off"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="airplane" />
                <Label htmlFor="airplane">Airplane mode</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="disabled-sw" disabled />
                <Label htmlFor="disabled-sw" className="text-muted-foreground">
                  Disabled
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="disabled-sw-on" disabled defaultChecked />
                <Label htmlFor="disabled-sw-on" className="text-muted-foreground">
                  Disabled &amp; on
                </Label>
              </div>
            </div>
          </SectionCard>
        )}

        {section === "text-editor" && (
          <SectionCard title="Text Editor">
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button size="sm" variant="outlineGray">B</Button>
                <Button size="sm" variant="outlineGray">I</Button>
                <Button size="sm" variant="outlineGray">U</Button>
              </div>
              <div contentEditable className="min-h-[140px] rounded-md border p-3 text-sm outline-none">
                Start writing rich text content...
              </div>
            </div>
          </SectionCard>
        )}
      </main>
    </div>
  )
}
