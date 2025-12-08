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

export interface Banner {
  id: number;
  poster: string;
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
