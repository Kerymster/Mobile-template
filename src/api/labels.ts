import { Label } from '../utils/types';
import client from './client';
import { ENDPOINTS } from './constants/endpoints';

export interface CategoryDetailResponse {
  id: number;
  name: string;
  labels: Label[];
}

export const getLabels = async (
  categoryId: number
): Promise<CategoryDetailResponse> => {
  const response = await client.get<CategoryDetailResponse>(
    ENDPOINTS.CATEGORY(categoryId.toString())
  );

  return response.data;
};
