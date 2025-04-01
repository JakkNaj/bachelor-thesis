import { TouchableOpacity, Text } from "react-native";

type TFilterLinkProps = {
	children: React.ReactNode;
	isActive?: boolean;
	onPress: () => void;
};

export const FilterLink = ({ children, isActive = false, onPress }: TFilterLinkProps) => (
	<TouchableOpacity onPress={onPress} className={`px-3 py-2 rounded-md ${isActive ? "bg-slate-100" : "bg-transparent"}`}>
		<Text className={`text-lg ${isActive ? "text-slate-900 font-medium" : "text-slate-600"}`}>{children}</Text>
	</TouchableOpacity>
);
