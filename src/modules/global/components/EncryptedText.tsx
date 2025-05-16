import { useEffect, useId, useRef } from "react"
import { twMerge } from "tailwind-merge"
import { rangeRandom } from "../lib/rangeRandom"
import { asyncIterable } from "../lib/shuffleText"

const CHARACTERS = new Array(10)
  .fill(0)
  .map((_, i) => i.toString())
  .join("")

const randomCrypto = () => CHARACTERS.charAt(rangeRandom(0, CHARACTERS.length - 1))

interface EncryptedTextProps {
  text: string
  className?: string
  autoStart?: boolean | number
  iterations: number
  iterationDelay?: number
}

export function EncryptedText({ text, autoStart, iterations, iterationDelay = 75, className }: EncryptedTextProps) {
  const id = useId()

  // Ref Variables
  const ignoredIndexes = useRef(new Set<number>())
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Help Functions
  function changeCharAtIndex(index: number, char: string) {
    const span = document.querySelector(`#${id}_char_${index}`)
    if (!span) return

    span.innerHTML = char
  }

  function randomEncryptText() {
    text.split("").forEach((_, index) => {
      // This means that the index is already replaced
      if (ignoredIndexes.current.has(index)) return

      changeCharAtIndex(index, randomCrypto())
    })
  }

  async function shuffleReview(finalText: string) {
    for await (const i of asyncIterable(iterations, iterationDelay)) {
      // Replace entire text with random characters
      // Within the loop this will give a encryption effect
      randomEncryptText()

      // Replace 1 char at a time until the text is fully replaced
      const reviewIndex = Math.floor((i * text.length) / iterations)

      if (reviewIndex !== Math.floor(((i - 1) * text.length) / iterations)) {
        let randomIndex = rangeRandom(0, finalText.length - 1)
        let iteration = 0
        while (ignoredIndexes.current.has(randomIndex) && iteration <= finalText.length) {
          iteration += 1
          randomIndex = (randomIndex + 1) % finalText.length
        }
        // TODO: Avoid this verification with a better algorithm
        if (ignoredIndexes.current.has(randomIndex)) continue
        ignoredIndexes.current.add(randomIndex)
        const span = document.querySelector(`#${id}_char_${randomIndex}`)
        if (!span) continue

        span.innerHTML = finalText.charAt(randomIndex)
      }
    }
  }

  // Effects
  useEffect(() => {
    const delay = typeof autoStart === "number" ? autoStart : 0
    timeoutRef.current = setTimeout(async () => {
      await shuffleReview(text)
      ignoredIndexes.current.clear()
    }, delay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [autoStart])

  return (
    <>
      {new Array(text.length).fill(0).map((_, index) =>
        text[index] !== " " ? (
          <span
            id={`${id}_char_${index}`}
            key={`${id}_char_${index}`}
            className={twMerge(" data-[animate=true]:animate-glitch relative inline-flex", className)}
          >
            {0}
          </span>
        ) : (
          <span key={`${id}_blank_${index}`}>&nbsp;</span>
        )
      )}
    </>
  )
}
