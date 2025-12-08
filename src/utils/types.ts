export interface Profile {
  id: number;
  name: string;
  posterName: string;
  kid: boolean;
  hasPin: boolean;
  deviceQuota: number | null;
  main: boolean;
}

export interface MenuItem {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Label {
  id: number;
  name: string;
}

export interface ContentItem {
  id: number;
  poster: string;
  title?: string;
  name?: string;
}

export interface LoginResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  not_before_policy: number;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  session_state: string;
  token_type: string;
}

export type ProfilesResponse = Profile[];

export interface ProfilesApiResponse {
  data: Profile[];
}

interface person {
  name: string;
  id: number;
}

export interface IPoster {
  type: string;
  url: string;
  vertical: boolean;
}
export interface Banner {
  actors: person[];
  country: string;
  director: person[];
  duration: number;
  genre: string[];
  id: number;
  imdbRating: number;
  originalTitle: string;
  posters: IPoster[];
  summary: string;
  summaryLong: string;
  title: string;
  trailerUrl: string;
  year: number;
  type: string;
}

export interface BannerAndCategoriesResponse {
  banners: Banner[];
  categories: Category[];
  id: number;
  name: string;
}
