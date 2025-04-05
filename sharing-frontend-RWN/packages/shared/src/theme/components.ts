import { fontSizes, fontWeights, lineHeights } from './typography';
import { colors } from './colors';
import { radius } from './radius';

export const components = {
  input: {
    height: 56, // 3.5rem
    paddingX: 16, // 1rem
    borderRadius: radius.lg,
    borderColor: colors.slate[200],
    backgroundColor: colors.white,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.normal,
  },
  button: {
    paddingY: 8, // 0.5rem
    paddingX: 16, // 1rem
    borderRadius: radius.lg,
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.base,
    variants: {
      primary: {
        backgroundColor: colors.slate[900],
        color: colors.white,
      },
      secondary: {
        backgroundColor: colors.white,
        color: colors.slate[900],
        borderColor: colors.slate[300],
        borderWidth: 1,
      },
      danger: {
        backgroundColor: colors.white,
        color: colors.red[600],
        borderColor: colors.red[500],
        borderWidth: 1,
      },
    },
  },
  avatar: {
    borderRadius: radius.full,
    sizes: {
      sm: 32, // 2rem
      md: 40, // 2.5rem
      lg: 48, // 3rem
    },
  },
}; 