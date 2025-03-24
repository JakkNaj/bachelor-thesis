import { forwardRef, SVGProps } from 'react';

type TSvgWrapperProps = {
  width?: string | number;
  height?: string | number;
  className?: string;
} & SVGProps<SVGSVGElement>;

const DEFAULT_ICON_SIZE = '24px';

export const SvgWrapper = forwardRef<SVGSVGElement, TSvgWrapperProps>(
  ({ children, width, height, className = '', ...props }, ref) => {
    const finalWidth = typeof width === 'number' ? `${width}px` : width || DEFAULT_ICON_SIZE;
    const finalHeight = typeof height === 'number' ? `${height}px` : height || DEFAULT_ICON_SIZE;

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={finalWidth}
        height={finalHeight}
        className={`inline-block ${className}`}
        {...props}
      >
        {children}
      </svg>
    );
  }
);

SvgWrapper.displayName = 'SvgWrapper'; 