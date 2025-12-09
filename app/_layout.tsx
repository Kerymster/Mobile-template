import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../src/context/AuthContext';
import { MenuProvider } from '../src/context/MenuContext';
import { ProfileProvider } from '../src/context/ProfileContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ProfileProvider>
          <MenuProvider>
            <Slot />
          </MenuProvider>
        </ProfileProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
