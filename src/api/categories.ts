import client from './client';
import { Banner, Category } from '../utils/types';

export interface MenuDetailResponse {
  id: number;
  name: string;
  banners: Banner[];
  categories: Category[];
}

export const getBannerAndCategories = async (
  menuId: number
): Promise<MenuDetailResponse> => {
  const response = await client.get<MenuDetailResponse>(
    `/api/menu/${menuId}`
  );
  return response.data;
};
