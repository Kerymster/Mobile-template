import { Slot } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext';
import { MenuProvider } from '../src/context/MenuContext';
import { ProfileProvider } from '../src/context/ProfileContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <MenuProvider>
          <Slot />
        </MenuProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
