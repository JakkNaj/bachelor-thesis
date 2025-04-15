import { css, html } from "react-strict-dom";
import { usePostApiAuthSignup } from "@/api/generated/auth/auth";
import { router } from "expo-router";
import { useState } from "react";
import { authService } from '@/lib/store/auth-service';
import { Platform } from "react-native";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

type TSignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signupSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], "Passwords must match")
    .required("Please confirm your password"),
});

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

  return (
    <html.div style={styles.container}>
      <html.div style={[styles.card, Platform.OS === 'web' && webStyles.card]}>
        <html.div style={styles.header}>
          <html.h1 style={styles.title}>Create Account</html.h1>
          <html.p style={styles.subtitle}>Please fill in your details</html.p>
        </html.div>
        
        <html.div style={styles.form}>
          <html.div style={styles.inputGroup}>
            <html.label for="name" style={styles.label}>
              Name
            </html.label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter your name"
                  error={errors.name?.message}
                />
              )}
            />
          </html.div>

          <html.div style={styles.inputGroup}>
            <html.label for="email" style={styles.label}>
              Email
            </html.label>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  type="email"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter your email"
                  error={errors.email?.message}
                />
              )}
            />
          </html.div>

          <html.div style={styles.inputGroup}>
            <html.label for="password" style={styles.label}>
              Password
            </html.label>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
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
          </html.div>

          <html.div style={styles.inputGroup}>
            <html.label for="confirmPassword" style={styles.label}>
              Confirm Password
            </html.label>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
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
          </html.div>

          {error && (
            <html.div style={styles.error}>
              <html.span>{error}</html.span>
            </html.div>
          )}

          <Button 
            title={isPending ? 'Creating account...' : 'Create Account'}
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            fullWidth
          />
        </html.div>

        <html.div style={styles.linkContainer}>
            <html.p style={styles.loginText}>
            Already have an account?{" "}
            <html.span 
                style={styles.loginLink}
                onClick={() => router.navigate('/(auth)/login')}
            >
                Sign in
            </html.span>
            </html.p>
        </html.div>
      </html.div>
    </html.div>
  );
};

const webStyles = css.create({
  card: {
    width: "100%",
  },
});

const styles = css.create({
    linkContainer: {
        paddingTop: "1rem",
    },
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: "1rem",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    flex: 1,
  },
  header: {
    marginBottom: "1rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "600",
    color: "#0f172a",
    textAlign: "center",
  },
  subtitle: {
    marginTop: "0.5rem",
    fontSize: "0.875rem",
    color: "#475569",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "0.5rem",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#334155",
    marginBottom: "0.25rem",
  },
  error: {
    backgroundColor: "#fef2f2",
    color: "#ef4444",
    fontSize: "0.875rem",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    marginBottom: "0.5rem",
  },
  loginText: {
    fontSize: "0.875rem", 
    color: "#0f172a", 
    textAlign: "center",
  },
  loginLink: {
    fontWeight: "500",
    color: "#0f172a", 
    cursor: "pointer",
  },
});
