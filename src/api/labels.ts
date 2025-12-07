import client from './client';
import { Label } from '../utils/types';

export interface CategoryDetailResponse {
  id: number;
  name: string;
  labels: Label[];
}

export const getLabels = async (
  categoryId: number
): Promise<CategoryDetailResponse> => {
  const response = await client.get<CategoryDetailResponse>(
    `/api/category/${categoryId}`
  );
  return response.data;
};
