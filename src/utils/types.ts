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

export interface LabelWithMedia extends Label {
  media: Content[];
  loading: boolean;
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

interface Poster {
  url: string;
  vertical?: boolean;
  banner?: boolean;
  mobileBanner?: boolean;
  type: string;
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
  posters: Poster[];
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

export interface Content {
  id: number;
  posters: Poster[];
  title: string;
  year: number;
  type: 'MOVIE' | 'SERIES';
  description: string;
  trailerUrl?: string;
  duration: number;
}

export interface LabelsResponse {
  id: number;
  name: string;
  type: 'STATIC' | 'DYNAMIC';
  labelType: string | null;
  contents: Content[];
  totalContents: number;
  totalPages: number;
  vertical: boolean;
}

export interface TabItem {
  name: string;
  label: string;
  route: string;
  IconComponent: React.ComponentType<{
    width?: number;
    height?: number;
    color?: string;
  }>;
}

export interface CategoryDetailResponse {
  id: number;
  name: string;
  labels: Label[];
}
