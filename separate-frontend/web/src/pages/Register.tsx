import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { usePostApiAuthSignup } from '../api/generated/auth/auth';
import { useAuthStore } from '../store/authStore';
import { AuthResponse } from '../api/generated/schemas';

type TRegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const registerSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const Register = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  
  const { mutate: register, isPending, error } = usePostApiAuthSignup({
    mutation: {
      onSuccess: (data: AuthResponse) => {
        // Automatically log in the user after successful registration
        if (data.token && data.user) {
          setAuth(data.token, data.user);
          navigate('/');
        }
      },
    }
  });
  
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormData>({
    resolver: yupResolver(registerSchema),
  });
  
  const onSubmit = (data: TRegisterFormData) => {
    // Remove confirmPassword as it's not needed in the API call
    const { confirmPassword, ...registerData } = data; // eslint-disable-line @typescript-eslint/no-unused-vars
    register({ data: registerData });
  };
  
  return (
    <div className="register-container">
      <h1>Register</h1>
      
      {error && (
        <div className="error-message">
          {error instanceof Error ? error.message : 'An error occurred during registration'}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...registerField('name')}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...registerField('email')}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...registerField('password')}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...registerField('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>
        
        <button type="submit" disabled={isPending}>
          {isPending ? 'Registering...' : 'Register'}
        </button>
      </form>
      
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}; 