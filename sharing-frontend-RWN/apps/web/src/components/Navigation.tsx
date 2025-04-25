import { LogOutIcon } from '@monorepo/shared/src/assets/icons/LogOutIcon';
import { Avatar } from '@monorepo/shared/src/components/Avatar';
import { Button } from '@monorepo/shared/src/components/Button';
import { spacing } from '@monorepo/shared/src/theme';
import styled from 'styled-components';

type TUserControlsProps = {
	userName: string;
	onLogout: () => void;
};

export const UserControls = ({ userName, onLogout }: TUserControlsProps) => {
	return (
		<Container>
			<Avatar name={userName} size="sm" />
			<Button onPress={onLogout} variant="danger" accessibilityLabel="Logout">
				<LogOutIcon />
			</Button>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	align-items: center;
	gap: ${spacing[3]}px;
`;
