import { CrossIcon } from '@monorepo/shared/src/assets/icons/CrossIcon';
import { Button } from '@monorepo/shared/src/components/Button';
import { colors, spacing } from '@monorepo/shared/src/theme';
import styled from 'styled-components';

type TSidePanelProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

export const SidePanel = ({ isOpen, onClose, children }: TSidePanelProps) => {
	return (
		<>
			<Overlay $isOpen={isOpen} onClick={onClose} />
			<Panel $isOpen={isOpen}>
				<Content>
					<Button onPress={onClose} variant="secondary" outlined accessibilityLabel="Close">
						<CrossIcon />
					</Button>
					{children}
				</Content>
			</Panel>
		</>
	);
};

const Overlay = styled.div<{ $isOpen: boolean }>`
	position: fixed;
	inset: 0;
	z-index: 40;
	background-color: ${colors.slate[500]}33;
	backdrop-filter: blur(4px);
	transition: opacity 0.3s ease-in-out;
	opacity: ${props => (props.$isOpen ? 1 : 0)};
	pointer-events: ${props => (props.$isOpen ? 'auto' : 'none')};
`;

const Panel = styled.div<{ $isOpen: boolean }>`
	position: fixed;
	right: 0;
	top: 0;
	height: 100%;
	width: 672px;
	background-color: ${colors.white};
	box-shadow:
		0 20px 25px -5px rgb(0 0 0 / 0.1),
		0 8px 10px -6px rgb(0 0 0 / 0.1);
	transform: translateX(${props => (props.$isOpen ? '0' : '100%')});
	transition: transform 0.3s ease-in-out;
	z-index: 50;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

const Content = styled.div`
	height: 100%;
	overflow-y: auto;
	padding: ${spacing[6]}px;
`;
