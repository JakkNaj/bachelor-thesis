import { Pressable, Text, View } from "react-native";

type ButtonProps = {
	onPress: () => void;
	title: string;
	variant?: "primary" | "secondary";
};

export const Button = ({ onPress, title, variant = "primary" }: ButtonProps) => {
	return (
		<Pressable onPress={onPress}>
			<View
				className={`
					p-3 
					rounded-lg 
					items-center 
					justify-center 
					${variant === "primary" ? "bg-[#007AFF]" : "bg-slate-600"}
				`}
			>
				<Text className="text-white text-base font-semibold">{title}</Text>
			</View>
		</Pressable>
	);
};
