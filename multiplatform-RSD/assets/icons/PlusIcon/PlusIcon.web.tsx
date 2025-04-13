
type TPlusIconProps = {
	size?: number;
	color?: string;
};

export const PlusIcon = ({ size = 24, color = '#000000' }: TPlusIconProps) => {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<path
				d="M4 12H20M12 4V20"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default PlusIcon;