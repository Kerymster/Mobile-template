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
import { getLabels } from '../../src/api/labels';
import { getMediaList } from '../../src/api/media';
import { ContentItem, Label } from '../../src/utils/types';

interface LabelWithMedia extends Label {
  media: ContentItem[];
  loading: boolean;
}

export default function LabelsScreen() {
  const params = useLocalSearchParams<{
    categoryId: string | string[];
    categoryName: string | string[];
  }>();
  // Handle array case from useLocalSearchParams
  const categoryId = Array.isArray(params.categoryId)
    ? params.categoryId[0]
    : params.categoryId;
  const categoryName = Array.isArray(params.categoryName)
    ? params.categoryName[0]
    : params.categoryName;

  const [labelsWithMedia, setLabelsWithMedia] = useState<LabelWithMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabelsAndMedia = async () => {
      try {
        const categoryDetail = await getLabels(Number(categoryId));
        const labels = categoryDetail.labels;

        // Initialize labels with empty media arrays
        const initialLabels: LabelWithMedia[] = labels.map((label) => ({
          ...label,
          media: [],
          loading: true,
        }));
        setLabelsWithMedia(initialLabels);
        setLoading(false);

        // Fetch media for each label
        const mediaPromises = labels.map(async (label) => {
          try {
            const labelDetail = await getMediaList(label.id);
            return { labelId: label.id, contents: labelDetail.contents };
          } catch (err) {
            console.log(`Error fetching media for label ${label.id}`, err);
            return { labelId: label.id, contents: [] };
          }
        });

        const mediaResults = await Promise.all(mediaPromises);

        // Update labels with their media
        setLabelsWithMedia((prev) =>
          prev.map((label) => {
            const result = mediaResults.find((r) => r.labelId === label.id);
            return {
              ...label,
              media: result?.contents || [],
              loading: false,
            };
          })
        );
      } catch (err) {
        console.log('Error fetching labels', err);
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchLabelsAndMedia();
    }
  }, [categoryId]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
        {categoryName}
      </Text>

      <FlatList
        data={labelsWithMedia}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.labelSection}>
            <Text style={styles.labelTitle}>{item.name}</Text>
            {item.loading ? (
              <ActivityIndicator size='small' style={{ marginVertical: 16 }} />
            ) : item.media.length > 0 ? (
              <FlatList
                horizontal
                data={item.media}
                keyExtractor={(mediaItem) => mediaItem.id.toString()}
                renderItem={({ item: mediaItem }) => (
                  <Image
                    source={{
                      uri: `https://atlas.saatteknoloji.com.tr/${mediaItem.poster}`,
                    }}
                    style={styles.mediaPoster}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 16 }}
              />
            ) : (
              <Text style={styles.emptyText}>No content available</Text>
            )}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  labelSection: {
    marginBottom: 24,
  },
  labelTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  mediaPoster: {
    width: 120,
    height: 180,
    marginRight: 12,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  emptyText: {
    color: '#999',
    fontStyle: 'italic',
    marginVertical: 16,
  },
});
