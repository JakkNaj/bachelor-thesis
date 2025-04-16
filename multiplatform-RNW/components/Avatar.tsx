import { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../assets/colors/colors';

type TAvatarProps = {
	name: string;
	size?: 'sm' | 'md' | 'lg';
};

const getInitials = (name: string): string => {
	return name
		.split(' ')
		.map(n => n[0])
		.join('')
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

export const Avatar = ({ name, size = 'md' }: TAvatarProps) => {
	const styles = useAvatarStyles(size);
	const initials = useMemo(() => getInitials(name), [name]);
	const backgroundColor = useMemo(() => generateColor(name), [name]);

	return (
		<View style={[styles.container, { backgroundColor }]}>
			<Text style={styles.text}>{initials}</Text>
		</View>
	);
};

const useAvatarStyles = (size: TAvatarProps['size']) => {
	const getContainerSize = () => {
		switch (size) {
			case 'sm':
				return {
					height: 32,
					width: 32,
				};
			case 'lg':
				return {
					height: 64,
					width: 64,
				};
			default:
				return {
					height: 48,
					width: 48,
				};
		}
	};

	const getTextStyle = () => {
		switch (size) {
			case 'sm':
				return {
					fontSize: 12,
				};
			case 'lg':
				return {
					fontSize: 20,
				};
			default:
				return {
					fontSize: 16,
				};
		}
	};

	return StyleSheet.create({
		container: {
			borderRadius: '50%',
			alignItems: 'center',
			justifyContent: 'center',
			...getContainerSize(),
		},
		text: {
			fontWeight: '500',
			color: colors.slate[900],
			...getTextStyle(),
		},
	});
};
