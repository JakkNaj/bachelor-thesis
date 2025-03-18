import { ButtonHTMLAttributes, ReactNode } from 'react';

type TButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  loadingText,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: TButtonProps) => {
  const baseStyles = `py-2 px-4 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${fullWidth ? 'w-full' : ''}`;
  
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500',
    secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 focus:ring-slate-200',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (loadingText || 'Loading...') : children}
    </button>
  );
};