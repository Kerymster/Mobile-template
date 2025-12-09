import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Content } from '~/utils/types';
import EmptyState from '../common/empty-state';
import MediaPoster from './media-poster';

export default function MediaList({
  items,
  loading,
}: {
  items: Content[];
  loading: boolean;
}) {
  const styles = StyleSheet.create({
    mediaListContainer: {
      paddingRight: 16,
    },
    mediaLoader: {
      marginVertical: 16,
    },
  });
  if (loading) {
    return <ActivityIndicator size='small' style={styles.mediaLoader} />;
  }

  if (items.length === 0) {
    return <EmptyState message='No content available' />;
  }

  return (
    <FlatList
      horizontal
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <MediaPoster poster={item.posters[0].url} />}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.mediaListContainer}
    />
  );
}
