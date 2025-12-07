export interface Profile {
  id: number;
  name: string;
  hasPin: boolean;
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
  token: string;
}
