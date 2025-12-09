import axios from 'axios';
import { getAuthTokenOrThrow } from '../utils/auth';
import { BannerAndCategoriesResponse } from '../utils/types';
import { ENDPOINTS } from './constants/endpoints';

export const getBannerAndCategories = async (
  menuId: string
): Promise<BannerAndCategoriesResponse> => {
  const token = await getAuthTokenOrThrow();

  const response = await axios.get<BannerAndCategoriesResponse>(
    ENDPOINTS.BANNER_AND_CATEGORIES(menuId),
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
