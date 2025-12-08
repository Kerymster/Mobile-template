import axios from 'axios';
import { API_URL } from '~/constants';
import { LoginResponse } from '~/utils/types';

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  // Validate inputs
  const trimmedUsername = username?.trim() || '';
  const trimmedPassword = password?.trim() || '';

  if (!trimmedUsername || !trimmedPassword) {
    throw new Error('Username and password are required');
  }

  const response = await axios.post<LoginResponse>(
    `${API_URL}/auth/user/login`,
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
