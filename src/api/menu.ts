import client from './client';
import { ENDPOINTS } from './constants/endpoints';

export interface MenuItem {
  id: number;
  name: string;
}

export const getMenu = async (): Promise<MenuItem[]> => {
  const response = await client.get<MenuItem[]>(ENDPOINTS.MENU());

  return response.data;
};
