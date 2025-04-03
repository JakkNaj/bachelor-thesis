import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

type TButtonProps = {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary';
};

export const Button = ({ onPress, title, variant = 'primary' }: TButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.button, variant === 'primary' ? styles.primary : styles.secondary]}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#E5E5EA',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 