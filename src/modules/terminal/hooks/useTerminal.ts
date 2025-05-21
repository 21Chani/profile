import { useRef, useState } from "react"
import { commandNotFound } from "../commands/notFound"
import { wgetCommand, wgetCommandUsage } from "../commands/wget"
import { PROFILE_PATH } from "../constants"
import type { TerminalMessage } from "../types"

interface UseTerminalParams {
  initialMessages?: TerminalMessage[]
}

/**
 * Use Terminal hook
 * This hook is used to manage the terminal state and execute commands.
 * It provides the following features:
 * - Input ref to focus on the input element
 * - Messages state to store the terminal messages
 * - isExecuting state to indicate if a command is being executed
 * - execCommand function to execute a command
 * @param initialMessages - Initial messages to be displayed in the terminal
 * @returns
 */
export function useTerminal({ initialMessages = [] }: UseTerminalParams = {}) {
  // Refs
  const input = useRef<HTMLInputElement>(null)

  // State variables
  const [messages, setMessages] = useState<TerminalMessage[]>(initialMessages)
  const [isExecuting, setIsExecuting] = useState(false)

  /**
   * Execute a command in the terminal
   * It does perform the following actions:
   * - If the command is empty, it adds an empty message to the terminal
   * - If the command does not exist, it adds a command not found message
   * - If the command exists, it executes the command and updates the messages depending on how the command works.
   *
   * @param message - Input message containing the command and arguments
   * @returns - void
   */
  async function execCommand(message?: string) {
    // Essential variables
    const command = message?.split(" ")[0]
    const args = message?.split(" ").slice(1)

    // Command execution
    switch (command) {
      case "":
        // Add an empty message to the terminal.
        setMessages((p) => [...p, { date: new Date(), lines: [""], path: PROFILE_PATH }])
        break
      case "wget":
        // If there is no argument, show the usage of the command.
        if (!args?.length || args[0] === "") {
          setMessages((p) => [...p, wgetCommandUsage()])
          return
        }

        try {
          // Execute wget as an AsyncGenerator.
          setIsExecuting(true)
          setMessages([...messages, { date: new Date(), lines: [`wget ${args[0]}`], path: PROFILE_PATH }])
          for await (const message of wgetCommand(`${args[0]}`)) {
            setMessages((prev) => {
              const _messages = [...prev]
              _messages[_messages.length - 1].lines = [`wget ${args[0]}`, ...message]
              return _messages
            })
          }
        } finally {
          setTimeout(() => input.current?.focus(), 200)
          setIsExecuting(false)
        }
        break
      case "clear":
        setMessages(() => [])
        break
      default:
        setMessages((p) => [...p, commandNotFound(command || "zsh")])
    }
  }

  return {
    input,
    messages,
    setMessages,
    isExecuting,
    execCommand,
  }
}
