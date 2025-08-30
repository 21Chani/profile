import { TerminalEvents } from "@/modules/terminal/events"
import { BiTerminal } from "react-icons/bi"
import { EncryptedText } from "./EncryptedText"

export function Navbar() {
  return (
    <nav className="flex flex-1 sticky top-0 justify-between p-4 ">
      <div className="flex items-center gap-2">
        <img src="/logo.png" className="size-12 rounded-full" />
        <h6 className="font-extrabold text-foreground uppercase">
          <EncryptedText text="- A coding guy." iterations={16} />
        </h6>
      </div>

      <button onClick={() => TerminalEvents.emit("open")}>
        <BiTerminal className="size-10 fill-foreground-alt" />
      </button>
    </nav>
  )
}
