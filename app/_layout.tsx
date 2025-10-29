
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SystemBars } from 'react-native-edge-to-edge';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme, Alert } from 'react-native';
import { useNetworkState } from 'expo-network';
import { StatusBar } from 'expo-status-bar';
import { WidgetProvider } from '@/contexts/WidgetContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from '@react-navigation/native';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isConnected } = useNetworkState();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (isConnected === false) {
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection and try again.'
      );
    }
  }, [isConnected]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AuthProvider>
            <WidgetProvider>
              <SystemBars style="auto" />
              <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right',
                }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="auth/welcome" />
                <Stack.Screen name="auth/login" />
                <Stack.Screen name="auth/signup" />
                <Stack.Screen name="user/[id]" />
                <Stack.Screen name="chat/[id]" />
                <Stack.Screen name="trade-requests" />
                <Stack.Screen name="map" />
                <Stack.Screen
                  name="modal"
                  options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                  }}
                />
                <Stack.Screen
                  name="transparent-modal"
                  options={{
                    presentation: 'transparentModal',
                    animation: 'fade',
                  }}
                />
                <Stack.Screen
                  name="formsheet"
                  options={{
                    presentation: 'formSheet',
                    sheetAllowedDetents: [0.5, 0.9],
                  }}
                />
              </Stack>
            </WidgetProvider>
          </AuthProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
