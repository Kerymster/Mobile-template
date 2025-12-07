import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import client from '../../src/api/client';

interface Banner {
  id: number;
  poster: string;
}

interface Category {
  id: number;
  name: string;
}

interface MenuDetail {
  id: number;
  name: string;
  banners: Banner[];
  categories: Category[];
}

export default function CategoryScreen() {
  const { menuId, menuName } = useLocalSearchParams<{
    menuId: string;
    menuName: string;
  }>();
  const [data, setData] = useState<MenuDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMenuDetail = async () => {
      try {
        const response = await client.get<MenuDetail>(`/api/menu/${menuId}`);
        setData(response.data);
      } catch (err) {
        console.log('Error fetching menu detail', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuDetail();
  }, [menuId]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  if (!data) return <Text>No data available</Text>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>
        {menuName}
      </Text>

      <FlatList
        horizontal
        data={data.banners}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Image
            source={{
              uri: `https://atlas.saatteknoloji.com.tr/${item.poster}`,
            }}
            style={{
              width: 200,
              height: 120,
              marginRight: 12,
              borderRadius: 6,
            }}
          />
        )}
        style={{ marginBottom: 16 }}
      />

      <FlatList
        data={data.categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/labels',
                params: { categoryId: item.id, categoryName: item.name },
              })
            }
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
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
