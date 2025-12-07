import { Slot } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext';
import { ProfileProvider } from '../src/context/ProfileContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Slot />
      </ProfileProvider>
    </AuthProvider>
  );
}
