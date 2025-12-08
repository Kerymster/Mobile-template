import { StyleSheet, Text, View } from 'react-native';

export default function LiveTVScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Canlı TV</Text>
      <Text style={styles.subtitle}>Live TV functionality coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
