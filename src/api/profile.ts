import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '~/constants';
import { Profile } from '../utils/types';

export const getProfiles = async (): Promise<Profile[]> => {
  // Get token from AsyncStorage
  let token = await AsyncStorage.getItem('profileToken');
  if (!token) {
    token = await AsyncStorage.getItem('loginToken');
  }

  if (!token) {
    throw new Error('No authentication token found');
  }

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
  let token = await AsyncStorage.getItem('profileToken');
  if (!token) {
    token = await AsyncStorage.getItem('loginToken');
  }

  if (!token) {
    throw new Error('No authentication token found');
  }

  console.log('selectProfile token', token);
  console.log('selectProfile profileId', profileId);
  console.log('selectProfile API_URL', `${API_URL}/client/profiles/select`);

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

  console.log('selectProfile response', response.status);

  return response.data;
};
