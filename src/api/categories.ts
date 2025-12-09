import { BannerAndCategoriesResponse } from '../utils/types';
import { ENDPOINTS } from './constants/endpoints';
import client from './client';

export const getBannerAndCategories = async (
  menuId: string
): Promise<BannerAndCategoriesResponse> => {
  const response = await client.get<BannerAndCategoriesResponse>(
    ENDPOINTS.BANNER_AND_CATEGORIES(menuId)
  );

  return response.data;
};
