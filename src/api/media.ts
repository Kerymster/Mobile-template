import { ContentItem } from '../utils/types';
import { ENDPOINTS } from './constants/endpoints';
import client from './client';

export interface LabelDetailResponse {
  labelId: number;
  labelName: string;
  contents: ContentItem[];
  total: number;
}

export const getMediaList = async (
  labelId: number,
  page: number = 0,
  size: number = 16
): Promise<LabelDetailResponse> => {
  const response = await client.get<LabelDetailResponse>(
    ENDPOINTS.MEDIA_LIST(labelId.toString(), page, size)
  );

  return response.data;
};
