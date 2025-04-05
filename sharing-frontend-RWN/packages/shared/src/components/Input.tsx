import { Text, TextInput, TextInputProps, View } from 'react-native';
import { createStyles } from '../utils/createStyles';
import { colors, components, lineHeights, fontSizes, radius } from '../theme';

type TInputProps = TextInputProps & {
  error?: string;
};

export const Input = ({ error, style, ...props }: TInputProps) => {
  const styles = useStyles(error);
  
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={colors.slate[400]}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

type TInputStyles = {
    container: object;
    input: object;
    errorText: object;
  };

const useStyles = (error?: string) => {
  return createStyles<TInputStyles>((theme) => ({
    container: {
      width: '100%',
    },
    input: {
      height: components.input.height,
      paddingHorizontal: theme.spacing[4],
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: error ? theme.colors.red[500] : theme.colors.slate[200],
      backgroundColor: 'white',
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.normal,
      color: theme.colors.slate[900],
    },
    errorText: {
      color: theme.colors.red[600],
      fontSize: fontSizes.sm,
      marginTop: theme.spacing[1],
    },
  }));
}; 