
import { Redirect } from 'expo-router';

export default function Index() {
  // For now, redirect to welcome screen
  // In production, check if user is authenticated and redirect accordingly
  const isAuthenticated = false; // This would come from your auth state

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/(home)" />;
  }

  return <Redirect href="/auth/welcome" />;
}
