// app/components/AppHeader.tsx
import { View, Pressable, Text, StyleSheet, Platform } from 'react-native';
import { LogoIcon } from '@/assets/icons/LogoIcon';
import { Avatar } from '@/components/Avatar';
import { colors } from '@/assets/colors/colors';

type TAppHeaderProps = {
  onLogoPress: () => void;
  onAvatarPress: () => void;
  userName?: string;
};

export const AppHeader = ({ onLogoPress, onAvatarPress, userName }: TAppHeaderProps) => (
  <View style={styles.headerBar}>
    <View style={Platform.OS === 'web' ? styles.headerContent : styles.headerContentMobile}>
      <Pressable style={styles.logoContainer} onPress={onLogoPress}>
        <LogoIcon size={32} />
        <Text style={styles.headerTitle}>TripPlanner</Text>
      </Pressable>
      <Pressable onPress={onAvatarPress}>
        <Avatar name={userName ?? 'Unknown'} size="sm" />
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerBar: {
    width: '100%',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate[200],
    paddingVertical: 12,
  },
  headerContent: {
    maxWidth: 1536,
    width: '100%',
    marginHorizontal: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerContentMobile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.slate[900],
  },
});