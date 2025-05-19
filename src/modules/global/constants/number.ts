import { rangeRandom } from "../lib/rangeRandom"

export const NUMERIC_CHARACTERS = "0123456789"

export const randomNumericChar = () => NUMERIC_CHARACTERS.charAt(rangeRandom(0, NUMERIC_CHARACTERS.length - 1))
