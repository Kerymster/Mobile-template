import axios from 'axios';
import { API_URL } from '~/constants';
import { getAuthTokenOrThrow } from '../utils/auth';
import { BannerAndCategoriesResponse } from '../utils/types';

export const getBannerAndCategories = async (
  menuId: string
): Promise<BannerAndCategoriesResponse> => {
  const token = await getAuthTokenOrThrow();

  const response = await axios.get<BannerAndCategoriesResponse>(
    `${API_URL}/client/menu/${menuId}`,
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
