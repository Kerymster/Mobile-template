import { RelativePathString, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ROUTES } from '~/constants/routes';
import ProfileChildIcon from '../../assets/icons/profile-child.svg';
import ProfileDefaultIcon from '../../assets/icons/profile-default.svg';
import { getProfiles, selectProfile } from '../../src/api/profile';
import { ProfileContext } from '../../src/context/ProfileContext';
import { Profile } from '../../src/utils/types';

export default function ProfileSelectionScreen() {
  const { setProfileToken, setSelectedProfile } = useContext(ProfileContext);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProfiles = async () => {
    try {
      const data = await getProfiles();
      setProfiles(data);
    } catch {
      Alert.alert('Error fetching profiles', 'Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleSelectProfile = async (profile: Profile) => {
    try {
      const data = await selectProfile(profile.id);
      setProfileToken(data.token);
      setSelectedProfile(profile);
      //await AsyncStorage.setItem('profileToken', data.token);

      router.push(ROUTES.HOME as RelativePathString);
    } catch {
      Alert.alert('Error selecting profile', 'Please try again later.');
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  const icons = [ProfileDefaultIcon, ProfileChildIcon];

  return (
    <FlatList
      data={profiles}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.column}
      ListHeaderComponent={
        <Text style={styles.title}>Select your profile</Text>
      }
      ListHeaderComponentStyle={styles.header}
      renderItem={({ item, index }) => {
        const Icon = icons[index % icons.length];

        return (
          <TouchableOpacity
            onPress={() => !item.hasPin && handleSelectProfile(item)}
            disabled={item.hasPin}
            style={[styles.card, item.hasPin && styles.cardDisabled]}
            activeOpacity={0.85}
          >
            <View style={styles.iconWrapper}>
              <Icon width={72} height={72} />
            </View>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            {item.hasPin && <Text style={styles.locked}>Locked</Text>}
          </TouchableOpacity>
        );
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  column: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
    gap: 12,
  },
  cardDisabled: {
    opacity: 0.55,
  },
  iconWrapper: {
    width: 88,
    height: 88,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  locked: {
    fontSize: 12,
    color: '#8C8C8C',
  },
});
