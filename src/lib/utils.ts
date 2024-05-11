export class LevaInput {
	public value: number
	public _min: number | undefined
	public _max: number | undefined
	public _step: number | undefined
	constructor(value: number, min?: number, max?: number, step?: number) {
		this.value = value
		this._min = min
		this._max = max
		this._step = step
	}

	public static from(value: number) {
		return new LevaInput(value)
	}

	public min(min: number) {
		this._min = min
		return this
	}

	public max(max: number) {
		this._max = max
		return this
	}

	public step(step: number) {
		this._step = step
		return this
	}

	public obj() {
		return {
			value: this.value,
			min: this._min,
			max: this._max,
			step: this._step,
		}
	}
}
