
import React from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      route: '/(tabs)/(home)',
      label: 'Home',
      icon: 'house.fill',
    },
    {
      route: '/(tabs)/explore',
      label: 'Explore',
      icon: 'magnifyingglass',
    },
    {
      route: '/(tabs)/messages',
      label: 'Messages',
      icon: 'message.fill',
    },
    {
      route: '/(tabs)/profile',
      label: 'Profile',
      icon: 'person.fill',
    },
  ];

  if (Platform.OS === 'ios') {
    return (
      <>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(home)" />
          <Stack.Screen name="explore" />
          <Stack.Screen name="messages" />
          <Stack.Screen name="profile" />
        </Stack>
        <FloatingTabBar tabs={tabs} />
      </>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" />
        <Stack.Screen name="explore" />
        <Stack.Screen name="messages" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
