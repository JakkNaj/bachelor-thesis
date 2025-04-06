import { forwardRef } from "react";
import { TextInput, TextInputProps, View, Text } from "react-native";

type TInputProps = {
	className?: string;
	error?: string;
} & TextInputProps;

export const Input = forwardRef<TextInput, TInputProps>(({ className = "", error, multiline, ...props }, ref) => {
	return (
		<View className="w-full mb-4">
			<TextInput
				ref={ref}
				className={`
					${multiline ? "min-h-[72px]" : "h-14"}
					w-full
					px-4
					text-lg
					rounded-lg
					border
					border-slate-200
					bg-white
					leading-5
					h-auto
					${multiline ? "align-top" : "align-middle"}
					${error ? "border-red-300" : ""}
					${className}
				`}
				placeholderTextColor="#94a3b8"
				multiline={multiline}
				{...props}
			/>
			{error && <Text className="mt-2 text-base text-red-500">{error}</Text>}
		</View>
	);
});

export default Input;
