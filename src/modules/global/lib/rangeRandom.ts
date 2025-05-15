/**
 * Generate a random number between min and max
 * @param min - The minimum number to generate
 * @param max - The maximum number to generate
 * @returns - A random number between min and max
 */
export const rangeRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
