import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LabelItem from '~/components/labels/label-item';
import { fetchMediaForLabels } from '~/helpers/fetch-media-for-labels';
import { getLabels } from '../../src/api/labels';
import EmptyState from '../../src/components/common/empty-state';
import { LabelWithMedia } from '../../src/utils/types';

export default function LabelsScreen() {
  const params = useLocalSearchParams<{
    categoryId: string;
    categoryName: string;
  }>();

  const { categoryId, categoryName } = params;

  const [labelsWithMedia, setLabelsWithMedia] = useState<LabelWithMedia[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!categoryId) {
      setLoading(false);
      return;
    }

    try {
      const categoryDetail = await getLabels(categoryId);
      const labels = categoryDetail.labels;

      const initialLabels: LabelWithMedia[] = labels.map((label) => ({
        ...label,
        media: [],
        loading: true,
      }));
      setLabelsWithMedia(initialLabels);
      setLoading(false);

      const mediaMap = await fetchMediaForLabels(labels);

      setLabelsWithMedia((prev) =>
        prev.map((label) => ({
          ...label,
          media: mediaMap.get(label.id) || [],
          loading: false,
        }))
      );
    } catch (error) {
      console.error('Error fetching labels:', error);
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (!categoryId) {
    return <EmptyState message='Please select a category to view labels' />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <View style={styles.container}>
        <Text style={styles.categoryTitle}>{categoryName}</Text>

        {labelsWithMedia.length === 0 ? (
          <EmptyState message='No labels available' />
        ) : (
          <FlatList
            data={labelsWithMedia}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <LabelItem label={item} />}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loader: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 16,
  },
});
