import { colors } from '@/assets/colors/colors';
import { CrossIcon } from '@/assets/icons/CrossIcon';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';

type TFormModalProps<TFormData> = {
	isVisible: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
};

export const FormModal = <TFormData,>({
	isVisible,
	onClose,
	title,
	children,
}: TFormModalProps<TFormData>) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setIsOpen(isVisible);
	}, [isVisible]);

	if (!isVisible) return null;

	return (
		<View style={styles.container}>
			<Pressable 
				style={[
					styles.overlay,
					isOpen && styles.overlayVisible,
				]} 
				onPress={onClose}
			/>
			<View 
				style={[
					styles.panel,
					isOpen && styles.panelOpen,
				]}
			>
				<View style={styles.content}>
					<View style={styles.header}>
						<Text style={styles.title}>{title}</Text>
						<TouchableOpacity 
							style={styles.closeButton}
							onPress={onClose}
							activeOpacity={0.7}
						>
							<CrossIcon size={24} color={colors.slate[400]} />
						</TouchableOpacity>
					</View>

					<View style={styles.formContainer}>
						{children}
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 999,
		pointerEvents: 'none',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(100, 116, 139, 0.2)',
		backdropFilter: 'blur(4px)',
		opacity: 0,
		transitionProperty: 'opacity',
		transitionDuration: '0.3s',
		transitionTimingFunction: 'ease-in-out',
		pointerEvents: 'none',
        zIndex: 40,
	},
	overlayVisible: {
		opacity: 1,
		pointerEvents: 'auto',
	},
	panel: {
		position: 'absolute',
		right: 0,
		top: 48,
		height: '100%',
		width: '100%',
		maxWidth: 672,
		backgroundColor: colors.white,
		shadowColor: '#000',
		shadowOffset: {
			width: -2,
			height: 0,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		transform: [{ translateX: '100%' }],
		transitionProperty: 'transform',
		transitionDuration: '0.3s',
		transitionTimingFunction: 'ease-in-out',
		pointerEvents: 'auto',
		zIndex: 50,
	},
	panelOpen: {
		transform: [{ translateX: '0%' }],
	},
	content: {
		height: '100%',
		padding: 24,
		paddingTop: 32,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: '600',
		margin: 0,
	},
	closeButton: {
		backgroundColor: 'transparent',
		padding: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	formContainer: {
		flex: 1,
	},
});
