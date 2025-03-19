import { ReactNode } from "react";

type TNavigationLinkProps = {
    children: ReactNode;
    isActive?: boolean;
    onClick: () => void;
  };
  
export const NavigationLink = ({ children, isActive = false, onClick }: TNavigationLinkProps) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors text-sm ${
        isActive
          ? 'bg-slate-100 text-slate-900 font-medium'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      {children}
    </button>
);