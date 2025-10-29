
import React, { useState } from 'react';
import {
  ScrollView,
  Pressable,
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { mockUsers, skillCategories, currentUser } from '@/data/mockData';
import { colors, commonStyles } from '@/styles/commonStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { User } from '@/types';

const CARD_WIDTH = Dimensions.get('window').width - 80;

export default function HomeScreen() {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const renderHeaderRight = () => (
    <View style={styles.headerRight}>
      <Pressable style={styles.headerButton} onPress={() => router.push('/trade-requests')}>
        <IconSymbol name="arrow.left.arrow.right" size={24} color={colors.text} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>3</Text>
        </View>
      </Pressable>
      <Pressable style={styles.headerButton} onPress={() => router.push('/map')}>
        <IconSymbol name="map" size={24} color={colors.text} />
      </Pressable>
    </View>
  );

  const renderSkillCard = (category: typeof skillCategories[0]) => (
    <Pressable
      key={category.id}
      style={[
        styles.skillCard,
        selectedCategory === category.id && styles.skillCardSelected,
      ]}
      onPress={() =>
        setSelectedCategory(selectedCategory === category.id ? null : category.id)
      }
    >
      <LinearGradient
        colors={category.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.skillCardGradient}
      >
        <Text style={styles.skillIcon}>{category.icon}</Text>
        <Text style={styles.skillName}>{category.name}</Text>
        <Text style={styles.skillCount}>{category.count} traders</Text>
      </LinearGradient>
    </Pressable>
  );

  const renderUserCard = (user: User) => (
    <Pressable
      key={user.id}
      style={styles.userCard}
      onPress={() => router.push(`/user/${user.id}`)}
    >
      <Image source={{ uri: user.profilePhoto }} style={styles.userPhoto} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userBio} numberOfLines={2}>
          {user.bio}
        </Text>
        <View style={styles.userStats}>
          <View style={styles.statItem}>
            <IconSymbol name="star.fill" size={14} color={colors.warning} />
            <Text style={styles.statText}>{user.rating}</Text>
          </View>
          <View style={styles.statItem}>
            <IconSymbol name="checkmark.circle.fill" size={14} color={colors.success} />
            <Text style={styles.statText}>{user.tradesCompleted} trades</Text>
          </View>
        </View>
        <View style={styles.skillTags}>
          {user.skillsToTeach.slice(0, 2).map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillTagText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'SkillTrade',
          headerRight: renderHeaderRight,
          headerStyle: {
            backgroundColor: theme.dark ? colors.background : colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 24,
          },
        }}
      />
      <ScrollView
        style={[commonStyles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.welcomeName}>{currentUser.name}! 👋</Text>
          <Text style={styles.welcomeSubtext}>
            Ready to trade some skills today?
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Pressable style={styles.quickAction} onPress={() => router.push('/trade-requests')}>
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.quickActionGradient}
            >
              <IconSymbol name="arrow.left.arrow.right" size={28} color="#FFFFFF" />
              <Text style={styles.quickActionText}>Trade Requests</Text>
              <View style={styles.quickActionBadge}>
                <Text style={styles.quickActionBadgeText}>3</Text>
              </View>
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.quickAction} onPress={() => router.push('/map')}>
            <LinearGradient
              colors={[colors.secondary, colors.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.quickActionGradient}
            >
              <IconSymbol name="map.fill" size={28} color="#FFFFFF" />
              <Text style={styles.quickActionText}>Nearby Traders</Text>
            </LinearGradient>
          </Pressable>
        </View>

        {/* Skill Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Skills</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.skillsScroll}
          >
            {skillCategories.map(renderSkillCard)}
          </ScrollView>
        </View>

        {/* Recommended Traders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <Pressable onPress={() => router.push('/explore')}>
              <Text style={styles.seeAllText}>See All</Text>
            </Pressable>
          </View>
          {mockUsers.slice(0, 3).map(renderUserCard)}
        </View>

        {/* Nearby Traders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Skill Traders</Text>
            <Pressable onPress={() => router.push('/map')}>
              <Text style={styles.seeAllText}>View Map</Text>
            </Pressable>
          </View>
          {mockUsers.slice(3, 6).map(renderUserCard)}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
    marginRight: 8,
  },
  headerButton: {
    position: 'relative',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  welcomeName: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 32,
  },
  quickAction: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0px 4px 16px rgba(255, 112, 67, 0.3)',
    elevation: 4,
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
    textAlign: 'center',
  },
  quickActionBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  quickActionBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  skillsScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  skillCard: {
    width: 140,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
  },
  skillCardSelected: {
    transform: [{ scale: 0.95 }],
  },
  skillCardGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  skillName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  skillCount: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    gap: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userPhoto: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: colors.background,
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
  userBio: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 18,
  },
  userStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillTag: {
    backgroundColor: colors.highlight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  skillTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },
});
