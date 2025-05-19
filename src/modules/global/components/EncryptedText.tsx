import { useEffect, useId, useRef } from "react"
import { randomNumericChar } from "../constants/number"
import { asyncIterable } from "../lib/asyncIterable"
import { rangeRandom } from "../lib/rangeRandom"

interface EncryptedTextProps {
  text: string
  isVisible?: boolean
  className?: string
  autoStart?: boolean | number
  iterations: number
  iterationDelay?: number
  animate?: boolean
}

export function EncryptedText({
  text,
  autoStart,
  animate,
  iterations,
  iterationDelay = 75,
  isVisible = true,
  className,
}: EncryptedTextProps) {
  const id = useId()

  // Ref Variables
  const ignoredIndexes = useRef(new Set<number>())
  const randomGlitchInterval = useRef<NodeJS.Timeout | null>(null)

  // Help Functions
  function changeCharAtIndex(index: number, char: string) {
    const span = document.querySelector(`#${id}_char_${index}`)
    if (!span) return

    span.innerHTML = char
  }

  function replaceText(replacer: (index: number) => string) {
    text.split("").forEach((_, index) => {
      // This means that the index is already replaced
      if (ignoredIndexes.current.has(index)) return

      changeCharAtIndex(index, replacer(index))
    })
  }

  async function shuffleReview(finalText: string, options?: { signal?: AbortSignal }) {
    try {
      ignoredIndexes.current.clear()
      for await (const i of asyncIterable(iterations, iterationDelay, options)) {
        // Replace entire text with random characters
        // Within the loop this will give a encryption effect
        replaceText(randomNumericChar)

        // Replace 1 char at a time until the text is fully replaced
        const reviewIndex = Math.floor((i * finalText.length) / iterations)

        if (reviewIndex !== Math.floor(((i - 1) * finalText.length) / iterations)) {
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
    } catch {
      // DO NOTHING
      // The cleanup function might abort future requests, so it is better to make it before start the function on top.
    }
  }

  // Effects
  useEffect(() => {
    if (!isVisible) return

    const ac = new AbortController()
    const { signal } = ac
    shuffleReview(text, { signal })

    return () => ac.abort()
  }, [autoStart, text, isVisible])

  async function randomGlitch(delay: number) {
    await new Promise((resolve) => setTimeout(resolve, delay))

    let randomIndex = rangeRandom(0, text.length - 1)
    while (text[randomIndex] === " ") {
      randomIndex = rangeRandom(0, text.length - 1)
    }

    const randomChar = randomNumericChar()
    changeCharAtIndex(randomIndex, randomChar)
    await new Promise((resolve) => setTimeout(resolve, 100))
    changeCharAtIndex(randomIndex, text[randomIndex])

    const randomness = rangeRandom(1000, 8000)
    if (randomness > 7500) await shuffleReview(text)

    randomGlitch(randomness)
  }

  useEffect(() => {
    if (!animate) return
    if (randomGlitchInterval.current) clearInterval(randomGlitchInterval.current)

    randomGlitch(rangeRandom(2000, 6000))
  }, [animate])

  return (
    <>
      {new Array(text.length).fill(0).map((_, index) =>
        text[index] !== " " ? (
          <span id={`${id}_char_${index}`} key={`${id}_char_${index}`} data-animate={animate} className={className}>
            {0}
          </span>
        ) : (
          <span key={`${id}_blank_${index}`}>&nbsp;</span>
        )
      )}
    </>
  )
}
