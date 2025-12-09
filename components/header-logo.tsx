import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../assets/icons/logo.svg';

export function HeaderLogo() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 12) }]}>
      <View style={styles.logoContainer}>
        <Logo width={113.613} height={46.902} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
