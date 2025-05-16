import clsx from "clsx"
import { type PropsWithChildren } from "react"

export function ItemInfo({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx("flex items-center gap-2 uppercase leading-3 text-gray-500 text-xs ml-2", className)}>
      <div className="b-border-2 z-10 size-1 rounded-md  bg-white shadow-[0px_0px_4px_2px_#fffb] border-gray-400 bevel-offset-[3px]" />{" "}
      {children}
    </div>
  )
}
