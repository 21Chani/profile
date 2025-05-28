import { useAtomValue } from "jotai"
import { pointerPositiomAtom } from "../atoms/pointer"

export const usePointerPosition = () => useAtomValue(pointerPositiomAtom)
