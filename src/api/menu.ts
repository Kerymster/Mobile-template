import { MenuItem } from '~/utils/types';
import client from './client';
import { ENDPOINTS } from './constants/endpoints';

export const getMenu = async (): Promise<MenuItem[]> => {
  const response = await client.get<MenuItem[]>(ENDPOINTS.MENU());

  return response.data;
};
