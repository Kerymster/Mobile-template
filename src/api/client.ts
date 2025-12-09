import axios, { type AxiosRequestHeaders } from 'axios';
import { API_URL } from '~/constants';
import { getAuthTokenOrThrow } from '../utils/auth';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

client.interceptors.request.use(async (config) => {
  const token = await getAuthTokenOrThrow();

  const headers = (config.headers ?? {}) as AxiosRequestHeaders;

  headers.Accept = 'application/json';
  headers['Content-Type'] = 'application/json';
  headers.Authorization = `Bearer ${token}`;

  config.headers = headers;

  return config;
});

export default client;
