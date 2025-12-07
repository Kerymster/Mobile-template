import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getMenu, MenuItem } from '../../src/api/menu';
import { ProfileContext } from '../../src/context/ProfileContext';

export default function HomeScreen() {
  const { selectedProfile } = useContext(ProfileContext);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        if (!selectedProfile) return; // safety check
        const data = await getMenu();
        setMenuItems(data);
      } catch (err) {
        console.log('Error fetching menu', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [selectedProfile]);

  const handleMenuPress = (menu: MenuItem) => {
    router.push({
      pathname: '/(tabs)/category',
      params: {
        menuId: menu.id.toString(),
        menuName: menu.name,
      },
    });
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
        Welcome, {selectedProfile?.name || 'User'}
      </Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleMenuPress(item)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    borderRadius: 6,
  },
});
