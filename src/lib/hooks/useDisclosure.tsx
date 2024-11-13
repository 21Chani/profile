import { useState } from "react"

export function useDisclosure(defaultValue = false) {
	const [isOpen, setIsOpen] = useState(defaultValue)

	function open() {
		setIsOpen(true)
	}

	function close() {
		setIsOpen(false)
	}

	function toggle() {
		setIsOpen(!isOpen)
	}

	return {
		isOpen,
		open,
		close,
		toggle,
	}
}
