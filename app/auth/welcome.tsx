
import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable,
  Image,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { colors, commonStyles } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <LinearGradient
        colors={[colors.primary, colors.secondary, colors.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {/* Logo and Title */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <IconSymbol name="arrow.triangle.2.circlepath" size={60} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.title}>SkillTrade</Text>
          <Text style={styles.tagline}>Trade Skills, Not Money.</Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="person.2.fill" size={28} color={colors.primary} />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Connect Globally</Text>
              <Text style={styles.featureText}>
                Find skill traders near you or around the world
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="arrow.triangle.2.circlepath" size={28} color={colors.primary} />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Trade Skills</Text>
              <Text style={styles.featureText}>
                Exchange knowledge directly - no money involved
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="star.fill" size={28} color={colors.primary} />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Learn & Grow</Text>
              <Text style={styles.featureText}>
                Master new skills from verified experts
              </Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Pressable 
            style={styles.primaryButton}
            onPress={() => router.push('/auth/signup')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </Pressable>

          <Pressable 
            style={styles.secondaryButton}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.secondaryButtonText}>I Already Have an Account</Text>
          </Pressable>

          <Pressable 
            style={styles.skipButton}
            onPress={() => router.replace('/(tabs)/(home)')}
          >
            <Text style={styles.skipButtonText}>Skip for Now</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  featuresContainer: {
    gap: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 20,
  },
  buttonsContainer: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.7,
  },
});
