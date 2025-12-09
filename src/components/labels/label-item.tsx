import { StyleSheet, Text, View } from 'react-native';
import { LabelWithMedia } from '~/utils/types';
import MediaList from './media-list';

export default function LabelItem({ label }: { label: LabelWithMedia }) {
  const styles = StyleSheet.create({
    labelSection: {
      marginBottom: 24,
    },
    labelTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
    },
  });
  return (
    <View style={styles.labelSection}>
      <Text style={styles.labelTitle}>{label.name}</Text>
      <MediaList items={label.media} loading={label.loading} />
    </View>
  );
}
