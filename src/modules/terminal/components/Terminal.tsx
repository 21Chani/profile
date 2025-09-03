import { useControllableState } from "@/modules/global/hooks/useControllableState"

import { Dialog } from "radix-ui"
import { useEffect } from "react"
import { BiChevronRight, BiFolder } from "react-icons/bi"
import { twMerge } from "tailwind-merge"
import { TerminalEvents } from "../events"
import { useTerminal } from "../hooks/useTerminal"
import { TerminalRow } from "./TerminalRow"

interface TerminalProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string

  /**
   * Auto execute command
   * if shouldClose is provided terminal will be closed right after.
   */
  autoExecute?: { command: string; shouldClose?: boolean }
  /**
   * Default input command.
   * It will not be auto executed.
   */
  defaultCommand?: string

  // State
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (val: boolean) => void
}

/**
 * Terminal component
 * Performs a simulation of a terminal in bash/zsh using styles such as oh-my-zsh.
 * @param - defaultCommand - Default command to be executed when the terminal is opened.
 * @param - title - Title of the terminal.
 */
export function Terminal({
  className,
  autoExecute,
  defaultCommand,
  title = "chani@Portfolio-Pro",
  isOpen,
  defaultOpen,
  onOpenChange,
  ...props
}: TerminalProps) {
  const [_isOpen, _setIsOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: isOpen,
  })
  const { execCommand, input, isExecuting, messages } = useTerminal()

  useEffect(() => {
    if (!autoExecute) return
    execCommand(autoExecute.command).then(() => _setIsOpen(!autoExecute.shouldClose))
  }, [autoExecute])

  // Event listener.
  useEffect(() => {
    const updateOpen = () => _setIsOpen(true)
    const updateClose = () => _setIsOpen(false)
    const runCommand = (command: string) => {
      if (command) execCommand(command)
      else {
        command = input.current?.value ?? ""
        execCommand(command)
      }
    }

    TerminalEvents.addListener("open", updateOpen)
    TerminalEvents.addListener("close", updateClose)
    TerminalEvents.addListener("execute", runCommand)

    return () => {
      TerminalEvents.removeListener("open", updateOpen)
      TerminalEvents.removeListener("close", updateClose)
      TerminalEvents.removeListener("execute", runCommand)
    }
  }, [])

  return (
    <Dialog.Root open={_isOpen} onOpenChange={_setIsOpen}>
      <Dialog.Portal>
        <Dialog.Content
          className={twMerge(
            "fixed data-[state=open]:animate-scale-appear data-[state=closed]:animate-scale-disappear origin-top-right inset-0 bg-black/50 w-screen flex flex-col h-screen z-40 backdrop-blur overflow-hidden",
            className
          )}
          onEscapeKeyDown={(e) => e.preventDefault()}
          {...props}
        >
          <div
            aria-label="Title-Bar"
            className="h-10 w-full border bg-background-alt flex items-center gap-2 relative px-2"
          >
            <button className="size-3.5 cursor-pointer rounded-full bg-red-500" />
            <button className="size-3.5 cursor-pointer rounded-full bg-yellow-500" onClick={() => _setIsOpen(false)} />
            <button className="size-3.5 cursor-pointer rounded-full bg-green-500" />
            <div className="absolute items-center max-md:right-6 md:left-2/4  flex gap-2 md:-translate-x-2/4">
              <BiFolder className="size-6 fill-foreground" />
              <Dialog.Title className="text-foreground" asChild>
                <p className="max-md:text-sm">{title}</p>
              </Dialog.Title>
            </div>
          </div>

          <div
            className="w-full h-full overflow-y-auto p-4 cursor-text flex flex-col gap-4 "
            onClick={(el) => el.currentTarget.getElementsByTagName("input")[0].focus()}
          >
            {messages.map(({ date, lines, path }, index) => (
              <TerminalRow key={`terminal_row_${index}`} path={path} date={date}>
                {lines[0] !== undefined && (
                  <div className="flex items-center">
                    <BiChevronRight className=" size-6 scale-x-75 stroke-2 stroke-green-500" />
                    <p className="text-sm text-white h-5">{lines[0]}</p>
                  </div>
                )}
                {lines.slice(1).map((line, lineIndex) => (
                  <p
                    key={`terminal_row_${index}_line_${lineIndex}`}
                    className="text-sm text-white min-h-5 whitespace-pre-wrap"
                  >
                    {line}
                  </p>
                ))}
              </TerminalRow>
            ))}

            <TerminalRow hidden={isExecuting} date={new Date()}>
              <div className="flex items-center">
                <BiChevronRight className=" size-6 scale-x-75 stroke-2 stroke-green-500" />
                <input
                  ref={input}
                  onKeyDown={(event) => {
                    if (!(event.target instanceof HTMLInputElement)) return
                    if (event.ctrlKey && event.key === "l") execCommand("clear")
                    else if (event.ctrlKey && event.key === "u") {
                      event.target.value = ""
                    } else if (event.key === "Enter") {
                      execCommand((event.target as HTMLInputElement).value)
                      if (!input.current) return
                      ;(event.target as HTMLInputElement).value = "" // Clear the input
                    }
                  }}
                  defaultValue={defaultCommand}
                  className="w-full h-10 placeholder-white text-white outline-none"
                />
              </div>
            </TerminalRow>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
