import { Platform } from "react-native";

import { css, html } from "react-strict-dom";

type TScreenWrapperProps = {
	children: React.ReactNode;
};

export const ScreenWrapper = ({ children }: TScreenWrapperProps) => {

	if (Platform.OS === 'web') {
		return (
			<div style={{ 
				backgroundColor: 'white', 
				display: 'flex', 
				flexDirection: 'column', 
				alignItems: 'center',
			}}>
				<div style={{ width: '100%', maxWidth: "1536px" }}>
					{children}
				</div>
			</div>
		);
	}
	return (
        <html.div style={styles.outerWrapper}>
            {children}
        </html.div>
	);
};

const styles = css.create({
	outerWrapper: {
		backgroundColor: 'white',
		padding: '1rem',
        flex: 1,
	},
});
