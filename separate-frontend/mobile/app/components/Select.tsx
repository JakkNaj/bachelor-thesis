import { View, Text, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

type TSelectProps = {
	value: string;
	onValueChange: (value: string) => void;
	items: Array<{
		label: string;
		value: string;
	}>;
	placeholder?: string;
	error?: string;
};

export const Select = ({ value, onValueChange, items, placeholder, error }: TSelectProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const selectedItem = items.find((item) => item.value === value);

	return (
		<View>
			<Pressable
				onPress={() => setIsOpen(!isOpen)}
				className={`
					px-4 h-12 rounded-lg border
					${error ? "border-red-500" : "border-slate-300"}
					${isOpen ? "rounded-b-none border-b-0" : ""}
					bg-white
				`}
			>
				<View className="flex-1 justify-center">
					<Text className={`${!value ? "text-slate-400" : "text-slate-900"}`}>
						{selectedItem?.label || placeholder || "Select an option"}
					</Text>
				</View>
			</Pressable>

			{error && <Text className="mt-1 text-sm text-red-500">{error}</Text>}

			{isOpen && (
				<View className="border border-slate-300 rounded-b-lg bg-white overflow-hidden">
					<Picker
						selectedValue={value}
						onValueChange={(itemValue) => {
							onValueChange(itemValue);
							setIsOpen(false);
						}}
					>
						{items.map((item) => (
							<Picker.Item key={item.value} label={item.label} value={item.value} />
						))}
					</Picker>
				</View>
			)}
		</View>
	);
};
