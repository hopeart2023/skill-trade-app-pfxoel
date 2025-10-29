
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { 
  ScrollView, 
  Pressable, 
  StyleSheet, 
  View, 
  Text, 
  Platform,
  Image,
  Dimensions 
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, commonStyles } from "@/styles/commonStyles";
import { mockUsers, skillCategories, currentUser } from "@/data/mockData";
import { User } from "@/types";

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

export default function HomeScreen() {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredUsers = selectedCategory
    ? mockUsers.filter(user => 
        user.skillsToTeach.some(skill => skill.category === selectedCategory)
      )
    : mockUsers;

  const renderSkillCard = (category: typeof skillCategories[0]) => (
    <Pressable
      key={category.id}
      onPress={() => setSelectedCategory(
        selectedCategory === category.id ? null : category.id
      )}
      style={[
        styles.skillCard,
        selectedCategory === category.id && styles.skillCardSelected
      ]}
    >
      <LinearGradient
        colors={
          selectedCategory === category.id 
            ? [category.color, category.color + 'DD'] 
            : [colors.card, colors.card]
        }
        style={styles.skillCardGradient}
      >
        <Text style={styles.skillCardIcon}>{category.icon}</Text>
        <Text style={[
          styles.skillCardText,
          selectedCategory === category.id && styles.skillCardTextSelected
        ]}>
          {category.name}
        </Text>
      </LinearGradient>
    </Pressable>
  );

  const renderUserCard = (user: User) => (
    <Pressable 
      key={user.id} 
      style={styles.userCard}
      onPress={() => router.push(`/user/${user.id}`)}
    >
      <View style={styles.userCardHeader}>
        <Image 
          source={{ uri: user.profilePhoto }} 
          style={styles.userAvatar}
        />
        <View style={styles.userInfo}>
          <View style={styles.userNameRow}>
            <Text style={styles.userName}>{user.name}</Text>
            {user.isOnline && <View style={styles.onlineDot} />}
          </View>
          <Text style={styles.userLocation} numberOfLines={1}>
            📍 {user.location}
          </Text>
          <View style={styles.userStats}>
            <Text style={styles.userRating}>⭐ {user.rating}</Text>
            <Text style={styles.userTrades}>
              {user.tradesCompleted} trades
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.userBio} numberOfLines={2}>
        {user.bio}
      </Text>

      <View style={styles.skillsSection}>
        <Text style={styles.skillsSectionTitle}>Can Teach:</Text>
        <View style={styles.skillTags}>
          {user.skillsToTeach.slice(0, 3).map(skill => (
            <View key={skill.id} style={styles.skillTag}>
              <Text style={styles.skillTagText}>{skill.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.skillsSection}>
        <Text style={styles.skillsSectionTitle}>Wants to Learn:</Text>
        <View style={styles.skillTags}>
          {user.skillsToLearn.slice(0, 3).map(skill => (
            <View key={skill.id} style={[styles.skillTag, styles.skillTagSecondary]}>
              <Text style={[styles.skillTagText, styles.skillTagTextSecondary]}>
                {skill.name}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.connectButton}
      >
        <Text style={styles.connectButtonText}>Connect & Trade</Text>
      </LinearGradient>
    </Pressable>
  );

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => console.log('Notifications pressed')}
      style={styles.headerButton}
    >
      <IconSymbol name="bell.fill" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "SkillTrade",
            headerRight: renderHeaderRight,
            headerLargeTitle: true,
          }}
        />
      )}
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Section */}
          <LinearGradient
            colors={[colors.primary, colors.secondary, colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.welcomeCard}
          >
            <Text style={styles.welcomeTitle}>Welcome back, {currentUser.name}! 👋</Text>
            <Text style={styles.welcomeSubtitle}>
              Ready to trade skills today?
            </Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{currentUser.tradesCompleted}</Text>
                <Text style={styles.statLabel}>Trades</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{currentUser.rating}</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{mockUsers.length}</Text>
                <Text style={styles.statLabel}>Nearby</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Skill Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Explore Skills</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.skillCardsContainer}
            >
              {skillCategories.map(renderSkillCard)}
            </ScrollView>
          </View>

          {/* Nearby Skill Traders */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {selectedCategory 
                  ? `${skillCategories.find(c => c.id === selectedCategory)?.name} Traders`
                  : 'Nearby Skill Traders'
                }
              </Text>
              <Text style={styles.sectionCount}>{filteredUsers.length}</Text>
            </View>
            {filteredUsers.map(renderUserCard)}
          </View>

          {/* Recommended Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <Text style={styles.sectionSubtitle}>
              Based on your skills and interests
            </Text>
            {mockUsers.slice(0, 2).map(renderUserCard)}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  headerButton: {
    padding: 8,
    marginRight: 8,
  },
  
  // Welcome Card
  welcomeCard: {
    margin: 20,
    padding: 24,
    borderRadius: 20,
    boxShadow: '0px 8px 24px rgba(255, 112, 67, 0.3)',
    elevation: 8,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
  },

  // Sections
  section: {
    marginBottom: 24,
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
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: -8,
  },
  sectionCount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    backgroundColor: colors.highlight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  // Skill Cards
  skillCardsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  skillCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
  },
  skillCardSelected: {
    transform: [{ scale: 1.05 }],
  },
  skillCardGradient: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    minWidth: 120,
    borderRadius: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  skillCardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  skillCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  skillCardTextSelected: {
    color: '#FFFFFF',
  },

  // User Cards
  userCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  userCardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  userAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    backgroundColor: colors.backgroundAlt,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginRight: 8,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
  },
  userLocation: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  userStats: {
    flexDirection: 'row',
    gap: 12,
  },
  userRating: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  userTrades: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  userBio: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 16,
  },

  // Skills Section
  skillsSection: {
    marginBottom: 12,
  },
  skillsSectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: colors.highlight,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.primary + '40',
  },
  skillTagSecondary: {
    backgroundColor: colors.backgroundAlt,
    borderColor: colors.border,
  },
  skillTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  skillTagTextSecondary: {
    color: colors.textSecondary,
  },

  // Connect Button
  connectButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(255, 112, 67, 0.3)',
    elevation: 4,
  },
  connectButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
