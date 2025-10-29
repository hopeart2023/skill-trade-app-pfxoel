
import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    console.log('Login attempt:', { email });
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Login successful!');
      router.replace('/(tabs)/(home)');
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login pressed`);
    Alert.alert('Coming Soon', `${provider} login will be available soon!`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Pressable 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <IconSymbol name="chevron.left" size={24} color={colors.text} />
            </Pressable>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to continue trading skills</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <IconSymbol name="envelope.fill" size={20} color={colors.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder="your.email@example.com"
                  placeholderTextColor={colors.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <IconSymbol name="lock.fill" size={20} color={colors.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <IconSymbol 
                    name={showPassword ? "eye.slash.fill" : "eye.fill"} 
                    size={20} 
                    color={colors.textSecondary} 
                  />
                </Pressable>
              </View>
            </View>

            <Pressable 
              style={styles.forgotPassword}
              onPress={() => Alert.alert('Forgot Password', 'Feature coming soon!')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>

            <Pressable 
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loginButtonGradient}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login */}
          <View style={styles.socialButtons}>
            <Pressable 
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Google')}
            >
              <IconSymbol name="globe" size={24} color={colors.text} />
              <Text style={styles.socialButtonText}>Google</Text>
            </Pressable>

            <Pressable 
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Apple')}
            >
              <IconSymbol name="apple.logo" size={24} color={colors.text} />
              <Text style={styles.socialButtonText}>Apple</Text>
            </Pressable>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don&apos;t have an account? </Text>
            <Pressable onPress={() => router.push('/auth/signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  loginButton: {
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(255, 112, 67, 0.3)',
    elevation: 4,
  },
  loginButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
});
