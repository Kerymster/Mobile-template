import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabItem } from '~/utils/types';
import ProductsIcon from '../../../assets/icons/products.svg';
import SearchIcon from '../../../assets/icons/search.svg';
import TabBarHomeIcon from '../../../assets/icons/tabbar-home.svg';
import TabBarUserIcon from '../../../assets/icons/tabbar-user.svg';

const tabs: TabItem[] = [
  {
    name: 'home',
    label: 'Anasayfa',
    route: '/(tabs)/home',
    IconComponent: TabBarHomeIcon,
  },
  {
    name: 'search',
    label: 'Arama',
    route: '/(tabs)/search',
    IconComponent: SearchIcon,
  },
  {
    name: 'live-tv',
    label: 'Canlı TV',
    route: '/(tabs)/live-tv',
    IconComponent: ProductsIcon,
  },
  {
    name: 'account',
    label: 'Hesabım',
    route: '/(tabs)/account',
    IconComponent: TabBarUserIcon,
  },
];

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}
    >
      {tabs.map((tab) => {
        const route = state.routes.find((r) => r.name === tab.name);
        if (!route) return null;

        const { options } = descriptors[route.key];
        const isFocused =
          state.index === state.routes.findIndex((r) => r.name === tab.name);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            router.push(tab.route as any);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const Icon = tab.IconComponent;
        const iconColor = isFocused ? '#007AFF' : '#666';

        return (
          <TouchableOpacity
            key={tab.name}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel || tab.label}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            <View style={styles.iconContainer}>
              <Icon width={24} height={24} color={iconColor} />
            </View>
            <Text
              style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}
            >
              {tab.label}
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
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    color: '#666',
  },
  tabLabelFocused: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
