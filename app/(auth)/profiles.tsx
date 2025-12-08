import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { getProfiles, selectProfile } from '../../src/api/profile';
import { ProfileContext } from '../../src/context/ProfileContext';
import { Profile } from '../../src/utils/types';

export default function ProfileSelectionScreen() {
  const { setProfileToken, setSelectedProfile } = useContext(ProfileContext);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getProfiles();
        setProfiles(data);
      } catch (err) {
        console.log('Error fetching profiles', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const handleSelectProfile = async (profile: Profile) => {
    try {
      const data = await selectProfile(profile.id);
      setProfileToken(data.token);
      setSelectedProfile(profile);
      //await AsyncStorage.setItem('profileToken', data.token);

      router.push('/(tabs)/home'); 
    } catch (err) {
      console.log('Error selecting profile', err);
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <FlatList
      data={profiles}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleSelectProfile(item)}
        >
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    borderRadius: 4,
  },
});
