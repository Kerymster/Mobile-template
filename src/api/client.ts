import axios from 'axios';
import { getAuthToken } from '../utils/auth';

const BASE_URL = 'https://atlas.saatteknoloji.com.tr';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
