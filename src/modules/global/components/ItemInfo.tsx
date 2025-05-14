import clsx from "clsx";
import { type PropsWithChildren } from "react";

export function ItemInfo({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 uppercase leading-3 text-foreground-alt max-md:text-xs",
        className
      )}
    >
      <div className="b-border-2 z-10 size-3 rounded-md border-2 border-orange-400 bevel-offset-[3px]" />{" "}
      {children}
    </div>
  );
}
