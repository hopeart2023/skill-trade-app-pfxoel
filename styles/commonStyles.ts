
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

// SkillTrade Color Scheme - Based on the gradient logo
export const colors = {
  // Main brand colors from logo gradient
  primary: '#FF7043',      // Orange
  secondary: '#D81B60',    // Pink
  accent: '#7B1FA2',       // Purple
  
  // Background colors
  background: '#FFFFFF',
  backgroundAlt: '#F5F5F5',
  
  // Text colors
  text: '#2D2D2D',
  textSecondary: '#6B6B6B',
  
  // UI elements
  card: '#F5F5F5',
  highlight: '#FFF3E0',
  border: '#E0E0E0',
  
  // Status colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
  
  // Skill category colors
  design: '#7B1FA2',      // Purple
  development: '#FF7043',  // Orange
  music: '#4CAF50',        // Green
  writing: '#2196F3',      // Blue
  photography: '#D81B60',  // Pink
  language: '#FFC107',     // Yellow
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(255, 112, 67, 0.3)',
    elevation: 4,
  },
  secondary: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(216, 27, 96, 0.3)',
    elevation: 4,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  gradientCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    elevation: 4,
  },
  input: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  tag: {
    backgroundColor: colors.highlight,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  shadow: {
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  shadowLarge: {
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    elevation: 4,
  },
});

export const gradients = {
  primary: ['#FF7043', '#D81B60', '#7B1FA2'],
  secondary: ['#7B1FA2', '#D81B60', '#FF7043'],
  warm: ['#FF7043', '#FFC107'],
  cool: ['#2196F3', '#7B1FA2'],
};
