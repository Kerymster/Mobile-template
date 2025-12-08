import { useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TopMenuBar } from '../../components/top-menu-bar';
import { MenuContext } from '../../src/context/MenuContext';
import { ProfileContext } from '../../src/context/ProfileContext';

export default function HomeScreen() {
  const { selectedProfile } = useContext(ProfileContext);
  const { loading } = useContext(MenuContext);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <TopMenuBar />
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome, {selectedProfile?.name || 'User'}
        </Text>
        <Text style={styles.subtitle}>
          Select a category from the menu above to get started.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
