import { twMerge } from "tailwind-merge"
import { rangeRandom } from "../lib/rangeRandom"

interface CodeBlockProps {
  lineAMount?: number
  className?: string
}

export function CodeBlock({ lineAMount = 5, className }: CodeBlockProps) {
  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      {new Array(lineAMount).fill(0).map((_, i) => (
        <div
          key={`code_block_line_${i}`}
          style={{ width: `${rangeRandom(30, 100)}%` }}
          className="h-3 rounded-full bg-foreground-alt/10"
        />
      ))}
    </div>
  )
}
