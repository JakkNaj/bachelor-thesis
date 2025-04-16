import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { TSelectProps } from './Select.types';
import { colors } from '@/assets/colors/colors';

export const Select = ({
	value,
	onValueChange,
	items,
	placeholder,
	error,
	closeOnSelect = true,
	id,
}: TSelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectedItem = items.find(item => item.value === value);

	return (
		<View style={styles.container}>
			<Pressable
				onPress={() => setIsOpen(!isOpen)}
				style={[
					styles.button,
					error ? styles.buttonError : styles.buttonNormal,
					isOpen && styles.buttonOpen,
				]}
			>
				<View style={styles.buttonContent}>
					<Text style={value ? styles.selectedText : styles.placeholderText}>
						{selectedItem?.label || placeholder || 'Select an option'}
					</Text>
				</View>
			</Pressable>

			{error && <Text style={styles.errorText}>{error}</Text>}

			{isOpen && (
				<View style={styles.pickerContainer}>
					<Picker
						selectedValue={value}
						onValueChange={itemValue => {
							onValueChange(itemValue);
							if (closeOnSelect) {
								setIsOpen(false);
							}
						}}
					>
						{items.map(item => (
							<Picker.Item key={item.value} label={item.label} value={item.value} />
						))}
					</Picker>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	button: {
		paddingHorizontal: 16,
		height: 48,
		borderRadius: 8,
		borderWidth: 1,
		backgroundColor: colors.white,
		},
	buttonOpen: {
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderBottomWidth: 0,
	},  
	buttonError: {
		borderColor: colors.red[500],
	},
	buttonNormal: {
		borderColor: colors.slate[300],
	},
	buttonContent: {
		flex: 1,
		justifyContent: 'center',
	},
	placeholderText: {
		color: colors.slate[400],
		fontSize: 16,
	},
	selectedText: {
		color: colors.slate[900],
		fontSize: 16,
	},
		errorText: {
		marginTop: 4,
		fontSize: 12,
		color: colors.red[500],
	},
		pickerContainer: {
		borderWidth: 1,
		borderColor: colors.slate[300],
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
		backgroundColor: colors.white,
		overflow: 'hidden',
	},
});
