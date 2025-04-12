import { css, html } from "react-strict-dom";
import { usePostApiAuthLogin } from "@/api/generated/auth/auth";
import { router } from "expo-router";
import { useState } from "react";
import { authService } from '@/lib/store/auth-service';
import { Platform } from "react-native";
import { Button } from "@/components/Button/Button";

const styles = css.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: '20px',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
  },
  containerIOS: {
    paddingTop: '50px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    textAlign: 'center',
  },
  form: {
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: '300px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  formMobile: {
    maxWidth: '90%',
  },
  inputGroup: {
    marginBottom: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
  input: {
    boxSizing: 'border-box',
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ccc',
    fontSize: '16px',
  },
  inputMobile: {
    height: '44px',
    minWidth: '200px',
  },
  error: {
    boxSizing: 'border-box',
    width: '100%',
    padding: '12px',
    backgroundColor: '#ffebee',
    color: '#c62828',
    borderRadius: '8px',
    marginTop: '16px',
    fontSize: '14px',
    textAlign: 'center',
  }
});

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { mutate: login, isPending } = usePostApiAuthLogin({
    mutation: {
      onSuccess: async (data) => {
        if (data.token && data.user) {
          await authService.saveAuth(data.token, {
            id: data.user.id!,
            email: data.user.email!,
            name: data.user.name!,
          });
          router.replace('/(app)' as any);
        }
      },
      onError: (error: Error) => {
        console.error("Login error:", error);
        setError(error.message);
      }
    }
  });

  const handleLogin = () => {
    login({ data: { email, password } });
  };

  return (
    <html.div style={styles.safeContainer}>
      <html.div style={[
        styles.container,
        Platform.OS === 'ios' && styles.containerIOS
      ]}>
        <html.div style={[
          styles.form,
          Platform.OS !== 'web' && styles.formMobile
        ]}>
          <html.span style={styles.title}>Login</html.span>
          
          <html.div style={styles.inputGroup}>
            <html.label for="email" style={styles.label}>
              <html.span>Email:</html.span>
            </html.label>
            <html.input
              id="email"
              type="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              style={[styles.input, Platform.OS !== 'web' && styles.inputMobile]}
              autoCapitalize="off"
            />
          </html.div>

          <html.div style={styles.inputGroup}>
            <html.label for="password" style={styles.label}>
              <html.span>Password:</html.span>
            </html.label>
            <html.input
              id="password"
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              style={[styles.input, Platform.OS !== 'web' && styles.inputMobile]}
              autoCapitalize="off"
            />
          </html.div>

          <Button 
            title={isPending ? 'Logging in...' : 'Login'}
            onPress={handleLogin}
            disabled={isPending}
          />

          {error && (
            <html.div style={styles.error}>
              <html.span>{error}</html.span>
            </html.div>
          )}
        </html.div>
      </html.div>
    </html.div>
  );
}
