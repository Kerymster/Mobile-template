import {
  RelativePathString,
  useLocalSearchParams,
  usePathname,
  useRouter,
} from 'expo-router';
import { useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ROUTES } from '~/constants/routes';
import { MenuContext } from '../../../src/context/MenuContext';

export function TopMenuBar() {
  const { menuItems } = useContext(MenuContext);
  const router = useRouter();
  const pathname = usePathname();
  const params = useLocalSearchParams<{ menuId?: string | string[] }>();

  if (menuItems.length === 0) {
    return null;
  }

  const isCategoryScreen = pathname?.includes('/category');
  const currentMenuId = isCategoryScreen
    ? Array.isArray(params.menuId)
      ? params.menuId[0]
      : params.menuId
    : null;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {menuItems.map((item) => {
          const isActive =
            isCategoryScreen && currentMenuId === item.id.toString();
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
              onPress={() => {
                router.push({
                  pathname: ROUTES.CATEGORY as RelativePathString,
                  params: {
                    menuId: item.id.toString(),
                    menuName: item.name,
                  },
                });
              }}
            >
              <Text
                style={[styles.menuLabel, isActive && styles.menuLabelFocused]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  menuItemActive: {
    backgroundColor: '#f0f0f0',
  },
  menuLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  menuLabelFocused: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
