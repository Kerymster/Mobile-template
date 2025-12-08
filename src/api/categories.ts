import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '~/constants';
import { Banner, Category } from '../utils/types';

export interface MenuDetailResponse {
  id: number;
  name: string;
  banners: Banner[];
  categories: Category[];
}

export const getBannerAndCategories = async (
  menuId: string
): Promise<MenuDetailResponse> => {
  let token = await AsyncStorage.getItem('profileToken');
  if (!token) {
    token = await AsyncStorage.getItem('loginToken');
  }

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await axios.get<MenuDetailResponse>(
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
