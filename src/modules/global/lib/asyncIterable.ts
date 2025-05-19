/**
 * Performs an async iterable over a range of numbers or an array of numbers.
 * @param payload - The payload size the iterable or an array of numbers.
 * @param delay - The delay between each iteration in milliseconds.
 */
export async function* asyncIterable<
  IterableList extends unknown[] | readonly unknown[] = unknown[] | readonly unknown[],
  Payload extends number | IterableList = number | IterableList,
  Return = Payload extends IterableList ? Payload[number] : number
>(payload: Payload, delay = 50): AsyncGenerator<Return> {
  if (typeof payload === "number") {
    // If the payload is a number, create an iterable from 0 to payload length -1 and yield each number
    // This will create a simple list of numbers
    for (let i = 0; i < payload; i++) {
      yield i as Return
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  } else if (payload instanceof Array) {
    // If the payload is an array, yield each element of the array
    // There is no creation here, just a simple iteration on the given array
    for (const i of payload) {
      yield i
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  } else throw new Error("Invalid payload type. Must be a number or an array of numbers.")
}
