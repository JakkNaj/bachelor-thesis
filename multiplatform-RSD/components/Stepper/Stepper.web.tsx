import { css, html } from 'react-strict-dom';
import { colors } from '@/assets/colors/colors';

type TStepperProps = {
	index: number;
	isFirst: boolean;
	isLast: boolean;
	children: React.ReactNode;
};

export const Stepper = ({ index, isFirst, isLast, children }: TStepperProps) => {
	return (
		<html.div
			style={[
				styles.container(),
				!isLast && styles.withBottomPadding,
				!isFirst && styles.withTopPadding,
			]}
		>
			<html.div style={styles.numberContainer}>
				<html.div style={styles.numberCircle()}>
					<html.span style={styles.numberText()}>{index + 1}</html.span>
				</html.div>
			</html.div>

			{children}
		</html.div>
	);
};

const styles = css.create({
	container: () => ({
		display: 'flex',
		gap: '1rem',
		position: 'relative',
		'::before': {
			content: '""',
			position: 'absolute',
			left: '1rem',
			top: '2rem',
			bottom: 0,
			width: '0.125rem',
			backgroundColor: colors.slate[300],
		},
		'::after': {
			content: '""',
			position: 'absolute',
			left: '1rem',
			top: 0,
			height: '1.5rem',
			width: '0.125rem',
			backgroundColor: colors.slate[300],
		},
		':first-child::after': {
			display: 'none',
		},
		':last-child::before': {
			display: 'none',
		},
	}),
	withBottomPadding: {
		paddingBottom: '2rem',
	},
	withTopPadding: {
		paddingTop: 0,
	},
	numberContainer: {
		position: 'relative',
		zIndex: 10,
		width: '2rem',
		flexShrink: 0,
	},
	numberCircle: () => ({
		height: '2rem',
		width: '2rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: '50%',
		marginTop: '0.5rem',
		borderWidth: '0.0625rem',
		borderStyle: 'solid',
		borderColor: colors.slate[300],
		backgroundColor: colors.white,
	}),
	numberText: () => ({
		color: '#090909',
		fontSize: '0.875rem',
		fontWeight: '500',
		lineHeight: '1',
	}),
});
