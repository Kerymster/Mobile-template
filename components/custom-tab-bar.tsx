import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { usePathname, useRouter } from 'expo-router';
import { useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MenuContext } from '../src/context/MenuContext';

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { menuItems } = useContext(MenuContext);
  const router = useRouter();
  const pathname = usePathname();

  if (menuItems.length > 0) {
    const currentRoute = state.routes[state.index];
    const isCategoryScreen = pathname?.includes('/category');
    const currentMenuId = (currentRoute.params as { menuId?: string })?.menuId;

    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <TouchableOpacity
            style={[
              styles.tabItem,
              pathname === '/(tabs)/home' && styles.tabItemActive,
            ]}
            onPress={() => {
              router.push('/(tabs)/home');
            }}
          >
            <Text
              style={[
                styles.tabLabel,
                pathname === '/(tabs)/home' && styles.tabLabelFocused,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          {menuItems.map((item) => {
            const isActive =
              isCategoryScreen && currentMenuId === item.id.toString();
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.tabItem, isActive && styles.tabItemActive]}
                onPress={() => {
                  router.push({
                    pathname: '/(tabs)/category',
                    params: {
                      menuId: item.id.toString(),
                      menuName: item.name,
                    },
                  });
                }}
              >
                <Text
                  style={[styles.tabLabel, isActive && styles.tabLabelFocused]}
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

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            const routePath = `/(tabs)/${route.name}`;
            if (route.params && Object.keys(route.params).length > 0) {
              router.push({
                pathname: routePath as any,
                params: route.params as Record<string, any>,
              });
            } else {
              router.push(routePath as any);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            <Text
              style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}
            >
              {typeof label === 'string' ? label : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 80,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  tabItemActive: {
    backgroundColor: '#f0f0f0',
  },
  tabLabel: {
    fontSize: 14,
    color: '#666',
  },
  tabLabelFocused: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
