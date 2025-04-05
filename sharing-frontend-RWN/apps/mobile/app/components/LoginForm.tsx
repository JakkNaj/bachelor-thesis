import { usePostApiAuthLogin } from '@monorepo/shared/src/api/generated/auth/auth';
import type { AuthResponse } from '@monorepo/shared/src/api/generated/schemas/authResponse';
import type { PostApiAuthLoginBody } from '@monorepo/shared/src/api/generated/schemas/postApiAuthLoginBody';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import authStorage from '../lib/auth/auth-storage';

type TLoginFormProps = {
	onSuccess?: (data: AuthResponse) => void;
};

export const LoginForm = ({ onSuccess }: TLoginFormProps) => {
	const [formData, setFormData] = useState<PostApiAuthLoginBody>({
		email: '',
		password: '',
	});

	const { mutate: login, error, isPending, data } = usePostApiAuthLogin();

	const handleSubmit = () => {
		login(
			{ data: formData },
			{
				onSuccess: response => {
					// Save token to SecureStore
					if (response.data.token) {
						authStorage.saveToken(response.data.token);
					}

					// Call the onSuccess callback with the response data
					onSuccess?.(response.data);
				},
			}
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={styles.input}
					value={formData.email}
					onChangeText={text => setFormData(prev => ({ ...prev, email: text }))}
					keyboardType="email-address"
					autoCapitalize="none"
					placeholder="Enter your email"
				/>
			</View>

			<View style={styles.inputContainer}>
				<Text style={styles.label}>Password</Text>
				<TextInput
					style={styles.input}
					value={formData.password}
					onChangeText={text => setFormData(prev => ({ ...prev, password: text }))}
					secureTextEntry
					placeholder="Enter your password"
				/>
			</View>

			{error && (
				<Text style={styles.errorText}>{(error as Error).message || 'An error occurred'}</Text>
			)}

			{data && (
				<Text style={styles.successText}>Logged in successfully as {data.data.user?.name}</Text>
			)}

			<TouchableOpacity
				style={[styles.button, isPending && styles.buttonDisabled]}
				onPress={handleSubmit}
				disabled={isPending}
			>
				<Text style={styles.buttonText}>{isPending ? 'Logging in...' : 'Login'}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: 'white',
		borderRadius: 8,
		margin: 16,
	},
	inputContainer: {
		marginBottom: 16,
	},
	label: {
		fontSize: 14,
		fontWeight: '500',
		marginBottom: 8,
		color: '#374151',
	},
	input: {
		borderWidth: 1,
		borderColor: '#D1D5DB',
		borderRadius: 6,
		padding: 12,
		fontSize: 16,
	},
	button: {
		backgroundColor: '#2563EB',
		padding: 12,
		borderRadius: 6,
		alignItems: 'center',
		marginTop: 8,
	},
	buttonDisabled: {
		opacity: 0.5,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '500',
	},
	errorText: {
		color: '#EF4444',
		marginBottom: 12,
		fontSize: 14,
	},
	successText: {
		color: '#10B981',
		marginBottom: 12,
		fontSize: 14,
	},
});
