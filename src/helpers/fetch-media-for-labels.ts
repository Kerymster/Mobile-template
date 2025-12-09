import { getMediaList } from '~/api/media';
import { Content, Label } from '~/utils/types';

export async function fetchMediaForLabels(
  labels: Label[]
): Promise<Map<number, Content[]>> {
  const mediaMap = new Map<number, Content[]>();

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
