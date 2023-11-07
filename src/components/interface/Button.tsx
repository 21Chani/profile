/* eslint-disable react-refresh/only-export-components */
import { VariantProps, cva } from "class-variance-authority";
import { FC, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// STYLES #####################################################################

const baseStyles = cva("w-full whitespace-nowrap font-bold gap-2 flex items-center justify-center h-full rounded-xl")();
export const buttonStyles = cva(baseStyles, {
	variants: {
		variant: {
			primary: "text-white shadow-up-sm bg-gradient-to-br from-light-blue to-amethyst  text-sm",
			secondary: "text-white shadow-up-sm bg-pastel-blue-200"
		},
		size: {
			sm: "px-4 py-2 text-sm"
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

export const Button = forwardRef<HTMLButtonElement, ButtonAttributes>((rawProps, ref) => {
	const { loading, loadingLabel, size, disabled, variant, className, children, ...props } = rawProps;

	return (
		<button
			disabled={disabled || loading}
			className={twMerge(buttonStyles({ size, variant }), className)}
			ref={ref}
			{...props}
		>
			{loading && (loadingLabel ? loadingLabel : "loading")}
			{children}
		</button>
	);
}) as FC<ButtonAttributes>;
