import { colors } from "@/assets/colors/colors";
import { View, Text, StyleSheet } from "react-native";

export const Test = () => {
	return (
		<View style={styles.container}>
			<Text>Test</Text>
            <Text>Test</Text>
		</View>
	);
};

export default Test;

const styles = StyleSheet.create({
	container: {
		height: 400,
		backgroundColor: colors.red[50],
	},
});

