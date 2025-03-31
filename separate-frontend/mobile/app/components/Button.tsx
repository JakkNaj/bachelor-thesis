import { ReactNode } from "react";
import { TouchableOpacity, Text, View, TouchableOpacityProps } from "react-native";

type TButtonProps = {
	children: ReactNode;
	variant?: "primary" | "secondary" | "danger";
	isLoading?: boolean;
	loadingText?: string;
	fullWidth?: boolean;
	icon?: ReactNode;
	outlined?: boolean;
	className?: string;
} & TouchableOpacityProps;

export const Button = ({
	children,
	variant = "primary",
	isLoading = false,
	loadingText,
	fullWidth = false,
	className = "",
	disabled,
	icon,
	outlined = false,
	...props
}: TButtonProps) => {
	const baseStyles = `py-3 px-4 rounded-lg items-center justify-center ${fullWidth ? "w-full" : ""}`;

	const variants = {
		primary: "bg-slate-900 active:bg-slate-800",
		secondary: "bg-white active:bg-slate-50",
		danger: "bg-white active:bg-red-50",
	};

	const textVariants = {
		primary: "text-white",
		secondary: "text-slate-900",
		danger: "text-red-600",
	};

	const outlinedStyles = "border border-slate-300 bg-white";
	const outlinedTextStyle = "text-slate-900";

	return (
		<TouchableOpacity
			className={`${baseStyles} ${outlined ? outlinedStyles : variants[variant]} ${className}`}
			disabled={isLoading || disabled}
			{...props}
		>
			<View className="flex-row items-center">
				{icon && <View className="mr-3">{icon}</View>}
				<Text
					className={`text-lg font-medium ${
						outlined ? outlinedTextStyle : textVariants[variant]
					} ${disabled ? "opacity-50" : ""}`}
				>
					{isLoading ? loadingText || "Loading..." : children}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Button;
