import { cva, type VariantProps } from "class-variance-authority"
import { BiChevronRight } from "react-icons/bi"
import { twMerge } from "tailwind-merge"
import { EncryptedText } from "./EncryptedText"
import { StatProgress } from "./StatProgress"

const statInfoStyles = cva("gap-2 flex items-start justify-start flex-col p-2", {
  variants: {
    direction: {
      rl: "justify-end items-end [&_.bar-wrapper]:flex-row-reverse [&_.indicator]:rotate-180",
      lr: "justify-start items-start [&_.bar]:flex-row-reverse",
    },
  },
  defaultVariants: {
    direction: "rl",
  },
})

interface StatInfoProps extends VariantProps<typeof statInfoStyles> {
  text: string
  iterations: number
  bars: { level: number; icon: React.ReactNode }[]
  className?: string
}

export function StatInfo({ text, iterations, bars, className, direction }: StatInfoProps) {
  return (
    <div className={twMerge(statInfoStyles({ direction }), className)}>
      <div className="flex flex-col items-start pt-4">
        <h1 className="text-lg font-thin leading-5 ">
          {`{{ `}
          <EncryptedText className="text-gradient-highlight" text={text} iterations={iterations} />
          {`. }}`}
        </h1>
      </div>
      {bars.map((bar, index) => (
        <div key={`bar_stat_index_${index}`} className="bar-wrapper flex reversable ">
          <BiChevronRight className={twMerge("size-5 scale-x-75 stroke-2 stroke-gray-300 indicator")} />
          <StatProgress className="stat-bar bar" {...bar} />
        </div>
      ))}
    </div>
  )
}
