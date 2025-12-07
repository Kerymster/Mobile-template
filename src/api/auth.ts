import client from './client';

interface LoginResponse {
  token: string;
}

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await client.post('/api/a2srv-client/auth/login', {
    username,
    password,
  });

  return response.data;
};
