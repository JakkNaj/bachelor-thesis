import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { components, fontSizes, fontWeights } from '../theme';
import { createStyles } from '../utils/createStyles';

type TAvatarProps = {
	name: string;
	size?: 'sm' | 'md' | 'lg';
};

type TAvatarStyles = {
	container: object;
	text: object;
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
	const styles = useStyles(size);
	const initials = useMemo(() => getInitials(name), [name]);
	const backgroundColor = useMemo(() => generateColor(name), [name]);

	return (
		<View style={[styles.container, { backgroundColor }]}>
			<Text style={styles.text}>{initials}</Text>
		</View>
	);
};

const useStyles = (size: TAvatarProps['size']) => {
	return createStyles<TAvatarStyles>(theme => {
		const getContainerSize = () => {
			const sizeValue = components.avatar.sizes[size || 'md'];
			return {
				height: sizeValue,
				width: sizeValue,
			};
		};

		const getTextStyle = () => {
			switch (size) {
				case 'sm':
					return {
						fontSize: fontSizes.sm,
					};
				case 'lg':
					return {
						fontSize: fontSizes.lg,
					};
				default:
					return {
						fontSize: fontSizes.base,
					};
			}
		};

		return {
			container: {
				borderRadius: components.avatar.borderRadius,
				alignItems: 'center',
				justifyContent: 'center',
				...getContainerSize(),
			},
			text: {
				fontWeight: fontWeights.medium,
				color: theme.colors.slate[900],
				...getTextStyle(),
			},
		};
	});
};
