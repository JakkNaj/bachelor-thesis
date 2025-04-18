import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema, TSignupSchema } from '@monorepo/shared/src/yup/SignupFormSchema';
import { usePostApiAuthSignup } from '@monorepo/shared/src/api/generated/auth/auth';
import { Button } from '@monorepo/shared/src/components/Button';
import { Input } from '@monorepo/shared/src/components/Input';
import { colors, fontSizes, radius, spacing } from '@monorepo/shared/src/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import authStorage from '../lib/auth/auth-storage';

export const Signup = () => {
	const router = useRouter();
	const [error, setError] = useState('');

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TSignupSchema>({
		resolver: yupResolver(signupSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const signupMutation = usePostApiAuthSignup({
		mutation: {
			onSuccess: async data => {
				if (data.data.token && data.data.user) {
					await authStorage.saveToken(data.data.token);
					await authStorage.saveUser({
						id: data.data.user.id!,
						email: data.data.user.email!,
						name: data.data.user.name!,
					});
					router.replace('/(app)' as any);
				}
			},
			onError: (error: Error) => {
				setError('Email is already taken');
			},
		},
	});

	const onSubmit = (data: TSignupSchema) => {
		setError('');
		signupMutation.mutate({ data });
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View>
					<View style={styles.headerContainer}>
						<Text style={styles.title}>Create account</Text>
						<Text style={styles.subtitle}>Please fill in your details</Text>
					</View>

					<View style={styles.formContainer}>
						<View style={styles.inputContainer}>
							<Text style={styles.label}>Name</Text>
							<Controller
								control={control}
								name="name"
								render={({ field: { onChange, value } }) => (
									<Input
										placeholder="Enter your name"
										onChangeText={onChange}
										value={value}
										autoCapitalize="words"
										error={errors.name?.message}
									/>
								)}
							/>
						</View>

						<View style={styles.inputContainer}>
							<Text style={styles.label}>Email</Text>
							<Controller
								control={control}
								name="email"
								render={({ field: { onChange, value } }) => (
									<Input
										placeholder="Enter your email"
										onChangeText={onChange}
										value={value}
										autoCapitalize="none"
										keyboardType="email-address"
										error={errors.email?.message}
									/>
								)}
							/>
						</View>

						<View style={styles.inputContainer}>
							<Text style={styles.label}>Password</Text>
							<Controller
								control={control}
								name="password"
								render={({ field: { onChange, value } }) => (
									<Input
										placeholder="Enter your password"
										onChangeText={onChange}
										value={value}
										secureTextEntry
										error={errors.password?.message}
									/>
								)}
							/>
						</View>
					</View>

					<View style={styles.buttonContainer}>
						{error && (
							<View style={styles.errorContainer}>
								<Text style={styles.errorText}>{error}</Text>
							</View>
						)}
						<Button
							fullWidth
							onPress={handleSubmit(onSubmit)}
							isLoading={isSubmitting || signupMutation.isPending}
							loadingText="Creating account..."
						>
							Create account
						</Button>
					</View>

					<View style={styles.loginContainer}>
						<Text style={styles.loginText}>Already have an account?</Text>
						<Button variant="secondary" onPress={() => router.replace('/(auth)/login' as any)}>
							Sign in
						</Button>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: spacing[6],
		backgroundColor: colors.white,
	},
	headerContainer: {
		marginBottom: spacing[8],
	},
	title: {
		fontSize: fontSizes['4xl'],
		fontWeight: '700',
		textAlign: 'center',
		color: colors.slate[900],
		marginBottom: spacing[2],
	},
	subtitle: {
		fontSize: fontSizes.lg,
		textAlign: 'center',
		color: colors.slate[600],
	},
	formContainer: {
		marginBottom: spacing[4],
	},
	inputContainer: {
		marginBottom: spacing[2],
	},
	label: {
		fontSize: fontSizes.base,
		fontWeight: '500',
		color: colors.slate[700],
		marginBottom: spacing[2],
	},
	buttonContainer: {
		marginBottom: spacing[8],
	},
	errorContainer: {
		marginBottom: spacing[4],
		padding: spacing[3],
		backgroundColor: colors.red[50],
		borderRadius: radius.lg,
	},
	errorText: {
		fontSize: fontSizes.lg,
		color: colors.red[500],
	},
	loginContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginText: {
		fontSize: fontSizes.lg,
		color: colors.slate[600],
		marginRight: spacing[2],
	},
});

export default Signup;
