import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/designSystem";

type WelcomeScreenProps = {
  onSignUp: () => void;
  onLogIn: () => void;
};

export function WelcomeScreen({ onSignUp, onLogIn }: WelcomeScreenProps) {
  return (
    <LinearGradient
      colors={[theme.colors.gradientStart, theme.colors.gradientMid, theme.colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <View style={styles.glowOrbTop} />
      <View style={styles.glowOrbBottom} />

      <View style={styles.content}>
        <Text style={styles.eyebrow}>DidYouTho</Text>
        <Text style={styles.title}>Build habits solo. Win consistency together.</Text>
        <Text style={styles.tagline}>
          Personal tracking with smart structure, plus friends-only accountability challenges with real stakes.
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.primaryButton} onPress={onSignUp}>
          <Text style={styles.primaryButtonText}>Sign Up</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={onLogIn}>
          <Text style={styles.secondaryButtonText}>Log In</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 88,
    paddingBottom: 48,
  },
  glowOrbTop: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#1B7C5E22",
    top: -70,
    right: -90,
  },
  glowOrbBottom: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "#A31F2922",
    bottom: -130,
    left: -110,
  },
  content: {
    gap: 16,
  },
  eyebrow: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "700",
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: "900",
    maxWidth: 320,
  },
  tagline: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 320,
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.personal,
  },
  primaryButtonText: {
    color: "#042A20",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryButton: {
    minHeight: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  secondaryButtonText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
});
