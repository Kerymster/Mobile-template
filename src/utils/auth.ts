import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthToken = async (): Promise<string | null> => {
  let token = await AsyncStorage.getItem('profileToken');
  if (!token) {
    token = await AsyncStorage.getItem('loginToken');
  }
  return token;
};

export const getAuthTokenOrThrow = async (): Promise<string> => {
  const token = await getAuthToken();
  if (!token) {
    throw new Error('No authentication token found');
  }
  return token;
};
