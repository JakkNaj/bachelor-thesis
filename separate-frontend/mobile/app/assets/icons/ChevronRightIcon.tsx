import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

type TChevronRightIconProps = SvgProps & {
	size?: number;
	color?: string;
};

export const ChevronRightIcon = ({ size = 24, color = "#000000", ...props }: TChevronRightIconProps) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
			<Path d="M9 6L15 12L9 18" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
		</Svg>
	);
};
