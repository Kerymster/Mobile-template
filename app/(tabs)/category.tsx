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
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopMenuBar } from '../../components/top-menu-bar';
import { getBannerAndCategories } from '../../src/api/categories';
import { Banner, Category } from '../../src/utils/types';

export default function CategoryScreen() {
  const params = useLocalSearchParams<{
    menuId: string | string[];
    menuName: string | string[];
  }>();
  // Handle array case from useLocalSearchParams
  const menuId = Array.isArray(params.menuId)
    ? params.menuId[0]
    : params.menuId;
  const menuName = Array.isArray(params.menuName)
    ? params.menuName[0]
    : params.menuName;

  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBannerAndCategories = async () => {
      try {
        const data = await getBannerAndCategories(menuId);
        setBanners(data.banners);
        setCategories(data.categories);
      } catch (err) {
        console.log('Error fetching banner and categories', err);
      } finally {
        setLoading(false);
      }
    };

    if (menuId) {
      fetchBannerAndCategories();
    }
  }, [menuId]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <TopMenuBar />
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>
          {menuName}
        </Text>

        {banners.length > 0 && (
          <FlatList
            horizontal
            data={banners}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const horizontalPoster = item.posters?.find(
                (poster) => poster.vertical === false
              );
              const posterUrl = horizontalPoster?.url || item.posters?.[0]?.url;
              if (!posterUrl) return null;
              return (
                <Image
                  source={{
                    uri: posterUrl,
                  }}
                  style={styles.bannerImage}
                />
              );
            }}
            style={{ marginBottom: 16 }}
            showsHorizontalScrollIndicator={false}
          />
        )}

        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/labels',
                  params: {
                    categoryId: item.id.toString(),
                    categoryName: item.name,
                  },
                })
              }
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
    </SafeAreaView>
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
  bannerImage: {
    width: 200,
    height: 120,
    marginRight: 12,
    borderRadius: 6,
  },
});
