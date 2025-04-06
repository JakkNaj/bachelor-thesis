import { UserControls } from './Navigation';
import { Link } from 'react-router-dom';
import { LogoIcon } from '@monorepo/shared/src/assets/icons/LogoIcon';
import styled from 'styled-components';
import { spacing, fontSizes, colors } from '@monorepo/shared/src/theme';

type THeaderProps = {
  userName: string;
  onLogout: () => void;
};

export const Header = ({
  userName,
  onLogout,
}: THeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <StyledLink to="/">
            <LogoWrapper>
              <LogoIcon />
            </LogoWrapper>
            <LogoText>TripPlanner</LogoText>
          </StyledLink>
        </LogoContainer>

        <UserControlsContainer>
          <UserControls
            userName={userName}
            onLogout={onLogout}
          />
        </UserControlsContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  border-bottom: 1px solid #e2e8f0;
  background-color: white;
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1536px;
  margin: 0 auto;
  padding: 0 ${spacing[4]}px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  flex-shrink: 0;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${spacing[2]}px;
  text-decoration: none;
`;

const LogoWrapper = styled.div`
  width: 32px;
  height: 32px;
`;

const LogoText = styled.span`
  font-size: ${fontSizes.xl}px;
  font-weight: 600;
  color: ${colors.slate[900]};
`;

const UserControlsContainer = styled.div`
  flex-shrink: 0;
`;