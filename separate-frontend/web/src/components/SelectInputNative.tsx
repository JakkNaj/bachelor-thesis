import { ChevronDownIcon } from '../assets/icons/ChevronDownIcon';
import * as React from 'react';

type TSelectInputNativeProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string;
  label?: string;
};

export const SelectInputNative = React.forwardRef<HTMLSelectElement, TSelectInputNativeProps>(
  ({ className = '', error, label, children, ...props }, ref) => {
    const baseStyles = "peer inline-flex w-full cursor-pointer appearance-none items-center rounded-lg border border-slate-200 bg-white text-sm text-slate-900 shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";
    const heightStyles = props.multiple ? "py-1 [&>*]:px-3 [&>*]:py-1" : "h-9 pe-8 ps-3";
    const errorStyles = error ? "border-red-500 focus:ring-red-200" : "";

    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={`${baseStyles} ${heightStyles} ${errorStyles} ${className}`}
            ref={ref}
            {...props}
          >
            {children}
          </select>
          {!props.multiple && (
            <span className="pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-slate-400 peer-disabled:opacity-50">
              <ChevronDownIcon className="h-4 w-4" strokeWidth={2} aria-hidden={true} />
            </span>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

SelectInputNative.displayName = 'SelectInputNative'; 