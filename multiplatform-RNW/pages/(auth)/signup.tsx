import { usePostApiAuthSignup } from "@/api/generated/auth/auth";
import { router } from "expo-router";
import { useState } from "react";
import { authService } from '@/lib/store/auth-service';
import { Platform, KeyboardAvoidingView, ScrollView, StyleSheet, View, Text } from "react-native";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { colors } from "@/assets/colors/colors";
import { signupSchema } from "@/types/SignupFormSchema";

type TSignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignupPage = () => {
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<TSignupFormData>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: signup, isPending } = usePostApiAuthSignup({
    mutation: {
      onSuccess: async (data) => {
        if (data.token && data.user) {
          try {
            await authService.saveAuth(data.token, {
              id: data.user.id!,
              email: data.user.email!,
              name: data.user.name!,
            });
            router.navigate('/(app)');
          } catch (error) {
            console.error("Error saving auth:", error);
            setError("Failed to save authentication data");
          }
        }
      },
      onError: (error: Error) => {
        console.error("Signup error:", error);
        setError("Email is already taken");
      }
    }
  });

  const onSubmit = (data: TSignupFormData) => {
    setError(null);
    signup({ 
      data: { 
        name: data.name,
        email: data.email, 
        password: data.password 
      } 
    });
  };

  const renderContent = () => (
    <View style={styles.container}>
      <View style={[styles.card, Platform.OS === 'web' && styles.webCard]}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Please fill in your details</Text>
        </View>
        
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <Controller
              control={control}
              name="name"
              render={({ field }: { field: ControllerRenderProps<TSignupFormData, "name"> }) => (
                <Input
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter your name"
                  error={errors.name?.message}
                />
              )}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field }: { field: ControllerRenderProps<TSignupFormData, "email"> }) => (
                <Input
                  type="email"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter your email"
                  error={errors.email?.message}
                />
              )}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field }: { field: ControllerRenderProps<TSignupFormData, "password"> }) => (
                <Input
                  type="password"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter your password"
                  error={errors.password?.message}
                  secureTextEntry
                />
              )}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }: { field: ControllerRenderProps<TSignupFormData, "confirmPassword"> }) => (
                <Input
                  type="password"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Confirm your password"
                  error={errors.confirmPassword?.message}
                  secureTextEntry
                />
              )}
            />
          </View>

          {error && (
            <View style={styles.error}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <Button 
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            fullWidth
            isLoading={isPending}
            loadingText="Creating account..."
            title="Create Account"
          />
        </View>

        <View style={styles.linkContainer}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text 
              style={styles.loginLink}
              onPress={() => router.navigate('/(auth)/login')}
            >
              Sign in
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );

  if (Platform.OS === 'web') {
    return renderContent();
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        {renderContent()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  webCard: {
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    padding: 16,
    paddingTop: 32,
    ...(Platform.OS === 'web' && {
      minHeight: '100%',
    }),
  },
  card: {
    backgroundColor: colors.white,
    padding: Platform.OS === 'web' ? 32 : 16,
    width: '100%',
  },
  header: {
    marginBottom: 24,
    display: 'flex',
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: colors.slate[900],
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: colors.slate[600],
    textAlign: "center",
  },
  form: {
    width: '100%',
    flexDirection: "column",
    gap: 4,
  },
  inputGroup: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.slate[700],
    marginBottom: 4,
  },
  error: {
    backgroundColor: colors.red[50],
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  errorText: {
    color: colors.red[500],
    fontSize: 14,
  },
  loginText: {
    fontSize: 14,
    color: colors.slate[600],
    textAlign: "center",
    marginTop: 24,
  },
  loginLink: {
    fontWeight: "500",
    color: colors.slate[900],
  },
  linkContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
});
