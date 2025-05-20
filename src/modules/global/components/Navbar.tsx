import { TerminalEvents } from "@/modules/terminal/events"
import { BiTerminal } from "react-icons/bi"
import { EncryptedText } from "./EncryptedText"

export function Navbar() {
  return (
    <nav className="flex flex-1 justify-between p-4 ">
      <h6 className="font-extrabold text-foreground uppercase">
        <EncryptedText text="- A coding guy." iterations={16} />
      </h6>

      <button onClick={() => TerminalEvents.emit("open")}>
        <BiTerminal className="size-10 fill-foreground-alt" />
      </button>
    </nav>
  )
}
