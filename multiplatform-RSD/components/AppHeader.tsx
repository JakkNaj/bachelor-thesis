import { LogoIcon } from '@/assets/icons/LogoIcon/LogoIcon';
import { Avatar } from '@/components/Avatar';
import { colors } from '@/assets/colors/colors';
import { css, html } from 'react-strict-dom';

type TAppHeaderProps = {
  onLogoPress: () => void;
  onAvatarPress: () => void;
  userName?: string;
};

export const AppHeader = ({ onLogoPress, onAvatarPress, userName }: TAppHeaderProps) => (
  <html.header style={styles.headerBar()}>
    <html.div style={styles.headerContent}>
      <html.button style={styles.logoContainer()} onClick={onLogoPress}>
        <LogoIcon size={32} />
        <html.span style={styles.headerTitle()}>TripPlanner</html.span>
      </html.button>
      <html.button style={styles.avatarButton()} onClick={onAvatarPress}>
        <Avatar name={userName ?? 'Unknown'} size="sm" />
      </html.button>
    </html.div>
  </html.header>
);

const styles = css.create({
  headerBar: () => ({
    width: '100%',
    backgroundColor: colors.white,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.slate[200],
    paddingTop: '12px',
    paddingBottom: '12px',
  }),
  headerContent: {
    maxWidth: '1536px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  logoContainer: () => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    backgroundColor: colors.white,
    borderWidth: '0',
  }),
  headerTitle: () => ({
    fontSize: '18px',
    fontWeight: '600',
    color: colors.slate[900],
  }),
  avatarButton: () => ({
    cursor: 'pointer',
    backgroundColor: colors.white,
    borderWidth: '0',
  }),
});