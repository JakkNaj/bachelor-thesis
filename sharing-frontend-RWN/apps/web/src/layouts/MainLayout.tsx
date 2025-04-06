import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../store/authStore';
import { EAuthStatus } from '../store/authStore';
import { Header } from '../components/Header';
import { breakpoints, colors, fontSizes } from '@monorepo/shared';

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { status, logout, user } = useAuthStore();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <Container>
      {status === EAuthStatus.AUTHENTICATED && (
        <Header
          userName={user?.name || 'User'}
          onLogout={handleLogout}
        />
      )}
      <MainContent>
        {children}
      </MainContent>
      <Footer>
        <FooterContent>
          <p>&copy; {new Date().getFullYear()} Trip Planner App</p>
        </FooterContent>
      </Footer>
    </Container>
  );
};


const Container = styled.div`
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
`;

const MainContent = styled.main`
  width: 100%;
  max-width: ${breakpoints['2xl']};
  margin: 0 auto;
  padding: 0 1rem;
  flex: 1;
`;

const Footer = styled.footer`
  border-top: 1px solid ${colors.slate[200]};
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: ${breakpoints['2xl']};
  margin: 0 auto;
  padding: 1.5rem 1rem;
  font-size: ${fontSizes.sm}px;
  color: ${colors.slate[600]};
`;