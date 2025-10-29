
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { supabase } from '@/app/integrations/supabase/client';
import { Profile } from '@/types/database';

export default function MapScreen() {
  const [nearbyUsers, setNearbyUsers] = useState<Profile[]>([]);

  useEffect(() => {
    loadNearbyUsers();
  }, []);

  const loadNearbyUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)
        .limit(20);

      if (error) throw error;
      setNearbyUsers(data || []);
    } catch (error) {
      console.error('Error loading nearby users:', error);
    }
  };

  const renderUserCard = (user: Profile) => (
    <Pressable
      key={user.id}
      style={styles.userCard}
      onPress={() => router.push(`/user/${user.user_id}`)}
    >
      {user.avatar_url ? (
        <Image source={{ uri: user.avatar_url }} style={styles.userAvatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <IconSymbol name="person.fill" size={32} color={colors.textSecondary} />
        </View>
      )}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        {user.location && (
          <View style={styles.locationRow}>
            <IconSymbol name="location.fill" size={14} color={colors.textSecondary} />
            <Text style={styles.locationText}>{user.location}</Text>
          </View>
        )}
        <View style={styles.ratingRow}>
          <IconSymbol name="star.fill" size={14} color={colors.warning} />
          <Text style={styles.ratingText}>{user.rating.toFixed(1)}</Text>
          <Text style={styles.tradesText}>• {user.trades_completed} trades</Text>
        </View>
      </View>
      <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Nearby Skill Traders</Text>
          <Pressable style={styles.filterButton}>
            <IconSymbol name="slider.horizontal.3" size={24} color={colors.text} />
          </Pressable>
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapPlaceholder}>
          <IconSymbol name="map.fill" size={64} color={colors.textSecondary} />
          <Text style={styles.mapPlaceholderTitle}>Interactive Map Coming Soon</Text>
          <Text style={styles.mapPlaceholderText}>
            react-native-maps is not currently supported in Natively.
            {'\n'}
            We&apos;re working on adding map support soon!
          </Text>
          <Text style={styles.mapPlaceholderSubtext}>
            In the meantime, browse nearby skill traders below.
          </Text>
        </View>

        {/* Nearby Users List */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Nearby Skill Traders</Text>
          <Text style={styles.listCount}>{nearbyUsers.length} found</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {nearbyUsers.map(renderUserCard)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  filterButton: {
    padding: 8,
  },
  mapPlaceholder: {
    backgroundColor: colors.card,
    margin: 20,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  mapPlaceholderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  mapPlaceholderText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
  mapPlaceholderSubtext: {
    fontSize: 12,
    color: colors.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  listCount: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background,
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  tradesText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
