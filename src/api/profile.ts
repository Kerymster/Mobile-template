import axios from 'axios';
import { getAuthTokenOrThrow } from '../utils/auth';
import { Profile, ProfilesResponse } from '../utils/types';
import { ENDPOINTS } from './constants/endpoints';

export const getProfiles = async (): Promise<Profile[]> => {
  const token = await getAuthTokenOrThrow();

  const response = await axios.get<ProfilesResponse>(ENDPOINTS.PROFILES(), {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const selectProfile = async (
  profileId: number
): Promise<{ token: string }> => {
  const token = await getAuthTokenOrThrow();

  const response = await axios.post<{ token: string }>(
    ENDPOINTS.SELECT_PROFILE(),
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
