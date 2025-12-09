import axios from 'axios';
import { getAuthTokenOrThrow } from '../utils/auth';
import { ContentItem } from '../utils/types';
import { ENDPOINTS } from './constants/endpoints';

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
  const token = await getAuthTokenOrThrow();

  const response = await axios.get<LabelDetailResponse>(
    ENDPOINTS.MEDIA_LIST(labelId.toString(), page, size),
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
