import { useRef, useState } from "react"
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion"
import { CardWidget, CardWidgetContent, CardWidgetHeader, CardWidgetTitle } from "@dpds-gov/design-system"
import { Button } from "@dpds-gov/design-system"
import { FadeIn } from "@dpds-gov/design-system"
import { cn } from "@dpds-gov/design-system"

/* ── helpers ── */

function DemoCard({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <CardWidget className={className}>
      <CardWidgetHeader><CardWidgetTitle>{title}</CardWidgetTitle></CardWidgetHeader>
      <CardWidgetContent>
        <div className="flex flex-wrap items-center justify-center gap-4 min-h-[120px]">
          {children}
        </div>
      </CardWidgetContent>
    </CardWidget>
  )
}

const BOX = "size-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-mono font-bold text-sm"

/* ── Magnetic Button ── */

function MagneticButton() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 20 })
  const sy = useSpring(y, { stiffness: 300, damping: 20 })

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.35)
    y.set((e.clientY - cy) * 0.35)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="p-8" onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <motion.div style={{ x: sx, y: sy }}>
        <Button variant="filled">Magnetic</Button>
      </motion.div>
    </div>
  )
}

/* ── Cursor Glow Card ── */

function CursorGlowCard() {
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  const bg = useMotionTemplate`radial-gradient(160px circle at ${mx}px ${my}px, #26D07C33, transparent 80%)`

  return (
    <motion.div
      className="relative w-64 h-36 rounded-2xl border border-border bg-card overflow-hidden flex items-center justify-center cursor-crosshair"
      onPointerMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left)
        my.set(e.clientY - r.top)
      }}
      onPointerLeave={() => { mx.set(-200); my.set(-200) }}
    >
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: bg }} />
      <p className="text-sm font-mono font-medium relative z-10 text-muted-foreground">Move cursor here</p>
    </motion.div>
  )
}

/* ── Stagger list ── */

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}


function StaggerList() {
  const [key, setKey] = useState(0)
  const items = ["Dubai HQ", "Al Barsha", "Deira", "Jebel Ali", "Sharjah"]

  return (
    <div className="space-y-4 w-full max-w-xs">
      <motion.ul key={key} variants={staggerContainer} initial="hidden" animate="show" className="space-y-2">
        {items.map(item => (
          <motion.li
            key={item}
            // variants={staggerItem}
            className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-2.5 text-sm font-medium"
          >
            <span className="size-2 rounded-full bg-primary shrink-0" />
            {item}
          </motion.li>
        ))}
      </motion.ul>
      <Button size="sm" variant="outlineGray" onClick={() => setKey(k => k + 1)}>Replay</Button>
    </div>
  )
}

/* ── AnimatePresence list add/remove ── */

function PresenceList() {
  const [items, setItems] = useState(["Request #001", "Request #002", "Request #003"])
  let counter = useRef(4)

  function add() {
    setItems(p => [`Request #00${counter.current++}`, ...p])
  }
  function remove(i: string) {
    setItems(p => p.filter(x => x !== i))
  }

  return (
    <div className="space-y-3 w-full max-w-xs">
      <Button size="sm" onClick={add}>Add item</Button>
      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {items.map(item => (
            <motion.li
              key={item}
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 8 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-2.5 text-sm font-medium overflow-hidden"
            >
              <span>{item}</span>
              <button
                onClick={() => remove(item)}
                className="text-muted-foreground hover:text-destructive transition-colors text-xs font-mono"
              >
                ✕
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}

/* ── Scroll reveal ── */

function ScrollRevealItem({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl bg-muted/40 border border-border p-4 text-sm font-mono"
    >
      Section {index + 1} — scroll-triggered
    </motion.div>
  )
}

/* ── 3D Tilt Card ── */

function TiltCard() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-60, 60], [18, -18])
  const rotateY = useTransform(x, [-80, 80], [-18, 18])

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      onPointerMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - r.left - r.width / 2)
        y.set(e.clientY - r.top - r.height / 2)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}
      className="w-52 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center cursor-pointer select-none"
    >
      <p className="font-mono font-bold text-primary text-sm" style={{ transform: "translateZ(20px)" }}>
        Tilt me
      </p>
    </motion.div>
  )
}

/* ── SVG path draw ── */

function PathDraw() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: false })

  return (
    <svg ref={ref} viewBox="0 0 200 60" className="w-48 h-14" fill="none">
      <motion.path
        d="M10 50 C 40 10, 80 10, 100 30 S 160 50, 190 10"
        stroke="var(--color-primary-500)"
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
    </svg>
  )
}

/* ── Keyframe spinner ── */

function KeyframeSpinner() {
  return (
    <motion.div
      className="size-12 rounded-full border-4 border-border border-t-primary"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
    />
  )
}

/* ── Counter ── */

function CounterDemo() {
  const [count, setCount] = useState(0)
  return (
    <div className="flex items-center gap-4">
      <Button size="sm" variant="outlineGray" onClick={() => setCount(c => Math.max(0, c - 1))}>−</Button>
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.18 }}
          className="font-mono font-bold text-3xl w-12 text-center tabular-nums"
        >
          {count}
        </motion.span>
      </AnimatePresence>
      <Button size="sm" onClick={() => setCount(c => c + 1)}>+</Button>
    </div>
  )
}

/* ── Drag ── */

function DragDemo() {
  return (
    <div className="relative w-64 h-28 rounded-2xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
      <motion.div
        drag
        dragConstraints={{ left: -80, right: 80, top: -30, bottom: 30 }}
        dragElastic={0.15}
        whileDrag={{ scale: 1.1 }}
        whileHover={{ scale: 1.05 }}
        className={cn(BOX, "cursor-grab active:cursor-grabbing")}
      >
        Drag
      </motion.div>
    </div>
  )
}

/* ── Page ── */

export default function AnimationsPage() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex flex-1 flex-col gap-6 p-4 lg:gap-6 lg:p-6">
        <FadeIn from="up">
          <div>
            <h1 className="text-[40px] font-bold font-mono tracking-tight text-secondary-600 dark:text-success-300">
              Animations
            </h1>
            <p className="text-sm md:text-2xl text-gray-500">Framer Motion demos — interactions, transitions &amp; effects</p>
          </div>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {/* Basic transitions */}
          <DemoCard title="Transition presets">
            {[
              { label: "Spring",  t: { type: "spring", stiffness: 300, damping: 20 } },
              { label: "Ease",    t: { duration: 0.4, ease: "easeInOut" } },
              { label: "Bounce",  t: { type: "spring", stiffness: 400, damping: 10 } },
            ].map(({ label }) => (
              <motion.div
                key={label}
                className={BOX}
                whileHover={{ scale: 1.15, rotate: 6 }}
                // transition={t}
              >
                {label}
              </motion.div>
            ))}
          </DemoCard>

          {/* Gesture */}
          <DemoCard title="Gestures">
            <motion.div
              className={BOX}
              whileHover={{ scale: 1.12, backgroundColor: "var(--color-primary-400)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Tap
            </motion.div>
            <motion.div
              className={BOX}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
            >
              Hover
            </motion.div>
            <motion.div
              className={cn(BOX, "cursor-pointer")}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              Float
            </motion.div>
          </DemoCard>

          {/* Drag */}
          <DemoCard title="Drag with constraints">
            <DragDemo />
          </DemoCard>

          {/* Counter */}
          <DemoCard title="AnimatePresence — counter">
            <CounterDemo />
          </DemoCard>

          {/* Keyframe spinner */}
          <DemoCard title="Keyframe animation">
            <KeyframeSpinner />
            <motion.div
              className="size-12 rounded-2xl bg-primary/20 border-2 border-primary"
              animate={{ borderRadius: ["16px", "50%", "16px"], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </DemoCard>

          {/* SVG draw */}
          <DemoCard title="SVG path draw (scroll to replay)">
            <PathDraw />
          </DemoCard>

          {/* Magnetic */}
          <DemoCard title="Magnetic button">
            <MagneticButton />
          </DemoCard>

          {/* 3D tilt */}
          <DemoCard title="3D tilt (pointer)">
            <TiltCard />
          </DemoCard>

          {/* Cursor glow */}
          <DemoCard title="Cursor glow card" className="md:col-span-2 xl:col-span-1">
            <CursorGlowCard />
          </DemoCard>

          {/* Stagger */}
          <DemoCard title="Stagger children">
            <StaggerList />
          </DemoCard>

          {/* Presence list */}
          <DemoCard title="AnimatePresence — list">
            <PresenceList />
          </DemoCard>

          {/* FadeIn variants */}
          <CardWidget className="md:col-span-2">
            <CardWidgetHeader><CardWidgetTitle>FadeIn component — direction variants</CardWidgetTitle></CardWidgetHeader>
            <CardWidgetContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(["up", "down", "left", "right"] as const).map((dir, i) => (
                  <FadeIn key={dir} from={dir} delay={i * 0.15}>
                    <div className="rounded-xl bg-primary/10 border border-primary/20 p-4 text-sm font-mono font-medium text-primary text-center">
                      from: {dir}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </CardWidgetContent>
          </CardWidget>

          {/* Scroll reveal */}
          <CardWidget className="md:col-span-2 xl:col-span-3">
            <CardWidgetHeader><CardWidgetTitle>Scroll-triggered reveal (useInView)</CardWidgetTitle></CardWidgetHeader>
            <CardWidgetContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {Array.from({ length: 6 }, (_, i) => (
                  <ScrollRevealItem key={i} index={i} />
                ))}
              </div>
            </CardWidgetContent>
          </CardWidget>

        </div>
      </main>
    </div>
  )
}
