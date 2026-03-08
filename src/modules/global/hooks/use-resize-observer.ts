import { useEffect } from "react"

interface UseResizeObserverOptions {
  onResize?: (entry: ResizeObserverEntry) => void
}

/**
 * use Many Resize Observer Hook
 * This hook allows you to observe multiple elements and trigger callbacks when they appear or leave the viewport.
 * It uses the Intersection Observer API to efficiently observe changes in the intersection of multiple elements with the viewport.
 * @param elements - An array of elements to observe. Each element can be a string (selector) or an HTMLElement.
 * @param param options - An object containing options for the Intersection Observer, including optional callbacks for when elements appear or leave the viewport.
 */
export function useResizeObserver(
  elements: (string | HTMLElement)[] | (string | HTMLElement),
  { onResize }: UseResizeObserverOptions
) {
  useEffect(() => {
    // Verify if elements is an array and has elements, or if it's a single element
    if (elements instanceof Array && !elements.length) return
    else if (!elements) return

    // Convert elements to an array if it's not already
    const elementsArray = Array.isArray(elements) ? elements : [elements]

    // Map elements to HTMLElements, resolving selectors if necessary
    const mappedElements = elementsArray.map((el) =>
      typeof el === "string" ? document.querySelector(el) : el
    ) as HTMLElement[]

    // Add intersection observer
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (onResize) {
          onResize(entry)
        }
      })
    })

    mappedElements.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [elements, onResize])
}
