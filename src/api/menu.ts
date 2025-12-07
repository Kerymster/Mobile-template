import client from './client';

export interface MenuItem {
  id: number;
  name: string;
}

export const getMenu = async (): Promise<MenuItem[]> => {
  const response = await client.get<MenuItem[]>('/api/menu');
  return response.data;
};
