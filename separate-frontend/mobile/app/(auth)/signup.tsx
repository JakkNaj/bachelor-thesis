import { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostApiAuthSignup } from "@/api/generated/auth/auth";
import { authStorage } from "@/lib/auth/auth-storage";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { signupSchema, type TSignupSchema } from "@/types/signupSchema";

export const Signup = () => {
	const router = useRouter();
	const [error, setError] = useState("");

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TSignupSchema>({
		resolver: yupResolver(signupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const signupMutation = usePostApiAuthSignup({
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
				setError("Email is already taken");
			},
		},
	});

	const onSubmit = (data: TSignupSchema) => {
		setError("");
		signupMutation.mutate({ data });
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
			<ScrollView contentContainerClassName="flex-1 justify-center px-6 bg-white">
				<View>
					<View className="mb-8">
						<Text className="text-4xl font-bold text-center text-slate-900 mb-2">Create account</Text>
						<Text className="text-lg text-center text-slate-600">Please fill in your details</Text>
					</View>

					<View className="mb-4">
						<View className="mb-2">
							<Text className="text-base font-medium text-slate-700 mb-2">Name</Text>
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
										error={errors.email?.message}
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
						{error && (
							<View className="mb-4 p-3 bg-red-50 rounded-lg">
								<Text className="text-lg text-red-500">{error}</Text>
							</View>
						)}
						<Button
							fullWidth
							onPress={handleSubmit(onSubmit)}
							isLoading={isSubmitting || signupMutation.isPending}
							loadingText="Creating account..."
							className="py-3"
						>
							Create account
						</Button>
					</View>

					<View className="flex-row justify-center items-center">
						<Text className="text-lg text-slate-600 mr-2">Already have an account?</Text>
						<Button variant="secondary" onPress={() => router.replace("/(auth)/login" as any)} className="py-2 px-4">
							Sign in
						</Button>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default Signup;
