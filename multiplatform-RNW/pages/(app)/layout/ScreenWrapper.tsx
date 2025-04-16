import { Platform, View, StyleSheet } from "react-native";
import { colors } from "@/assets/colors/colors";

type TScreenWrapperProps = {
	children: React.ReactNode;
};

export const ScreenWrapper = ({ children }: TScreenWrapperProps) => {
	return (
		<View style={[styles.outerWrapper, Platform.OS === 'web' && styles.webWrapper]}>
			<View style={[styles.innerWrapper, Platform.OS === 'web' && styles.webInnerWrapper]}>
				{children}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	outerWrapper: {
		backgroundColor: colors.white,
		padding: 16,
		flex: 1,
	},
	webWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	innerWrapper: {
		flex: 1,
		width: '100%',
	},
	webInnerWrapper: {
		maxWidth: 1536,
	},
});
