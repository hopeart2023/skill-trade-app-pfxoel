
import { StyleSheet } from 'react-native';

// SkillTrade Color Scheme - Gradient modern + glassmorphism + playful social
export const colors = {
  // Primary Gradient: Orange → Pink → Purple
  primary: '#FF8B00',      // Orange
  secondary: '#FF3C83',    // Pink
  accent: '#B500FF',       // Purple
  
  // Background colors
  background: '#FFFFFF',
  backgroundDark: '#0A0A0A',
  backgroundAlt: '#F8F9FA',
  backgroundAltDark: '#1A1A1A',
  
  // Text colors
  text: '#1A1A1A',
  textDark: '#FFFFFF',
  textSecondary: '#6B7280',
  textSecondaryDark: '#9CA3AF',
  
  // UI elements
  card: '#FFFFFF',
  cardDark: '#1F1F1F',
  highlight: '#FFF5E6',
  highlightDark: '#2A1A0A',
  border: '#E5E7EB',
  borderDark: '#374151',
  
  // Glass effect
  glass: 'rgba(255, 255, 255, 0.7)',
  glassDark: 'rgba(31, 31, 31, 0.7)',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Skill category colors
  design: '#B500FF',       // Purple
  development: '#FF8B00',  // Orange
  music: '#10B981',        // Green
  writing: '#3B82F6',      // Blue
  photography: '#FF3C83',  // Pink
  language: '#F59E0B',     // Yellow
};

export const gradients = {
  primary: ['#FF8B00', '#FF3C83', '#B500FF'],
  primaryReverse: ['#B500FF', '#FF3C83', '#FF8B00'],
  warm: ['#FF8B00', '#FF3C83'],
  cool: ['#FF3C83', '#B500FF'],
  purple: ['#B500FF', '#8B00CC'],
  orange: ['#FF8B00', '#FF6B00'],
  pink: ['#FF3C83', '#FF1C63'],
};

export const buttonStyles = StyleSheet.create({
  primary: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 8px 24px rgba(255, 139, 0, 0.3)',
    elevation: 8,
  },
  secondary: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 8px 24px rgba(255, 60, 131, 0.3)',
    elevation: 8,
  },
  glass: {
    backgroundColor: colors.glass,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
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
    paddingHorizontal: 24,
  },
  // Typography - Poppins/Inter style
  heading1: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  heading2: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  heading3: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 18,
  },
  // Layout
  section: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  // Glass card with blur effect
  glassCard: {
    backgroundColor: colors.glass,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
    elevation: 8,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  floatingCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.15)',
    elevation: 12,
  },
  input: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
    boxShadow: '0px 0px 0px 4px rgba(255, 139, 0, 0.1)',
  },
  glassInput: {
    backgroundColor: colors.glass,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  tag: {
    backgroundColor: colors.highlight,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
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
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  shadowLarge: {
    boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.15)',
    elevation: 12,
  },
  // Gradient text effect (use with LinearGradient wrapper)
  gradientText: {
    fontSize: 32,
    fontWeight: '800',
  },
});

// Animation presets
export const animations = {
  buttonPress: {
    scale: 0.95,
    duration: 100,
  },
  cardHover: {
    scale: 1.02,
    duration: 200,
  },
  fadeIn: {
    opacity: 1,
    duration: 300,
  },
  slideIn: {
    translateY: 0,
    duration: 300,
  },
};
