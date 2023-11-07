import { useState } from "react";

export function useClamp(min: number, max: number, defaultValue = min) {
	const [value, setPrimitiveValue] = useState(defaultValue);

	const next = () => {
		if (value < max) {
			setPrimitiveValue(value + 1);
			return value + 1;
		}
		return undefined;
	};

	const prev = () => {
		if (value > min) {
			setPrimitiveValue(value - 1);
			return value - 1;
		}
		return undefined;
	};

	const set = (newValue: number) => {
		if (newValue >= min && newValue <= max) {
			setPrimitiveValue(newValue);
			return newValue;
		}
		return undefined;
	};

	return { value, next, prev, set } as const;
}
