import { StyleSheet, Text, View } from 'react-native';

export default function EmptyState({ message }: { message: string }) {
  const styles = StyleSheet.create({
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      color: '#999',
      fontStyle: 'italic',
      marginVertical: 16,
    },
  });
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}
