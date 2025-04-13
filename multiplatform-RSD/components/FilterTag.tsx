import { css, html } from 'react-strict-dom';
import { colors } from '../assets/colors/colors';

type TFilterTagProps = {
	children: React.ReactNode;
	isActive?: boolean;
	onPress: () => void;
};

export const FilterTag = ({ children, isActive = false, onPress }: TFilterTagProps) => {
	return (
		<html.div 
			style={styles.button(isActive)} 
			onClick={onPress}
		>
			<html.span style={styles.text(isActive)}>
				{children}
			</html.span>
		</html.div>
	);
};

const styles = css.create({
	button: (isActive: boolean) => ({
		paddingLeft: '12px',
		paddingRight: '12px',
		paddingTop: '8px',
		paddingBottom: '8px',
		borderRadius: '6px',
		backgroundColor: isActive ? colors.slate[100] : 'transparent',
		cursor: 'pointer',
	}),
	text: (isActive: boolean) => ({
		fontSize: '16px',
		color: isActive ? colors.slate[900] : colors.slate[600],
		fontWeight: isActive ? '500' : '400',
	}),
});
