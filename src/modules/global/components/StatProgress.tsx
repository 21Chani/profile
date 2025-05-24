import { useCallback, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { usePrevious } from "../hooks/usePrevious"
import { asyncIterable } from "../lib/asyncIterable"

interface StatProgressProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  icon?: React.ReactNode
  level: number
  duration?: number
  initialDuration?: number
}

const MAX_SEGMENTS = 5

/**
 * StatProgress Component
 * Displays a progress bar with a given number of segments.
 * The segments are animated to open and close when the level changes.
 */
export function StatProgress({
  icon,
  level,
  className,
  duration = 400,
  initialDuration = 150,
  ...props
}: StatProgressProps) {
  // Validations
  if (level > MAX_SEGMENTS) throw new Error(`Level ${level} is greater than max segments ${MAX_SEGMENTS}`)

  // Ref Variables
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const previousLevel = usePrevious(level)

  /**
   * Update Levels
   * Performs the animation to open or close the levels.
   * It will open or close the levels in the order they are defined.
   * @param levels - Array of levels to be modified
   * @param status - Status of the level, either "open" or "closed"
   * @param delay - Delay between each level animation
   */
  const updateLevels = useCallback(
    async function (levels: number[], status: "closed" | "open", delay = 400) {
      for await (const lvl of asyncIterable(levels, delay)) {
        if (!container) return // Type verification
        const div = container.querySelector(`#stat_level_${lvl}`) as HTMLDivElement
        div.style.setProperty("transition-duration", `${delay}ms`) // Update transition duration to match the delay
        div.setAttribute("data-status", status)
      }
    },
    [container]
  )

  /**
   * Close, Open and Initial state effect.
   * All the transitions will be triggered by this effect.
   */
  useEffect(() => {
    if (!previousLevel) return // Type verification
    const diff = level - previousLevel
    const direction = diff > 0 ? 1 : -1

    if (!diff) {
      // Initial State, open all levels with a faster duration
      const levels = new Array(level).fill(0).map((_, i) => level - i)
      updateLevels(levels, "open", initialDuration)
      return
    }

    if (direction === -1) {
      // Close Levels
      const levels = new Array(previousLevel - level).fill(0).map((_, i) => previousLevel - i)
      updateLevels(levels, "closed")
    } else {
      // Open Levels
      const levels = new Array(level - previousLevel).fill(0).map((_, i) => level - i)
      updateLevels(levels.reverse(), "open")
    }
  }, [level, updateLevels])

  return (
    <div ref={setContainer} className={twMerge("flex items-center ", className)} {...props}>
      {new Array(MAX_SEGMENTS)
        .fill(0)
        .map((_, i) => MAX_SEGMENTS - i)
        .map((level) => (
          <button
            role="option"
            data-status={"closed"}
            id={`stat_level_${level}`}
            key={`stat_level_${level}`}
            aria-label={`Stat Level ${level}`}
            style={{ background: `var(--color-gray-${MAX_SEGMENTS - level + 2}00)` }}
            className={"h-2 w-8 data-[status=closed]:w-0 ease-in-out rounded-full transition-all "}
          />
        ))}
      {icon}
    </div>
  )
}
