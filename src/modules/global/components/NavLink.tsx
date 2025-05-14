import { type PropsWithChildren } from "react";

export function NavLink({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center gap-2 font-jaro uppercase text-foreground-alt">
      <div className=" b-border-2 z-10 size-3 bevel-color-foreground-alt  bevel-offset-[3px]" />{" "}
      {children}
    </div>
  );
}
