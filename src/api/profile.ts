import axios from 'axios';
import { API_URL } from '~/constants';
import { getAuthTokenOrThrow } from '../utils/auth';
import { Profile } from '../utils/types';

export const getProfiles = async (): Promise<Profile[]> => {
  const token = await getAuthTokenOrThrow();

  const response = await axios.get<Profile[]>(`${API_URL}/client/profiles`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.filter((p) => p.hasPin === false);
};

export const selectProfile = async (
  profileId: number
): Promise<{ token: string }> => {
  const token = await getAuthTokenOrThrow();

  const response = await axios.post<{ token: string }>(
    `${API_URL}/client/profiles/select`,
    {
      id: profileId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
