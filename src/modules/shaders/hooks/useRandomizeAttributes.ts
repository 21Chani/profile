import { useCallback, useEffect } from "react"
import { BufferAttribute, BufferGeometry } from "three"
import { randomizeAttributes } from "../lib/randomizeAttributes"

interface UseRandomizeAttributesProps {
  geometry?: BufferGeometry
  enabled?: boolean
  attributeName?: string
}

export function useRandomizeAttributes({ geometry, enabled, attributeName = "a_Random" }: UseRandomizeAttributesProps) {
  function clearRandomAttributes() {
    if (!geometry) return
    const length = geometry.attributes.position.count
    const randomAttributes = new Float32Array(length)
    for (let i = 0; i < length; i++) {
      randomAttributes[i] = 0
    }

    // Update attribute
    geometry.setAttribute(attributeName, new BufferAttribute(randomAttributes, 1))
  }

  const randomize = useCallback(
    function () {
      if (!geometry) return clearRandomAttributes
      if (!enabled) return clearRandomAttributes

      randomizeAttributes(geometry, attributeName)
    },
    [geometry, enabled]
  )

  useEffect(() => void randomize(), [randomize])

  return {
    randomize,
  }
}
