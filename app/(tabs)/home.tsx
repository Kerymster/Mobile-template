import { useContext } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { MenuContext } from '../../src/context/MenuContext';
import { ProfileContext } from '../../src/context/ProfileContext';

export default function HomeScreen() {
  const { selectedProfile } = useContext(ProfileContext);
  const { loading } = useContext(MenuContext);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
        Welcome, {selectedProfile?.name || 'User'}
      </Text>
      <Text style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>
        Select a category from the menu below to get started.
      </Text>
    </View>
  );
}
