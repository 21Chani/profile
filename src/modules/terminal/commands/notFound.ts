import { PROFILE_PATH } from "../constants"
import type { TerminalMessage } from "../types"

export function commandNotFound(command: string): TerminalMessage {
  return {
    date: new Date(),
    lines: [`zsh: command not found: ${command}`, `type help for a list of available commands`],
    path: PROFILE_PATH,
  }
}
