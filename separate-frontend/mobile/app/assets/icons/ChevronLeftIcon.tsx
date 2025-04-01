import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

type TChevronLeftIconProps = SvgProps & {
	size?: number;
	color?: string;
};

export const ChevronLeftIcon = ({ size = 24, color = "#000000", ...props }: TChevronLeftIconProps) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
			<Path d="M15 6L9 12L15 18" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
		</Svg>
	);
};
