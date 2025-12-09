import { CategoryDetailResponse } from '../utils/types';
import client from './client';
import { ENDPOINTS } from './constants/endpoints';

export const getLabels = async (
  categoryId: string
): Promise<CategoryDetailResponse> => {
  const response = await client.get<CategoryDetailResponse>(
    ENDPOINTS.CATEGORY(categoryId)
  );

  return response.data;
};
