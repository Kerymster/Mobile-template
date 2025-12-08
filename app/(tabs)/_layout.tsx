import { Tabs } from 'expo-router';
import { CustomTabBar } from '../../components/custom-tab-bar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Anasayfa',
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Arama',
        }}
      />
      <Tabs.Screen
        name='live-tv'
        options={{
          title: 'Canlı TV',
        }}
      />
      <Tabs.Screen
        name='account'
        options={{
          title: 'Hesabım',
        }}
      />
      <Tabs.Screen
        name='category'
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name='labels'
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
