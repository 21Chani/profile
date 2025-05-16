import { rangeRandom } from "./rangeRandom"

export async function* asyncIterable(size: number, delay = 50) {
  for (let i = 0; i < size; i++) {
    await new Promise((resolve) => setTimeout(resolve, delay))
    yield i
  }
}

/**
 * Shuffles a text element to a new text.
 *
 * @param element - The HTML element to shuffle.
 * @param newText - The new text to shuffle to.
 * @returns
 */
export async function encryptShuffle(element: HTMLElement, newText: string): Promise<void> {
  // Save the original text
  const elementText = element.innerText.split("")
  const max = Math.max(element.innerText.length, newText.length)

  // First Iteration will be only to randomize some special characters
  for await (const _ of asyncIterable(10, 100)) {
    const randomCrypto = elementText.map((char) => {
      if (!char || char == "") return char
      const shouldShuffle = rangeRandom(0, 1)
      if (!shouldShuffle) return char

      return SPECIAL_CHARS.charAt(rangeRandom(0, SPECIAL_CHARS.length - 1))
    })
    element.innerText = randomCrypto.join("")
  }

  // Second Iteration will be to randomize the text to the new text
  for await (const _ of asyncIterable(max, 100)) {
    const randomCrypto = elementText.map((char, index) => {
      if (!char || char == "") return char
      const shouldShuffle = rangeRandom(0, 1)
      if (!shouldShuffle) return char

      return newText.charAt(index % newText.length)
    })
    element.innerText = randomCrypto.join("")
  }
}
const SPECIAL_CHARS = "†ßØ“!@#$%^&*()_+[]{}|;':,.<>?/~`"
