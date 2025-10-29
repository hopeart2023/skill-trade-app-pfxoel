
import { router } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, gradients } from "@/styles/commonStyles";
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable,
  Dimensions,
  Animated
} from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={gradients.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.container}>
          {/* Logo and Title */}
          <Animated.View 
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Text style={styles.logo}>🤝</Text>
            <Text style={styles.appName}>SkillTrade</Text>
            <Text style={styles.tagline}>Learn. Teach. Grow Together.</Text>
          </Animated.View>

          {/* Features */}
          <Animated.View 
            style={[
              styles.featuresContainer,
              { opacity: fadeAnim },
            ]}
          >
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <IconSymbol name="person.2.fill" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.featureTitle}>Connect</Text>
              <Text style={styles.featureText}>Find skill partners worldwide</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <IconSymbol name="arrow.left.arrow.right" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.featureTitle}>Trade</Text>
              <Text style={styles.featureText}>Exchange skills, not money</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <IconSymbol name="chart.line.uptrend.xyaxis" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.featureTitle}>Grow</Text>
              <Text style={styles.featureText}>Learn and teach together</Text>
            </View>
          </Animated.View>

          {/* Buttons */}
          <Animated.View 
            style={[
              styles.buttonsContainer,
              { opacity: fadeAnim },
            ]}
          >
            <Pressable 
              style={styles.primaryButton}
              onPress={() => router.push('/auth/signup')}
            >
              <View style={styles.primaryButtonContent}>
                <Text style={styles.primaryButtonText}>Get Started</Text>
                <IconSymbol name="arrow.right" size={20} color={colors.primary} />
              </View>
            </Pressable>

            <Pressable 
              style={styles.secondaryButton}
              onPress={() => router.push('/auth/login')}
            >
              <Text style={styles.secondaryButtonText}>Sign In</Text>
            </Pressable>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    fontSize: 100,
    marginBottom: 16,
  },
  appName: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 40,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  featureText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttonsContainer: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
    elevation: 8,
  },
  primaryButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
