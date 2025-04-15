type TDotsIconProps = {
	size?: number;
	color?: string;
};

export const DotsIcon = ({ size = 24, color = "#000000" }: TDotsIconProps) => {
	return (
		<svg width={size} height={size} viewBox="0 0 16 16" fill="none">
			<path
				d="M8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14C6 12.8954 6.89543 12 8 12Z"
				fill={color}
			/>
			<path
				d="M8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6Z"
				fill={color}
			/>
			<path
				d="M10 2C10 0.89543 9.10457 -4.82823e-08 8 0C6.89543 4.82823e-08 6 0.895431 6 2C6 3.10457 6.89543 4 8 4C9.10457 4 10 3.10457 10 2Z"
				fill={color}
			/>
		</svg>
	);
};

export default DotsIcon;
