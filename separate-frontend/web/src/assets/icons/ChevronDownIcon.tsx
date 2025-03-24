type TChevronDownIconProps = {
  className?: string;
  strokeWidth?: number;
  'aria-hidden'?: boolean;
};

export const ChevronDownIcon = ({ className, strokeWidth = 2, 'aria-hidden': ariaHidden }: TChevronDownIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
); 