import { useState, useEffect } from "react"
import { useLottie } from "lottie-react"
import { Search, Play, Pause, RotateCcw, Copy, Check } from "lucide-react"
import { lottieRegistry, type LottieIconEntry } from "@/components/lottie/registry"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@dpds-gov/design-system"
import { cn } from "@dpds-gov/design-system"

function LottieCard({ entry, animationData }: { entry: LottieIconEntry; animationData: unknown }) {
  const [playing, setPlaying] = useState(true)
  const [copied, setCopied]   = useState(false)

  const { View, play, pause, goToAndPlay } = useLottie({
    animationData,
    loop: true,
    autoplay: true,
    style: { width: "100%", height: "100%" },
  })

  function togglePlay() {
    if (playing) { pause() } else { play() }
    setPlaying((p) => !p)
  }

  function restart() {
    goToAndPlay(0)
    setPlaying(true)
  }

  function copyId() {
    navigator.clipboard.writeText(entry.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="group relative flex flex-col items-center rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5">
      <div className="relative w-full aspect-square max-w-[120px]">{View}</div>

      <p className="mt-3 text-xs font-medium text-foreground text-center leading-tight truncate w-full">
        {entry.name}
      </p>
      <p className="mt-0.5 text-[10px] text-muted-foreground font-mono text-center truncate w-full">
        {entry.id}
      </p>

      {/* Controls – appear on hover */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button onClick={copyId} title="Copy ID"
          className="flex items-center justify-center size-6 rounded-md bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
          {copied ? <Check className="size-3 text-primary-500" /> : <Copy className="size-3" />}
        </button>
        <button onClick={restart} title="Restart"
          className="flex items-center justify-center size-6 rounded-md bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
          <RotateCcw className="size-3" />
        </button>
        <button onClick={togglePlay} title={playing ? "Pause" : "Play"}
          className="flex items-center justify-center size-6 rounded-md bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
          {playing ? <Pause className="size-3" /> : <Play className="size-3" />}
        </button>
      </div>
    </div>
  )
}

/* ─── Lazy wrapper – resolves the dynamic import then renders ── */
function LazyLottieCard({ entry }: { entry: LottieIconEntry }) {
  const [animationData, setAnimationData] = useState<unknown>(null)

  useEffect(() => {
    let cancelled = false
    entry.load().then((mod) => {
      if (!cancelled) setAnimationData(mod.default ?? mod)
    })
    return () => { cancelled = true }
  }, [entry])

  if (!animationData) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-4 animate-pulse">
        <div className="w-full aspect-square max-w-[120px] rounded-xl bg-muted" />
        <div className="mt-3 h-2.5 w-3/4 rounded bg-muted" />
        <div className="mt-1.5 h-2 w-1/2 rounded bg-muted" />
      </div>
    )
  }

  return <LottieCard entry={entry} animationData={animationData} />
}

/* ─── Main page ─────────────────────────────────────────────── */
export default function LottieIconsPage() {
  const [query, setQuery] = useState("")

  const filtered = lottieRegistry.filter(
    (e) =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.id.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-foreground font-mono">Lottie Icons</h1>
          <p className="text-sm text-muted-foreground">
            {lottieRegistry.length} animated icons · hover a card for controls
          </p>
        </div>

        <InputGroup className="w-full sm:w-64 h-10">
          <InputGroupAddon>
            <InputGroupText><Search /></InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search icons…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* Stats strip */}
      {/* <div className="flex flex-wrap gap-3">
        {[
          { label: "Total icons", value: lottieRegistry.length },
          { label: "Showing",     value: filtered.length },
          { label: "Loading",     value: "Lazy" },
          { label: "Format",      value: "Lottie JSON" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2">
            <span className="text-xs text-muted-foreground">{s.label}</span>
            <span className="text-xs font-semibold text-foreground">{s.value}</span>
          </div>
        ))}
      </div> */}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-3">
          {filtered.map((entry) => (
            <LazyLottieCard key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 size-14 rounded-2xl bg-muted flex items-center justify-center">
            <Search className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">No icons found</p>
          <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
        </div>
      )}

      {/* Usage hint */}
      <div className="rounded-2xl border border-border bg-muted/40 p-5">
        <p className="text-xs font-semibold text-foreground mb-2">Usage</p>
        <pre className={cn(
          "text-xs text-muted-foreground overflow-x-auto rounded-lg bg-background p-4 ring-1 ring-border font-mono leading-relaxed"
        )}>
{`import { useLottie } from "lottie-react"
import { lottieRegistry } from "@/components/lottie/registry"

// Only this icon's JSON is fetched — others stay out of the bundle
const entry = lottieRegistry.find((i) => i.id === "icon-01")!
const data  = (await entry.load()).default

const { View } = useLottie({ animationData: data, loop: true, autoplay: true })

return <>{View}</>`}
        </pre>
      </div>
    </div>
  )
}
