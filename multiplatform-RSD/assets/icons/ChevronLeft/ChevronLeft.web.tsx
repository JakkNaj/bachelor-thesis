type TChevronLeftIconProps = {
	size?: number;
	color?: string;
};

export const ChevronLeft = ({ size = 24, color = '#000000' }: TChevronLeftIconProps) => {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<path
				d="M15 6L9 12L15 18"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
