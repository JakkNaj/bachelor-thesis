import { css, html } from 'react-strict-dom';
import { colors } from '@/assets/colors/colors';
import { CrossIcon } from '@/assets/icons/CrossIcon/CrossIcon';
import { useState, useEffect } from 'react';

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

	return (
		<>
			<html.div 
				style={[styles.overlay, isOpen && styles.overlayVisible]} 
				onClick={onClose} 
			/>
			<html.div style={[styles.panel(), isOpen && styles.panelOpen]}>
				<html.div style={styles.content}>
					<html.div style={styles.header}>
						<html.h2 style={styles.title}>{title}</html.h2>
						<html.button 
							style={styles.closeButton()} 
							onClick={onClose}
							aria-label="Close"
						>
							<CrossIcon size={24} color={colors.slate[400]} />
						</html.button>
					</html.div>

					<html.div style={styles.formContainer}>
						{children}
					</html.div>
				</html.div>
			</html.div>
		</>
	);
};

const styles = css.create({
	overlay: {
		position: 'fixed',
		inset: 0,
		zIndex: 40,
		backgroundColor: 'rgba(100, 116, 139, 0.2)',
		backdropFilter: 'blur(4px)',
		transition: 'opacity 0.3s ease-in-out',
		opacity: 0,
		pointerEvents: 'none',
	},
	overlayVisible: {
		opacity: 1,
		pointerEvents: 'auto',
	},
	panel: () => ({
		position: 'fixed',
		right: 0,
		top: 0,
		height: '100%',
		width: '42rem',
		backgroundColor: colors.white,
		boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
		transform: 'translateX(100%)',
		transition: 'transform 0.3s ease-in-out',
		zIndex: 50,
	}),
	panelOpen: {
		transform: 'translateX(0)',
	},
	content: {
		height: '100%',
		padding: '1.5rem',
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '1rem',
	},
	title: {
		fontSize: '1.5rem',
		fontWeight: '600',
		margin: 0,
	},
	closeButton: () => ({
		backgroundColor: 'transparent',
		borderWidth: 0,
		borderStyle: 'none',
		borderColor: 'transparent',
		cursor: 'pointer',
		padding: '0.5rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'color 0.2s ease-in-out',
		':hover': {
			color: colors.slate[600],
		},
	}),
	formContainer: {
		flex: 1,
	},
});
