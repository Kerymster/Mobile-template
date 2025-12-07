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
          title: 'Home',
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
