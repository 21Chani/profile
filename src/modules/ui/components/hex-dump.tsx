import { useMemo } from "react"

const HEX = "0123456789ABCDEF"

function randomHex(n: number): string {
  let s = ""
  for (let i = 0; i < n; i++) s += HEX[Math.floor(Math.random() * 16)]
  return s
}

function randomAscii(n: number): string {
  let s = ""
  for (let i = 0; i < n; i++) s += String.fromCharCode(33 + Math.floor(Math.random() * 93))
  return s
}

type RowData =
  | { type: "gap" }
  | { type: "hex"; addr: string; pairs: string; ascii: string }
  | { type: "event"; cls: string; tag: string; message: string; suffix: string }

const EVENT_TEMPLATES = [
  { cls: "text-white/[0.06]", tag: "[WARN]", message: "memory allocation failed at 0x" },
  { cls: "text-white/[0.06]", tag: "[WARN]", message: "buffer overflow detected 0x" },
  { cls: "text-white/[0.06]", tag: "[WARN]", message: "heap fragmentation at 0x" },
  { cls: "text-white/[0.07]", tag: "[ERR]", message: " stack overflow at 0x" },
  { cls: "text-white/[0.07]", tag: "[ERR]", message: " segfault in thread 0x" },
  { cls: "text-white/[0.07]", tag: "[ERR]", message: " null pointer deref 0x" },
  { cls: "text-white/[0.045]", tag: "[SYS]", message: " process 0x" },
  { cls: "text-white/[0.045]", tag: "[SYS]", message: " allocated 0x" },
  { cls: "text-white/[0.045]", tag: "[SYS]", message: " gc sweep cycle 0x" },
]

function generateColumn(totalRows: number): RowData[] {
  const rows: RowData[] = []
  let i = 0
  while (i < totalRows) {
    if (Math.random() < 0.3) {
      rows.push({ type: "gap" })
      i++
      continue
    }
    if (Math.random() < 0.15) {
      const evt = EVENT_TEMPLATES[Math.floor(Math.random() * EVENT_TEMPLATES.length)]
      rows.push({ type: "event", cls: evt.cls, tag: evt.tag, message: evt.message, suffix: randomHex(4) })
      rows.push({ type: "gap" })
      i += 2
      continue
    }
    const addr = "0x" + ((i % totalRows) * 16).toString(16).toUpperCase().padStart(6, "0")
    let pairs = ""
    for (let j = 0; j < 8; j++) pairs += " " + randomHex(2)
    rows.push({ type: "hex", addr, pairs, ascii: randomAscii(8) })
    i++
  }
  return rows
}

function HexRow({ row }: { row: RowData }) {
  if (row.type === "gap") return <div className="h-11" />
  if (row.type === "event") {
    return (
      <div className={`px-2.5 tracking-[1px] ${row.cls}`}>
        <span className="text-xxs tracking-[2px]">{row.tag}</span>
        {row.message}
        {row.suffix}
      </div>
    )
  }
  return (
    <div className="px-2.5">
      <span className="text-white/[0.05]">{row.addr}</span>
      {row.pairs} |{row.ascii}|
    </div>
  )
}

function HexColumn({ speed }: { speed: number }) {
  const rows = useMemo(() => generateColumn(50), [])

  return (
    <div
      className="flex flex-col font-mono text-[10px] leading-[22px] tracking-[1.5px] text-white/[0.035] select-none whitespace-nowrap shrink-0 will-change-transform animate-hex-scroll"
      style={{
        animationDuration: `${speed}s`,
        animationDelay: `${-(Math.random() * speed)}s`,
      }}
    >
      {/* Render rows twice for seamless loop */}
      {[0, 1].map((pass) => (
        <div key={pass}>
          {rows.map((row, i) => (
            <HexRow key={`${pass}-${i}`} row={row} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function HexDump() {
  return (
    <div
      className="absolute inset-0 inter-events-none z-0 overflow-hidden max-[860px]:hidden"
      style={{
        maskImage: "linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <div className="flex justify-between w-full px-[5%]">
        <HexColumn speed={75} />
        <HexColumn speed={85} />
      </div>
    </div>
  )
}
