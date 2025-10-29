
import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function Index() {
  const { session, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Initializing SkillTrade..." />;
  }

  if (session) {
    return <Redirect href="/(tabs)/(home)" />;
  }

  return <Redirect href="/auth/welcome" />;
}
