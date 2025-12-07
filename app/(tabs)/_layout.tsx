import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name='home' />
      {/* Add more top-level tabs if needed */}
    </Tabs>
  );
}
