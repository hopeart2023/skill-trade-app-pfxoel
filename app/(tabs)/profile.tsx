
import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Platform,
  Image,
  Pressable,
  TextInput,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { LinearGradient } from "expo-linear-gradient";
import { colors, commonStyles } from "@/styles/commonStyles";
import { currentUser, popularSkills } from "@/data/mockData";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [location, setLocation] = useState(currentUser.location);
  const [profilePhoto, setProfilePhoto] = useState(currentUser.profilePhoto);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
      console.log('Profile photo updated:', result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
    console.log('Profile saved:', { name, bio, location });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header with Gradient */}
        <LinearGradient
          colors={[colors.primary, colors.secondary, colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileHeader}
        >
          <Pressable onPress={pickImage} style={styles.avatarContainer}>
            <Image 
              source={{ uri: profilePhoto }} 
              style={styles.avatar}
            />
            <View style={styles.editAvatarBadge}>
              <IconSymbol name="camera.fill" size={16} color="#FFFFFF" />
            </View>
          </Pressable>

          {isEditing ? (
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor="#FFFFFF80"
            />
          ) : (
            <Text style={styles.name}>{name}</Text>
          )}

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{currentUser.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{currentUser.tradesCompleted}</Text>
              <Text style={styles.statLabel}>Trades</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {currentUser.skillsToTeach.length}
              </Text>
              <Text style={styles.statLabel}>Skills</Text>
            </View>
          </View>

          <Pressable 
            style={styles.editButton}
            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </Text>
          </Pressable>
        </LinearGradient>

        {/* Bio Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="text.alignleft" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>About Me</Text>
          </View>
          {isEditing ? (
            <TextInput
              style={styles.bioInput}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell others about yourself..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={3}
            />
          ) : (
            <Text style={styles.bioText}>{bio}</Text>
          )}
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="location.fill" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Location</Text>
          </View>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Your location"
              placeholderTextColor={colors.textSecondary}
            />
          ) : (
            <Text style={styles.locationText}>📍 {location}</Text>
          )}
        </View>

        {/* Skills I Can Teach */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="star.fill" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Skills I Can Teach</Text>
          </View>
          <View style={styles.skillsGrid}>
            {currentUser.skillsToTeach.map(skill => (
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
            <Pressable 
              style={styles.addSkillCard}
              onPress={() => Alert.alert('Add Skill', 'Feature coming soon!')}
            >
              <IconSymbol name="plus.circle.fill" size={32} color={colors.primary} />
              <Text style={styles.addSkillText}>Add Skill</Text>
            </Pressable>
          </View>
        </View>

        {/* Skills I Want to Learn */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="book.fill" size={20} color={colors.secondary} />
            <Text style={styles.sectionTitle}>Skills I Want to Learn</Text>
          </View>
          <View style={styles.skillsGrid}>
            {currentUser.skillsToLearn.map(skill => (
              <View key={skill.id} style={styles.skillCardSecondary}>
                <Text style={styles.skillNameSecondary}>{skill.name}</Text>
                <Text style={styles.skillLevelSecondary}>{skill.level}</Text>
              </View>
            ))}
            <Pressable 
              style={styles.addSkillCard}
              onPress={() => Alert.alert('Add Skill', 'Feature coming soon!')}
            >
              <IconSymbol name="plus.circle.fill" size={32} color={colors.secondary} />
              <Text style={styles.addSkillText}>Add Skill</Text>
            </Pressable>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="gear" size={20} color={colors.text} />
            <Text style={styles.sectionTitle}>Settings</Text>
          </View>
          
          <Pressable 
            style={styles.settingItem}
            onPress={() => Alert.alert('Notifications', 'Feature coming soon!')}
          >
            <IconSymbol name="bell.fill" size={20} color={colors.textSecondary} />
            <Text style={styles.settingText}>Notifications</Text>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </Pressable>

          <Pressable 
            style={styles.settingItem}
            onPress={() => Alert.alert('Privacy', 'Feature coming soon!')}
          >
            <IconSymbol name="lock.fill" size={20} color={colors.textSecondary} />
            <Text style={styles.settingText}>Privacy & Security</Text>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </Pressable>

          <Pressable 
            style={styles.settingItem}
            onPress={() => Alert.alert('Help', 'Feature coming soon!')}
          >
            <IconSymbol name="questionmark.circle.fill" size={20} color={colors.textSecondary} />
            <Text style={styles.settingText}>Help & Support</Text>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </Pressable>

          <Pressable 
            style={[styles.settingItem, styles.logoutItem]}
            onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') }
            ])}
          >
            <IconSymbol name="arrow.right.square.fill" size={20} color={colors.error} />
            <Text style={[styles.settingText, styles.logoutText]}>Logout</Text>
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
  contentContainer: {
    paddingBottom: 20,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },

  // Profile Header
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    boxShadow: '0px 8px 24px rgba(255, 112, 67, 0.3)',
    elevation: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: colors.backgroundAlt,
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.accent,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  nameInput: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
    paddingVertical: 4,
    minWidth: 200,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
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
  editButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
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

  // Bio
  bioText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
  },
  bioInput: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    minHeight: 100,
  },

  // Location
  locationText: {
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
  },
  input: {
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
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
  addSkillCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '45%',
    flex: 1,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  addSkillText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 8,
  },

  // Settings
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  logoutItem: {
    marginTop: 8,
  },
  logoutText: {
    color: colors.error,
  },
});
