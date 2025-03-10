import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePostApiAuthLogin } from '../api/generated/auth/auth';
import { AuthResponse } from '../api/generated/schemas';

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
  const { setAuth } = useAuthStore();
  
  // Get the page they were trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/';
  
  const { mutate: login, isPending, error } = usePostApiAuthLogin({
    mutation: {
      onSuccess: (data: AuthResponse) => {
        if (data.token && data.user) {
          setAuth(data.token, data.user);
          navigate(from, { replace: true });
        }
      },
    }
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormData>({
    resolver: yupResolver(loginSchema),
  });
  
  const onSubmit = (data: TLoginFormData) => {
    login({ data });
  };
  
  return (
    <div className="login-container">
      <h1>Login</h1>
      
      {error && (
        <div className="error-message">
          {error instanceof Error ? error.message : 'An error occurred during login'}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        
        <button type="submit" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}; 