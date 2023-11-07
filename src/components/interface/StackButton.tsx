import { PropsWithChildren } from "react";
import { IconType } from "react-icons";
import { Button } from "./Button";

export function StackButton({ icon: Icon, children }: PropsWithChildren<{ icon: IconType }>) {
	return (
		<Button variant={"option"} size={"xs"} className="h-fit w-fit">
			<Icon className="h-4 w-4"></Icon>
			{children}
		</Button>
	);
}
