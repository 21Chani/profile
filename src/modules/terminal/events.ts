import { EventEmitter } from "events"

export const TerminalEvents = new EventEmitter<{
  open: []
  close: []
  execute: [string] | [undefined]
}>()
