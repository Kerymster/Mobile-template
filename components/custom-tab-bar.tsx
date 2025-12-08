import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabItem {
  name: string;
  label: string;
  route: string;
  icon?: string;
}

const tabs: TabItem[] = [
  { name: 'home', label: 'Anasayfa', route: '/(tabs)/home' },
  { name: 'search', label: 'Arama', route: '/(tabs)/search' },
  { name: 'live-tv', label: 'Canlı TV', route: '/(tabs)/live-tv' },
  { name: 'account', label: 'Hesabım', route: '/(tabs)/account' },
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
  tabLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  tabLabelFocused: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
