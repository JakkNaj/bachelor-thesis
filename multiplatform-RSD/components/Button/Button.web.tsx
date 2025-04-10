import { html, css } from 'react-strict-dom';

type TButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const styles = css.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  disabled: {
    backgroundColor: '#CCCCCC',
    cursor: 'not-allowed',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export const Button = ({ title, onPress, disabled = false }: TButtonProps): JSX.Element => {
  return (
    <html.button 
      style={[styles.button, disabled && styles.disabled]} 
      onClick={onPress}
      disabled={disabled}
    >
      <html.span style={styles.text}>{title}</html.span>
    </html.button>
  );
};
