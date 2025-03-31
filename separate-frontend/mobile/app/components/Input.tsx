import { forwardRef } from "react";
import { TextInput, TextInputProps, View, Text } from "react-native";

type TInputProps = {
	className?: string;
	error?: string;
} & TextInputProps;

export const Input = forwardRef<TextInput, TInputProps>(({ className = "", error, ...props }, ref) => {
	return (
		<View className="w-full mb-4">
			<TextInput
				ref={ref}
				className={`
					h-14
					w-full
					px-4
					text-lg
					rounded-lg
					border
					border-slate-200
					bg-white
					${error ? "border-red-300" : ""}
					${className}
				`}
				placeholderTextColor="#94a3b8"
				style={{ lineHeight: 18 }}
				{...props}
			/>
			{error && <Text className="mt-2 text-base text-red-500">{error}</Text>}
		</View>
	);
});

Input.displayName = "Input";

export default Input;
