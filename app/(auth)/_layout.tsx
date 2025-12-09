import { Stack, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderLogo } from '../../components/header-logo';

export default function AuthLayout() {
  const pathname = usePathname();
  const isLoginScreen = pathname?.includes('/login');

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      {!isLoginScreen && <HeaderLogo />}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='login' />
        <Stack.Screen name='profiles' />
      </Stack>
    </SafeAreaView>
  );
}
