import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { createStyles } from '../../utils/createStyles';
import { TSelectProps } from './Select.types';

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
	const styles = useStyles();

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

const useStyles = () => {
	return createStyles(theme => ({
		container: {
			width: '100%',
		},
		button: {
			paddingHorizontal: theme.spacing[4],
			height: 48,
			borderRadius: theme.radius.lg,
			borderWidth: 1,
			backgroundColor: theme.colors.white,
		},
		buttonOpen: {
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0,
			borderBottomWidth: 0,
		},
		buttonError: {
			borderColor: theme.colors.red[500],
		},
		buttonNormal: {
			borderColor: theme.colors.slate[300],
		},
		buttonContent: {
			flex: 1,
			justifyContent: 'center',
		},
		placeholderText: {
			color: theme.colors.slate[400],
			fontSize: theme.fontSizes.base,
		},
		selectedText: {
			color: theme.colors.slate[900],
			fontSize: theme.fontSizes.base,
		},
		errorText: {
			marginTop: theme.spacing[1],
			fontSize: theme.fontSizes.sm,
			color: theme.colors.red[500],
		},
		pickerContainer: {
			borderWidth: 1,
			borderColor: theme.colors.slate[300],
			borderBottomLeftRadius: theme.radius.lg,
			borderBottomRightRadius: theme.radius.lg,
			backgroundColor: theme.colors.white,
			overflow: 'hidden',
		},
	}));
};
