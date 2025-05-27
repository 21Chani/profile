import { useEffect, useRef } from "react"

interface IntersectionObserverOptions extends IntersectionObserverInit {
  onAppear?: (element: IntersectionObserverEntry, options: { direction: "up" | "down" }) => void
  onLeave?: (element: IntersectionObserverEntry, options: { direction: "up" | "down" }) => void
}

/**
 * use Many Intersection Observer Hook
 * This hook allows you to observe multiple elements and trigger callbacks when they appear or leave the viewport.
 * It uses the Intersection Observer API to efficiently observe changes in the intersection of multiple elements with the viewport.
 * @param elements - An array of elements to observe. Each element can be a string (selector) or an HTMLElement.
 * @param param options - An object containing options for the Intersection Observer, including optional callbacks for when elements appear or leave the viewport.
 */
export function useIntersectionObserver(
  elements: (string | HTMLElement)[] | (string | HTMLElement),
  { onAppear, onLeave, ...options }: IntersectionObserverOptions
) {
  const previousY = useRef(0)
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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const currentY = entry.boundingClientRect.y

        if (entry.isIntersecting) onAppear?.(entry, { direction: currentY < previousY.current ? "up" : "down" })
        else onLeave?.(entry, { direction: currentY < previousY.current ? "down" : "up" })
      })
    }, options)

    mappedElements.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [elements, onAppear, onLeave])
}
