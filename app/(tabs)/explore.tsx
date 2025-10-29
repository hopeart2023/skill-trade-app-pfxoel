
import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Platform,
  TextInput,
  Pressable,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/styles/commonStyles";
import { mockUsers, skillCategories, popularSkills } from "@/data/mockData";
import { User, Skill } from "@/types";

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSkills = popularSkills.filter(skill =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!selectedCategory || skill.category === selectedCategory)
  );

  const renderSkillItem = (skill: Skill) => {
    const category = skillCategories.find(c => c.id === skill.category);
    const usersWithSkill = mockUsers.filter(user =>
      user.skillsToTeach.some(s => s.id === skill.id)
    );

    return (
      <Pressable key={skill.id} style={styles.skillItem}>
        <View style={[styles.skillIcon, { backgroundColor: category?.color + '20' }]}>
          <Text style={styles.skillEmoji}>{category?.icon}</Text>
        </View>
        <View style={styles.skillInfo}>
          <Text style={styles.skillName}>{skill.name}</Text>
          <Text style={styles.skillCategory}>{category?.name}</Text>
          <Text style={styles.skillUsers}>
            {usersWithSkill.length} traders available
          </Text>
        </View>
        <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore Skills</Text>
          <Text style={styles.headerSubtitle}>
            Discover new skills to learn and teach
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search skills..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <IconSymbol name="xmark.circle.fill" size={20} color={colors.textSecondary} />
            </Pressable>
          )}
        </View>

        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          <Pressable
            style={[
              styles.categoryChip,
              !selectedCategory && styles.categoryChipActive
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={[
              styles.categoryChipText,
              !selectedCategory && styles.categoryChipTextActive
            ]}>
              All
            </Text>
          </Pressable>
          {skillCategories.map(category => (
            <Pressable
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
            >
              <Text style={styles.categoryEmoji}>{category.icon}</Text>
              <Text style={[
                styles.categoryChipText,
                selectedCategory === category.id && styles.categoryChipTextActive
              ]}>
                {category.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Skills List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsText}>
              {filteredSkills.length} skills found
            </Text>
          </View>

          {filteredSkills.map(renderSkillItem)}

          {filteredSkills.length === 0 && (
            <View style={styles.emptyState}>
              <IconSymbol name="magnifyingglass" size={64} color={colors.textSecondary} />
              <Text style={styles.emptyStateTitle}>No skills found</Text>
              <Text style={styles.emptyStateText}>
                Try adjusting your search or filters
              </Text>
            </View>
          )}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },

  // Categories
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    gap: 6,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryEmoji: {
    fontSize: 16,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },

  // Results
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },

  // Skill Items
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  skillIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillEmoji: {
    fontSize: 24,
  },
  skillInfo: {
    flex: 1,
  },
  skillName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  skillCategory: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  skillUsers: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
