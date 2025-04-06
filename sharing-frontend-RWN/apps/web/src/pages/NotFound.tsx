import { colors } from '@monorepo/shared/src/theme';
import styled from 'styled-components';

const Container = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Title = styled.h1`
	font-size: 1.25rem;
	color: ${colors.slate[900]};
`;

export const NotFound = () => {
	return (
		<Container>
			<Title>404 | Unknown url</Title>
		</Container>
	);
};
