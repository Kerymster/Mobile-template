import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getLabels } from '../../src/api/labels';
import { getMediaList } from '../../src/api/media';
import { ContentItem, Label } from '../../src/utils/types';

const API_BASE_URL = 'https://atlas.saatteknoloji.com.tr';

interface LabelWithMedia extends Label {
  media: ContentItem[];
  loading: boolean;
}

function parseCategoryId(
  categoryId: string | string[] | undefined
): number | null {
  const id = Array.isArray(categoryId) ? categoryId[0] : categoryId;
  if (!id || (typeof id === 'string' && id.trim() === '')) return null;

  const parsed = Number(id);
  return !isNaN(parsed) && parsed > 0 ? parsed : null;
}

async function fetchMediaForLabels(
  labels: Label[]
): Promise<Map<number, ContentItem[]>> {
  const mediaMap = new Map<number, ContentItem[]>();

  const results = await Promise.allSettled(
    labels.map(async (label) => {
      try {
        const response = await getMediaList(label.id);
        return { labelId: label.id, contents: response.contents };
      } catch (error) {
        console.error(`Error fetching media for label ${label.id}:`, error);
        return { labelId: label.id, contents: [] };
      }
    })
  );

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      mediaMap.set(result.value.labelId, result.value.contents);
    }
  });

  return mediaMap;
}

function MediaPoster({ poster }: { poster: string }) {
  return (
    <Image
      source={{ uri: `${API_BASE_URL}/${poster}` }}
      style={styles.mediaPoster}
    />
  );
}

function MediaList({
  items,
  loading,
}: {
  items: ContentItem[];
  loading: boolean;
}) {
  if (loading) {
    return <ActivityIndicator size='small' style={styles.mediaLoader} />;
  }

  if (items.length === 0) {
    return <Text style={styles.emptyText}>No content available</Text>;
  }

  return (
    <FlatList
      horizontal
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <MediaPoster poster={item.poster} />}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.mediaListContainer}
    />
  );
}

function LabelItem({ label }: { label: LabelWithMedia }) {
  return (
    <View style={styles.labelSection}>
      <Text style={styles.labelTitle}>{label.name}</Text>
      <MediaList items={label.media} loading={label.loading} />
    </View>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}

export default function LabelsScreen() {
  const params = useLocalSearchParams<{
    categoryId: string | string[];
    categoryName: string | string[];
  }>();

  const categoryId = parseCategoryId(params.categoryId);
  const categoryName = Array.isArray(params.categoryName)
    ? params.categoryName[0]
    : params.categoryName;

  const [labelsWithMedia, setLabelsWithMedia] = useState<LabelWithMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
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
    }

    loadData();
  }, [categoryId]);

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
  labelSection: {
    marginBottom: 24,
  },
  labelTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  mediaListContainer: {
    paddingRight: 16,
  },
  mediaLoader: {
    marginVertical: 16,
  },
  mediaPoster: {
    width: 120,
    height: 180,
    marginRight: 12,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
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
