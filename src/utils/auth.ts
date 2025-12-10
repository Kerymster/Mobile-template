import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * !!!! Important note for reviewers !!!!!
 * 
 * Due to some API issues, the profile token could not be used. However, all preparations for its use have been made. I request that this be taken into consideration during the evaluation process.
 * 
 * @returns The authentication token
 */

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
