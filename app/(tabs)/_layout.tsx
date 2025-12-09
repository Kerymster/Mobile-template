import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { CustomTabBar } from '../../src/components/common/custom-tab-bar';
import { HeaderLogo } from '../../src/components/common/header-logo';

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <HeaderLogo />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
