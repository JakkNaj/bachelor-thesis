import { useState } from "react";
import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostApiAuthLogin } from "@/api/generated/auth/auth";
import { authStorage } from "@/lib/auth/auth-storage";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { loginSchema, type TLoginSchema } from "@/types/loginSchema";

export const Login = () => {
	const router = useRouter();
	const [error, setError] = useState("");

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TLoginSchema>({
		resolver: yupResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const loginMutation = usePostApiAuthLogin({
		mutation: {
			onSuccess: async (data) => {
				if (data.token && data.user) {
					await authStorage.saveToken(data.token);
					await authStorage.saveUser({
						id: data.user.id!,
						email: data.user.email!,
						name: data.user.name!,
					});
					router.replace("/(app)" as any);
				}
			},
			onError: (error: Error) => {
				setError("Error: " + error.message);
			},
		},
	});

	const onSubmit = (data: TLoginSchema) => {
		setError("");
		loginMutation.mutate({ data });
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
			<ScrollView contentContainerClassName="flex-1 justify-center px-6 bg-white">
				<View>
					<View className="mb-8">
						<Text className="text-4xl font-bold text-center text-slate-900 mb-2">Welcome back</Text>
						<Text className="text-lg text-center text-slate-600">Please sign in to your account</Text>
					</View>

					<View className="mb-4">
						<View className="mb-2">
							<Text className="text-base font-medium text-slate-700 mb-2">Email</Text>
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
										error={errors.email?.message || error}
									/>
								)}
							/>
						</View>

						<View>
							<Text className="text-base font-medium text-slate-700 mb-2">Password</Text>
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

					<View className="mb-8">
						<Button
							fullWidth
							onPress={handleSubmit(onSubmit)}
							isLoading={isSubmitting || loginMutation.isPending}
							loadingText="Signing in..."
							className="py-3"
						>
							Sign in
						</Button>
					</View>

					<View className="flex-row justify-center items-center">
						<Text className="text-lg text-slate-600 mr-2">Don't have an account?</Text>
						<Button variant="secondary" onPress={() => router.replace("/(auth)/signup" as any)} className="py-2 px-4">
							Register
						</Button>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default Login;
