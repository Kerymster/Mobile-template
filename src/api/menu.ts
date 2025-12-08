import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '~/constants';

export interface MenuItem {
  id: number;
  name: string;
}

export const getMenu = async (): Promise<MenuItem[]> => {
  let token = await AsyncStorage.getItem('profileToken');
  if (!token) {
    token = await AsyncStorage.getItem('loginToken');
  }

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await axios.get<MenuItem[]>(`${API_URL}/client/menu`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
