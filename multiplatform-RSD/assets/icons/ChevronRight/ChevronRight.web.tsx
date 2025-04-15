type TChevronRightIconProps = {
	size?: number;
	color?: string;
};

export const ChevronRight = ({
	size = 24,
	color = '#000000',
	...props
}: TChevronRightIconProps) => {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<path
				d="M9 6L15 12L9 18"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
