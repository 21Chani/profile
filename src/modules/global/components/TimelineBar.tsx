import { type DetailedHTMLProps, type HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface TimelineBarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**
   * Number of sections you want on your timeline.
   */
  sectionsAmount: number

  disabled?: boolean
  onSelectItem?: (index: number) => void
}

/**
 * Timeline Bar
 * It render a timeline that reacts to `--progress` variable from parent component.
 *
 * The reason for using variable css, is that we avoid countless react rerenders.
 * That way we keep it clean and performatic.
 */
export function TimelineBar({ sectionsAmount, onSelectItem, disabled, className, ...props }: TimelineBarProps) {
  const step = 1 / sectionsAmount

  return (
    <div
      style={{ "--progress": "inherit" } as React.CSSProperties}
      className={twMerge("flex flex-col gap-1 p-3 aria-hidden:opacity-0 ", className)}
      {...props}
    >
      {new Array(sectionsAmount).fill(0).map((_, index) => (
        <button
          role="option"
          key={`timeline_section_${index}`}
          className="w-1.5 h-full flex items-start bg-foreground-alt/30 relative rounded-2xl "
          aria-hidden="false"
        >
          <div
            className="w-full h-full bg-gray-300 rounded-full"
            style={
              {
                // "--progress": "inherit",
                "--local-progress": `clamp(0, (var(--progress) - ${index * step}) / ${step}, 1)`,
                height: "calc(var(--local-progress) * 100%)",
              } as React.CSSProperties
            }
          />
        </button>
      ))}
    </div>
  )
}
