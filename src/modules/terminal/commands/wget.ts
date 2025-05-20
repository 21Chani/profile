import { asyncIterable } from "@/modules/global/lib/asyncIterable"
import { format } from "date-fns"
import { PROFILE_PATH } from "../constants"
import type { TerminalMessage } from "../types"

/**
 * wgetCommandUsage function
 * @returns the usage message for the wget command
 */
export function wgetCommandUsage(): TerminalMessage {
  return {
    date: new Date(),
    lines: [
      "wget",
      "wget: missing URL",
      "Usage: wget [URL]...",
      "Available options:",
      "   - https://chani.sh/ - Home Page",
      "   - https://chani.sh/about - About Me",
      "   - https://chani.sh/projects - Projects",
      "   - https://chani.sh/social - Social",
      "Example: wget https://chani.sh",
    ],
    path: PROFILE_PATH,
  }
}

/**
 * wget Command function
 *
 * Simulates a wget command in a terminal.
 * @param url - The URL to """download""".
 * @returns An async generator that yields a TerminalMessage object with lines solving.
 */
export async function* wgetCommand(_url: string): AsyncGenerator<string[]> {
  const date = new Date()

  let progressLabel = `=>                              `
  // Static lines to iterate through
  const lines = [
    `--${format(date, "yyyy-MM-dd HH:mm:ss")}--  https://chani.sh/`,
    "Resolving chani.sh (chani.sh)... 66.33.60.66, 66.33.60.67",
    "HTTP request sent, awaiting response... 200 OK",
    "Length: 12345678 (12M) [text/html]",
    "Saving to: 'index.html'",
    " ",
    `index.html 100%[${progressLabel}] 12.34M   1234KB/s    in 10s`,
  ]
  //   if(initialMessage)

  // Iterate and update over the lines
  for await (const i of asyncIterable(lines.length, 500)) {
    yield lines.slice(0, i)
  }

  for await (const i of asyncIterable(30, 100)) {
    progressLabel = progressLabel.replace("> ", "=>")
    lines[6] = `index.html     100%[${progressLabel}]  12.34M   1234KB/s    in ${i / 10}s`
    yield lines
  }
}
