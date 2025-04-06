import { Avatar } from '@monorepo/shared/src/components/Avatar';
import { LogOutIcon } from '@monorepo/shared/src/assets/icons/LogOutIcon';
import styled from 'styled-components';
import { spacing, radius } from '@monorepo/shared/src/theme';

type TUserControlsProps = {
  userName: string;
  onLogout: () => void;
};

export const UserControls = ({ userName, onLogout }: TUserControlsProps) => {
  return (
    <Container>
      <Avatar name={userName} size="sm" />
      <LogoutButton 
        onClick={onLogout}
        title="Logout"
      >
        <LogOutIcon />
      </LogoutButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]}px;
`;

const LogoutButton = styled.button`
  padding: ${spacing[2]}px;
  border-radius: ${radius.md}px;
  transition: background-color 0.2s;
  cursor: pointer;
  border: none;
  background: transparent;

  &:hover {
    background-color: #f1f5f9;
  }
`;