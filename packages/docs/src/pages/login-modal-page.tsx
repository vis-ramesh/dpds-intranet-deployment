import { Dialog, DialogContent, DialogTrigger } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
import { LoginModalContent } from "@dpds-gov/design-system"
import { LogIn, Fingerprint } from "lucide-react"
import Icon34 from "@/components/lottie/Icon_34.json"

export default function LoginModalPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-1">Login Modal</h1>
        <p className="text-sm text-muted-foreground">Two variants of the sign-in popup</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Full form variant */}
        <Dialog>
          <DialogTrigger render={<Button variant="filled" size="md" className="gap-2"><LogIn className="size-4" />Full Login Form</Button>} />
          <DialogContent
            showCloseButton={false}
            className="bg-zinc-900 border-0 !max-w-[554px] w-full p-0 rounded-3xl overflow-hidden ring-0 shadow-2xl"
          >
            <LoginModalContent variant="full" lottieData={Icon34} />
          </DialogContent>
        </Dialog>

        {/* UAE Pass only variant */}
        <Dialog>
          <DialogTrigger render={<Button variant="outlineGreen" size="md" className="gap-2"><Fingerprint className="size-4" />UAE Pass Only</Button>} />
          <DialogContent
            showCloseButton={false}
            className="bg-zinc-900 border-0 !max-w-[554px] w-full p-0 rounded-3xl overflow-hidden ring-0 shadow-2xl"
          >
            <LoginModalContent variant="uaepass" lottieData={Icon34} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
