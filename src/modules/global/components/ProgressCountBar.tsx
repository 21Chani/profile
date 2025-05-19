import type { DetailedHTMLProps, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface ProgressCountBarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  itemCount: number
  activeIndex: number
  disabled?: boolean
  onCompleteCycle?: (newIndex: number) => void
  onSelectItem?: (index: number) => void
}

export function ProgressCountBar({
  itemCount,
  activeIndex,
  onCompleteCycle,
  onSelectItem,
  disabled,
  className,
  ...props
}: ProgressCountBarProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-1 p-3 aria-hidden:opacity-0 transition-[opacity] duration-700 ease-out",
        className
      )}
      {...props}
    >
      {new Array(itemCount).fill(0).map((_, index) => (
        <button
          role="option"
          key={`operating_system_selector_${index}`}
          className="w-1.5 h-full bg-foreground-alt/30 aria-hidden:opacity-0 transition-all ease-out duration-1000  cursor-pointer relative  rounded-2xl overflow-hidden"
          onClick={() => onSelectItem?.(index)}
        >
          <div
            data-active={activeIndex === index && !disabled}
            className="w-full absolute data-[active=false]:scale-0 top-0 data-[active=true]:animate-expand-from-top-to-bottom-4000 h-full bg-gradient-to-b from-white to-gray-600 rounded-full"
            onAnimationEnd={() => onCompleteCycle?.(index + 1)}
          />
        </button>
      ))}
    </div>
  )
}
