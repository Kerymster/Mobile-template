import { ContentItem } from '../utils/types';
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
    `/api/label/${labelId}?page=${page}&size=${size}`
  );
  return response.data;
};
