import { Text, View } from "react-native";
import { Button } from "@monorepo/shared";

export default function Index() {
	return (
		<View className="flex-1 justify-center items-center">
			<Text>Edit app/index.tsx to edit this screen.</Text>
			<Button title="Click me!" onPress={() => alert("Button clicked!")} variant="secondary" />
		</View>
	);
}
