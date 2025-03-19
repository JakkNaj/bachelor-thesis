import { ButtonHTMLAttributes, ReactNode } from 'react';

type TButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  outlined?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  loadingText,
  fullWidth = false,
  className = '',
  disabled,
  icon,
  outlined = false,
  ...props
}: TButtonProps) => {
  const baseStyles = `py-2 ${icon ? 'pl-2 pr-4' : 'px-4'} rounded-lg flex items-center justify-center text-sm font-medium focus:outline-none cursor-pointer focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${fullWidth ? 'w-full' : ''}`;
  
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500',
    secondary: 'bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-200',
  };

  const outlinedStyles = 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-200';

  return (
    <button
      className={`${baseStyles} ${outlined ? outlinedStyles : variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {isLoading ? (loadingText || 'Loading...') : children}
    </button>
  );
};