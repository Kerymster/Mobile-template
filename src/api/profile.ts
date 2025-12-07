import { Profile } from '../utils/types';
import client from './client';

export const getProfiles = async (): Promise<Profile[]> => {
  const response = await client.get<Profile[]>('/api/a2srv-client/profiles');
  // Only passwordless profiles
  return response.data.filter((p) => p.hasPin === false);
};

export const selectProfile = async (
  profileId: number
): Promise<{ token: string }> => {
  const response = await client.post('/api/a2srv-client/profiles/select', {
    id: profileId.toString(), // API expects string format
  });
  return response.data;
};
