import axios from 'axios';
import { LoginResponse } from '~/utils/types';
import { ENDPOINTS } from './constants/endpoints';

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const trimmedUsername = username?.trim() || '';
  const trimmedPassword = password?.trim() || '';

  if (!trimmedUsername || !trimmedPassword) {
    throw new Error('Username and password are required');
  }

  const response = await axios.post<LoginResponse>(
    ENDPOINTS.LOGIN(),
    {
      username: trimmedUsername,
      password: trimmedPassword,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Content-Length': '52',
      },
    }
  );

  return response.data;
};
