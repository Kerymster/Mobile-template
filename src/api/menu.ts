import axios from 'axios';
import { API_URL } from '~/constants';
import { getAuthTokenOrThrow } from '../utils/auth';

export interface MenuItem {
  id: number;
  name: string;
}

export const getMenu = async (): Promise<MenuItem[]> => {
  const token = await getAuthTokenOrThrow();

  const response = await axios.get<MenuItem[]>(`${API_URL}/client/menu`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
