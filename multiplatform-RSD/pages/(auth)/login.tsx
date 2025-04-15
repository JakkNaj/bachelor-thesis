import { css, html } from "react-strict-dom";
import { usePostApiAuthLogin } from "@/api/generated/auth/auth";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { authService } from '@/lib/store/auth-service';
import { Platform, KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { mutate: login, isPending } = usePostApiAuthLogin({
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
        console.error("Login error:", error);
        setError(error.message);
      }
    }
  });

  const handleLogin = () => {
    setError(null);
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    login({ data: { email, password } });
  };

  /*  // Auto-login with test credentials
  useEffect(() => {
    const autoLogin = async () => {
      try {
        login({ 
          data: { 
            email: 'test@example.com', 
            password: 'testpassword' 
          } 
        });
      } catch (error) {
        console.error('Auto-login failed:', error);
      }
    };

    autoLogin();
  }, []);  */

  const renderContent = () => (
    <html.div style={styles.container}>
      <html.div style={[styles.card, Platform.OS === 'web' && webStyles.card]}>
        <html.div style={styles.header}>
          <html.h1 style={styles.title}>Welcome back</html.h1>
          <html.p style={styles.subtitle}>Please sign in to your account</html.p>
        </html.div>
        
        <html.div style={styles.form}>
          <html.div style={styles.inputGroup}>
            <html.label for="email" style={styles.label}>
              Email
            </html.label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              error={error && !email ? "Email is required" : undefined}
            />
          </html.div>

          <html.div style={styles.inputGroup}>
            <html.label for="password" style={styles.label}>
              Password
            </html.label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              error={error && !password ? "Password is required" : undefined}
            />
          </html.div>

          {error && (
            <html.div style={styles.error}>
              <html.span>{error}</html.span>
            </html.div>
          )}

          <Button 
            title={isPending ? 'Signing in...' : 'Sign in'}
            onPress={handleLogin}
            disabled={isPending}
            fullWidth
          />
        </html.div>

        <html.div style={styles.linkContainer}>
          <html.p style={styles.registerText}>
            Don't have an account?{" "}
            <html.span 
              style={styles.registerLink}
              onClick={() => router.navigate('/(auth)/signup')}
            >
              Register
            </html.span>
          </html.p>
        </html.div>
      </html.div>
    </html.div>
  );

  if (Platform.OS === 'web') {
    return renderContent();
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={nativeStyles.keyboardAvoidingView}
    >
      <ScrollView 
        contentContainerStyle={nativeStyles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        {renderContent()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const nativeStyles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

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
    gap: "0.5rem",
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
  registerText: {
    fontSize: "0.875rem",
    color: "#475569",
    textAlign: "center",
    marginTop: "1rem",
  },
  registerLink: {
    fontWeight: "500",
    color: "#0f172a",
    cursor: "pointer",
  },
});