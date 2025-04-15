import { colors, fontSizes } from '@monorepo/shared';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../components/Header';
import { EAuthStatus, useAuthStore } from '../store/authStore';

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
				<Header userName={user?.name || 'User'} onLogout={handleLogout} />
			)}
			<MainContent>{children}</MainContent>
			<Footer>
				<FooterContent>
					<p>&copy; {new Date().getFullYear()} Trip Planner App</p>
				</FooterContent>
			</Footer>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	background-color: ${colors.white};
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	overflow-y: auto;
`;

const MainContent = styled.main`
	max-width: 1536px;
	margin: 0 auto;
	padding: 0 1rem;
	flex: 1;
	width: 100%;
	box-sizing: border-box;
`;

const Footer = styled.footer`
	border-top: 1px solid ${colors.slate[200]};
	width: 100%;
`;

const FooterContent = styled.div`
	max-width: 1536px;
	margin: 0 auto;
	padding: 1.5rem 1rem;
	font-size: ${fontSizes.sm}px;
	color: ${colors.slate[600]};
`;
