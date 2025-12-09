import { Profile, ProfilesResponse } from '../utils/types';
import { ENDPOINTS } from './constants/endpoints';
import client from './client';

export const getProfiles = async (): Promise<Profile[]> => {
  const response = await client.get<ProfilesResponse>(ENDPOINTS.PROFILES());

  return response.data;
};

export const selectProfile = async (
  profileId: number
): Promise<{ token: string }> => {
  const response = await client.post<{ token: string }>(
    ENDPOINTS.SELECT_PROFILE(),
    {
      id: profileId,
    }
  );

  return response.data;
};
