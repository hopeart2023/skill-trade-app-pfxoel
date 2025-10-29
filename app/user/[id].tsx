
import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Platform,
  Image,
  Pressable,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/styles/commonStyles";
import { mockUsers } from "@/data/mockData";
import { useLocalSearchParams, router } from "expo-router";

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams();
  const user = mockUsers.find(u => u.id === id);

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>User not found</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backLink}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handleConnect = () => {
    Alert.alert(
      'Send Trade Request',
      `Send a skill trade request to ${user.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send Request', 
          onPress: () => {
            console.log('Trade request sent to:', user.name);
            Alert.alert('Success', 'Trade request sent!');
          }
        }
      ]
    );
  };

  const handleMessage = () => {
    console.log('Message user:', user.name);
    Alert.alert('Coming Soon', 'Messaging feature will be available soon!');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Back Button */}
        <View style={styles.header}>
          <Pressable 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </Pressable>
        </View>

        {/* Profile Header */}
        <LinearGradient
          colors={[colors.primary, colors.secondary, colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileHeader}
        >
          <Image 
            source={{ uri: user.profilePhoto }} 
            style={styles.avatar}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{user.name}</Text>
            {user.isOnline && (
              <View style={styles.onlineBadge}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>Online</Text>
              </View>
            )}
          </View>
          <Text style={styles.location}>📍 {user.location}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.tradesCompleted}</Text>
              <Text style={styles.statLabel}>Trades</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {user.skillsToTeach.length}
              </Text>
              <Text style={styles.statLabel}>Skills</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Bio */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="text.alignleft" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>About</Text>
          </View>
          <Text style={styles.bioText}>{user.bio}</Text>
        </View>

        {/* Skills They Can Teach */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="star.fill" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Can Teach</Text>
          </View>
          <View style={styles.skillsGrid}>
            {user.skillsToTeach.map(skill => (
              <View key={skill.id} style={styles.skillCard}>
                <LinearGradient
                  colors={[colors.primary, colors.secondary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.skillCardGradient}
                >
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <Text style={styles.skillLevel}>{skill.level}</Text>
                </LinearGradient>
              </View>
            ))}
          </View>
        </View>

        {/* Skills They Want to Learn */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="book.fill" size={20} color={colors.secondary} />
            <Text style={styles.sectionTitle}>Wants to Learn</Text>
          </View>
          <View style={styles.skillsGrid}>
            {user.skillsToLearn.map(skill => (
              <View key={skill.id} style={styles.skillCardSecondary}>
                <Text style={styles.skillNameSecondary}>{skill.name}</Text>
                <Text style={styles.skillLevelSecondary}>{skill.level}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable 
            style={styles.messageButton}
            onPress={handleMessage}
          >
            <IconSymbol name="message.fill" size={20} color={colors.primary} />
            <Text style={styles.messageButtonText}>Message</Text>
          </Pressable>

          <Pressable 
            style={styles.connectButton}
            onPress={handleConnect}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.connectButtonGradient}
            >
              <IconSymbol name="arrow.triangle.2.circlepath" size={20} color="#FFFFFF" />
              <Text style={styles.connectButtonText}>Send Trade Request</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
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
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  backLink: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },

  // Profile Header
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
    boxShadow: '0px 8px 24px rgba(255, 112, 67, 0.3)',
    elevation: 8,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: colors.backgroundAlt,
    marginBottom: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  onlineText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  location: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
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
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  bioText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
  },

  // Skills Grid
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillCard: {
    borderRadius: 12,
    overflow: 'hidden',
    minWidth: '45%',
    flex: 1,
  },
  skillCardGradient: {
    padding: 16,
    minHeight: 80,
    justifyContent: 'center',
  },
  skillName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  skillLevel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    textTransform: 'capitalize',
  },
  skillCardSecondary: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    minHeight: 80,
    justifyContent: 'center',
    minWidth: '45%',
    flex: 1,
    borderWidth: 2,
    borderColor: colors.border,
  },
  skillNameSecondary: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  skillLevelSecondary: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },

  // Actions
  actionsContainer: {
    marginHorizontal: 20,
    gap: 12,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  connectButton: {
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(255, 112, 67, 0.3)',
    elevation: 4,
  },
  connectButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  connectButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
