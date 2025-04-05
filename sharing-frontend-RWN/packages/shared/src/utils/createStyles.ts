import { StyleSheet } from 'react-native';
import { colors, fontSizes, fontWeights, lineHeights, radius, spacing } from '../theme';

type TThemeValues = {
  colors: typeof colors;
  fontSizes: typeof fontSizes;
  fontWeights: typeof fontWeights;
  lineHeights: typeof lineHeights;
  radius: typeof radius;
  spacing: typeof spacing;
};

export const createStyles = <T extends StyleSheet.NamedStyles<T>>(
  styleFactory: (theme: TThemeValues) => T
): T => {
  const theme = {
    colors,
    fontSizes,
    fontWeights,
    lineHeights,
    radius,
    spacing,
  };

  return StyleSheet.create(styleFactory(theme));
}; 