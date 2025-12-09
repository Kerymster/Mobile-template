import axios from 'axios';
import { getAuthTokenOrThrow } from '../utils/auth';
import { Label } from '../utils/types';
import { ENDPOINTS } from './constants/endpoints';

export interface CategoryDetailResponse {
  id: number;
  name: string;
  labels: Label[];
}

export const getLabels = async (
  categoryId: number
): Promise<CategoryDetailResponse> => {
  const token = await getAuthTokenOrThrow();

  const response = await axios.get<CategoryDetailResponse>(
    ENDPOINTS.CATEGORY(categoryId.toString()),
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
