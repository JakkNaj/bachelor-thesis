import { yupResolver } from '@hookform/resolvers/yup';
import { usePostApiAuthLogin } from '@monorepo/shared/src/api/generated/auth/auth';
import { Button } from '@monorepo/shared/src/components/Button';
import { Input } from '@monorepo/shared/src/components/Input';
import { colors, fontSizes, fontWeights, radius, spacing } from '@monorepo/shared/src/theme';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import { EAuthStatus, useAuthStore } from '../store/authStore';

type TLoginFormData = {
	email: string;
	password: string;
};

const loginSchema = yup.object({
	email: yup.string().email('Invalid email format').required('Email is required'),
	password: yup.string().required('Password is required'),
});

export const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { setAuth, status } = useAuthStore();
	const [loginError, setLoginError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const searchParams = new URLSearchParams(window.location.search);
	const redirectPath = searchParams.get('redirect') || location.state?.from?.pathname || '/';

	useEffect(() => {
		if (status === EAuthStatus.AUTHENTICATED) {
			navigate(redirectPath, { replace: true });
		}
	}, [status, navigate, redirectPath]);

	const { mutate: login, isPending } = usePostApiAuthLogin({
		mutation: {
			onSuccess: response => {
				const authData = response.data;
				setAuth(authData);
				navigate(redirectPath, { replace: true });
			},
			onError: () => {
				setLoginError('Invalid email or password. Please try again.');
				setIsSubmitting(false);
			},
		},
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TLoginFormData>({
		resolver: yupResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (data: TLoginFormData) => {
		setLoginError(null);
		setIsSubmitting(true);
		login({ data });
	};

	return (
		<LoginContainer>
			<LoginCard>
				<LoginHeader>
					<LoginTitle>Welcome back</LoginTitle>
					<LoginSubtitle>Please sign in to your account</LoginSubtitle>
				</LoginHeader>

				<LoginForm
					onSubmit={e => {
						e.preventDefault();
						handleSubmit(onSubmit)(e);
					}}
				>
					<FormGroup>
						<FormLabel htmlFor="email">Email</FormLabel>
						<Controller
							name="email"
							control={control}
							render={({ field: { onChange, value } }) => (
								<Input
									type="email"
									id="email"
									value={value}
									onChange={onChange}
									error={errors.email?.message}
									placeholder="Enter your email"
								/>
							)}
						/>
					</FormGroup>

					<FormGroup>
						<FormLabel htmlFor="password">Password</FormLabel>
						<Controller
							name="password"
							control={control}
							render={({ field: { onChange, value } }) => (
								<Input
									id="password"
									value={value}
									onChange={onChange}
									error={errors.password?.message}
									placeholder="Enter your password"
									type="password"
								/>
							)}
						/>
					</FormGroup>

					{loginError && <ErrorMessage>{loginError}</ErrorMessage>}

					<Button
						onPress={handleSubmit(onSubmit)}
						isLoading={isPending || isSubmitting}
						loadingText="Signing in..."
						fullWidth
					>
						Sign in
					</Button>
				</LoginForm>

				<RegisterLink>
					Don't have an account? <StyledLink to="/register">Register</StyledLink>
				</RegisterLink>
			</LoginCard>
		</LoginContainer>
	);
};

const LoginContainer = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${colors.slate[50]};
	padding: 0 ${spacing[4]}px;
`;

const LoginCard = styled.div`
	width: 100%;
	max-width: 28rem;
	background-color: ${colors.white};
	padding: ${spacing[8]}px;
	border-radius: ${radius.xl}px;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const LoginHeader = styled.div`
	margin-bottom: ${spacing[6]};
`;

const LoginTitle = styled.h1`
	font-size: ${fontSizes['2xl']};
	font-weight: ${fontWeights.semibold};
	color: ${colors.slate[900]};
	text-align: center;
`;

const LoginSubtitle = styled.p`
	margin-top: ${spacing[2]};
	font-size: ${fontSizes.sm};
	color: ${colors.slate[600]};
	text-align: center;
`;

const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: ${spacing[2]}px;
`;

const FormGroup = styled.div`
	margin-bottom: ${spacing[4]}px;
`;

const FormLabel = styled.label`
	display: block;
	font-size: ${fontSizes.sm};
	font-weight: ${fontWeights.medium};
	color: ${colors.slate[700]};
	margin-bottom: ${spacing[1]}px;
`;

const ErrorMessage = styled.div`
	background-color: ${colors.red[50]};
	color: ${colors.red[500]};
	font-size: ${fontSizes.sm};
	padding: ${spacing[3]}px;
	border-radius: ${radius.lg}px;
`;

const RegisterLink = styled.p`
	font-size: ${fontSizes.sm};
	color: ${colors.slate[600]};
	text-align: center;
	margin-top: ${spacing[4]}px;
`;

const StyledLink = styled(Link)`
	font-weight: ${fontWeights.medium};
	color: ${colors.slate[900]};

	&:hover {
		color: ${colors.slate[800]};
	}
`;
