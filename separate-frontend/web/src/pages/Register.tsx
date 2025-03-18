import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { usePostApiAuthSignup } from '../api/generated/auth/auth';
import { AuthResponse } from '../api/generated/schemas';
import { useAuthStore } from '../store/authStore';
import { Input } from '../components/Input';

type TRegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const registerSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const Register = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const { mutate: register, isPending, error } = usePostApiAuthSignup({
    mutation: {
      onSuccess: (data: AuthResponse) => {
        if (data.token && data.user) {
          setAuth(data.token, data.user);
          navigate('/', { replace: true });
        }
      },
    },
  });

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: TRegisterFormData) => {
    register({ data });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 text-center">Create an account</h1>
          <p className="mt-2 text-sm text-slate-600 text-center">
            Join us and start planning your trips
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg">
            {error instanceof Error ? error.message : 'An error occurred during registration'}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Name
            </label>
            <Input
              id="name"
              type="text"
              {...registerField('name')}
              error={errors.name?.message}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...registerField('email')}
              error={errors.email?.message}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...registerField('password')}
              error={errors.password?.message}
              placeholder="Create a password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              {...registerField('confirmPassword')}
              error={errors.confirmPassword?.message}
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-slate-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-sm text-slate-600 text-center">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-slate-900 hover:text-slate-800">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}; 