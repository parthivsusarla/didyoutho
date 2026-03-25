import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AuthInput } from "../components/AuthInput";
import { GoogleAuthButton } from "../components/GoogleAuthButton";
import { theme } from "../theme/designSystem";

type LoginScreenProps = {
  onGoToSignUp: () => void;
  onComplete: () => void;
};

export function LoginScreen({ onGoToSignUp, onComplete }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.brand}>DidYouTho</Text>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Log in to continue your personal streaks and group challenge progress.</Text>
      </View>

      <View style={styles.form}>
        <AuthInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          helperText=" "
        />
        <AuthInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
          helperText=" "
        />

        <Pressable style={styles.forgotWrap} onPress={() => Alert.alert("Forgot Password", "Mock action only. No backend configured.")}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </Pressable>

        <Pressable style={styles.primaryButton} onPress={onComplete}>
          <Text style={styles.primaryButtonText}>Log In</Text>
        </Pressable>

        <GoogleAuthButton
          label="Continue with Google"
          onPress={() => Alert.alert("Google Login", "Mock action only. No backend configured.")}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>{"Don't have an account?"}</Text>
          <Pressable onPress={onGoToSignUp}>
            <Text style={styles.linkText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 82,
    paddingBottom: 40,
    gap: 24,
  },
  header: {
    gap: 10,
  },
  brand: {
    color: theme.colors.personal,
    fontSize: 13,
    letterSpacing: 1.4,
    fontWeight: theme.typography.weights.bold,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: theme.typography.weights.black,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.body,
    lineHeight: 22,
    maxWidth: 330,
  },
  form: {
    gap: 8,
  },
  forgotWrap: {
    alignSelf: "flex-end",
    marginBottom: 8,
  },
  forgotText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.medium,
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: theme.radius.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.personal,
  },
  primaryButtonText: {
    color: "#052017",
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  switchRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  switchText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
  },
  linkText: {
    color: theme.colors.personal,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.bold,
  },
});
