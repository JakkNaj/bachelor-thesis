import { colors } from '@/assets/colors/colors';
import { Platform, ScrollView, View, Text, StyleSheet } from 'react-native';

type TStepperProps = {
	index: number;
	isFirst: boolean;
	isLast: boolean;
	children: React.ReactNode;
};

export const Stepper = ({ index, isFirst, isLast, children }: TStepperProps) => {
	const renderContent = () => {
		return (
			<View
				style={[
					styles.container,
					!isLast && styles.withBottomPadding,
					!isFirst && styles.withTopPadding,
				]}
			>
				{/* Line container */}
				<View style={styles.lineContainer}>
					{/* Top line (hidden for first item) */}
					{!isFirst && <View style={styles.topLine} />}
					{/* Bottom line (hidden for last item) */}
					{!isLast && <View style={styles.bottomLine} />}
					{/* Number circle */}
					<View style={styles.numberCircle}>
						<Text style={styles.numberText}>{index + 1}</Text>
					</View>
				</View>

				{/* Content */}
				{children}
			</View>
		);
	}

	if (Platform.OS === 'web') {
		return renderContent();
	}

	return (
		<ScrollView>
			{renderContent()}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 12,
	},
	withBottomPadding: {
		paddingBottom: 16,
	},
	withTopPadding: {
		paddingTop: 0,
	},
	lineContainer: {
		width: 32,
		alignItems: 'center',
		position: 'relative',
		flexShrink: 0,
	},
	topLine: {
		position: 'absolute',
		right: 15,
		width: 2,
		height: 48,
		top: -16,
		backgroundColor: colors.slate[300],
		zIndex: 0,
	},
	bottomLine: {
		position: 'absolute',
		right: 15,
		top: 32,
		bottom: -32,
		width: 2,
		backgroundColor: colors.slate[300],
		zIndex: 0,
	},
	numberCircle: {
		height: 32,
		width: 32,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 16,
		marginTop: 8,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: colors.slate[300],
		backgroundColor: colors.white,
		zIndex: 1,
		position: 'relative',
	},
	numberText: {
		color: '#090909',
		fontSize: 14,
		fontWeight: '500',
		lineHeight: 14,
	},
});
