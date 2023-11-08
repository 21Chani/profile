/* eslint-disable react-refresh/only-export-components */
import { VariantProps, cva } from "class-variance-authority";
import { FC, forwardRef, useImperativeHandle, useRef } from "react";
import { twMerge } from "tailwind-merge";

// STYLES #####################################################################

const baseStyles = cva(
	"w-full whitespace-nowrap  font-bold gap-2 flex items-center justify-center h-full rounded-xl"
)();
export const buttonStyles = cva(baseStyles, {
	variants: {
		variant: {
			primary: "text-white shadow-up-sm bg-gradient-to-br from-light-blue to-amethyst",
			secondary: "text-white shadow-up-sm bg-pastel-blue-300",
			option: "bg-pastel-blue-500 border border-pastel-blue-400"
		},
		size: {
			sm: "px-4 py-2 text-sm",
			xs: "text-xs px-3 py-1"
		}
	}
});

// COMPONENT ##################################################################

type PrimitiveButtonProps = JSX.IntrinsicElements["button"];
export type ButtonStyles = VariantProps<typeof buttonStyles>;

export interface ButtonAttributes extends ButtonStyles, PrimitiveButtonProps {
	loading?: boolean;
	loadingLabel?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonAttributes>((rawProps, outRef) => {
	const { loading, loadingLabel, size, disabled, variant, className, children, ...props } = rawProps;
	const ref = useRef<HTMLButtonElement>(null);

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	useImperativeHandle(outRef, () => ref.current!, [ref]);

	function createRipple(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		if (!ref.current) return;

		const ripple = document.createElement("div");
		ripple.className = "w-6 h-6 absolute -z-10 bg-light-blue/50  animate-expand-size rounded-full";
		ripple.style.left = `${event.clientX - ref.current.getBoundingClientRect().x - 12}px`;
		ripple.style.top = `${event.clientY - ref.current.getBoundingClientRect().y - 12}px`;
		ripple.id = "ripple";
		ref.current.insertBefore(ripple, ref.current.firstChild);
	}

	function removeRipple() {
		if (!ref.current) return;
		const ripple = ref.current.querySelector("#ripple");
		if (ripple) ref.current.removeChild(ripple);
	}

	return (
		<button
			onMouseEnter={(e) => createRipple(e)}
			onMouseLeave={() => removeRipple()}
			disabled={disabled || loading}
			className={twMerge(buttonStyles({ size, variant }), className, "relative z-10 overflow-hidden")}
			ref={ref}
			{...props}
		>
			{loading && (loadingLabel ? loadingLabel : "loading")}
			{children}
		</button>
	);
}) as FC<ButtonAttributes>;
