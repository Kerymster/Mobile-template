import { API_URL } from '~/constants';

export const ENDPOINTS = {
  //Auth endpoints
  LOGIN: () => `${API_URL}/auth/user/login`,

  //Client endpoints
  PROFILES: () => `${API_URL}/client/profiles`,
  SELECT_PROFILE: () => `${API_URL}/client/profiles/select`,

  //Menu endpoints
  MENU: () => `${API_URL}/client/menu`,

  //Banner and categories endpoints
  BANNER_AND_CATEGORIES: (menuId: string) => `${API_URL}/client/menu/${menuId}`,
  CATEGORY: (categoryId: string) => `${API_URL}/client/category/${categoryId}`,
  MEDIA_LIST: (labelId: string, page: number, size: number) =>
    `${API_URL}/client/label/${labelId}?page=${page}&size=${size}`,
};
