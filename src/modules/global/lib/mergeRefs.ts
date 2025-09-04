export function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value)
      } else if (ref) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}
