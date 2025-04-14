import { css, html } from 'react-strict-dom';
import { colors } from '@/assets/colors/colors';
import { Platform, ScrollView } from 'react-native';

type TStepperProps = {
	index: number;
	isFirst: boolean;
	isLast: boolean;
	children: React.ReactNode;
};

export const Stepper = ({ index, isFirst, isLast, children }: TStepperProps) => {

    const renderContent = () => {
        return (
            <html.div
                style={[
                    styles.container,
                    !isLast && styles.withBottomPadding,
                    !isFirst && styles.withTopPadding,
                ]}
            >
                {/* Line container */}
                <html.div style={styles.lineContainer}>
                    {/* Top line (hidden for first item) */}
                    {!isFirst && <html.div style={styles.topLine()} />}
                    {/* Bottom line (hidden for last item) */}
                    {!isLast && <html.div style={styles.bottomLine()} />}
                    {/* Number circle */}
                    <html.div style={styles.numberCircle()}>
                        <html.span style={styles.numberText()}>{index + 1}</html.span>
                    </html.div>
                </html.div>
    
                {/* Content */}
                {children}
            </html.div>
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

const styles = css.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		gap: '0.8rem',
	},
	withBottomPadding: {
		paddingBottom: '1rem',
	},
	withTopPadding: {
		paddingTop: 0,
	},
	lineContainer: {
		width: '2rem',
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		flexShrink: 0,
	},
	topLine: () => ({
		position: 'absolute',
		right: '0.9rem',
		width: '0.125rem',
		height: '1.5rem',
		backgroundColor: colors.slate[300],
		zIndex: 0,
	}),
	bottomLine: () => ({
		position: 'absolute',
		right: '0.9rem',
		top: '2rem',
		bottom: '-4rem',
		width: '0.125rem',
		backgroundColor: colors.slate[300],
		zIndex: 0,
	}),
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
		zIndex: 1,
		position: 'relative',
	}),
	numberText: () => ({
		color: '#090909',
		fontSize: '0.875rem',
		fontWeight: '500',
		lineHeight: '1',
	}),
});
