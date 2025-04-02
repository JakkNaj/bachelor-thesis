import { forwardRef } from "react";

type TInputProps = {
	className?: string;
	error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, TInputProps>(({ className = "", error, ...props }, ref) => {
	return (
		<div className="w-full">
			<input
				ref={ref}
				className={`
            w-full
            h-9
            px-3
            py-2
            text-sm
            rounded-lg
            border
            border-slate-200
            bg-white
            shadow-sm
            shadow-black/5
            transition-all
            placeholder:text-slate-400
            focus:border-slate-300
            focus:outline-none
            focus:ring-[3px]
            focus:ring-slate-200/20
            disabled:cursor-not-allowed
            disabled:opacity-50
            ${props.type === "search" && "[&::-webkit-search-cancel-button]:appearance-none"}
            ${props.type === "file" && "p-0 pr-3 italic text-slate-400 file:mr-3 file:h-full file:border-0 file:border-r file:border-slate-200 file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic"}
            ${error ? "border-red-300 focus:border-red-400 focus:ring-red-200/20" : ""}
            ${className}
          `}
				{...props}
			/>
			<div className="h-5 mt-1">{error && <p className="text-sm text-red-500">{error}</p>}</div>
		</div>
	);
});

Input.displayName = "Input";
