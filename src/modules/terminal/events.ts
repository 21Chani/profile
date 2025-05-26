import { EventEmitter } from "events"

type Command = string
/**
 * Terminal events
 * Used to communicate between the terminal and other components.
 * @example
 * TerminalEvents.emit("open")
 * TerminalEvents.emit("close")
 * TerminalEvents.emit("execute", "ls -la")
 * TerminalEvents.emit("enter")
 *
 * Terminal Component does listen to these events and perform actions accordingly.
 */
export const TerminalEvents = new EventEmitter<{
  open: []
  close: []
  execute: [Command]
  enter: [] // to execute the command in the input.
}>()

// IMPORTANT: Current terminal feature is designed to have only one instance "running".
// TerminalEvents events will need to be redesigned to support multiple instances.
// Something like: TerminalEvents.emit("open", { id: "terminal-1" }) and so on.
