import { Line, Path, Polyline, Svg } from 'react-native-svg';

type TLogOutIconProps = {
	size?: number;
	color?: string;
};

export const LogOutIcon = ({ size = 24, color = '#000000' }: TLogOutIconProps) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Polyline
				points="16 17 21 12 16 7"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Line
				x1="21"
				y1="12"
				x2="9"
				y2="12"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
