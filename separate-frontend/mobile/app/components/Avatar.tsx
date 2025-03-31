import { useMemo } from "react";
import { View, Text } from "react-native";

type TAvatarProps = {
	name: string;
	size?: "sm" | "md" | "lg";
};

const getInitials = (name: string): string => {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
};

const generateColor = (name: string): string => {
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}
	const hue = Math.abs(hash % 360);
	return `hsl(${hue}, 70%, 80%)`;
};

const sizeMap = {
	sm: {
		container: "h-8 w-8",
		text: "text-sm",
	},
	md: {
		container: "h-10 w-10",
		text: "text-base",
	},
	lg: {
		container: "h-12 w-12",
		text: "text-lg",
	},
} as const;

export const Avatar = ({ name, size = "md" }: TAvatarProps) => {
	const initials = useMemo(() => getInitials(name), [name]);
	const backgroundColor = useMemo(() => generateColor(name), [name]);

	return (
		<View className={`rounded-full items-center justify-center ${sizeMap[size].container}`} style={{ backgroundColor }}>
			<Text className={`font-medium text-slate-900 ${sizeMap[size].text}`}>{initials}</Text>
		</View>
	);
};
