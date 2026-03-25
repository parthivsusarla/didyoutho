import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AuthInput } from "../components/AuthInput";
import { GoogleAuthButton } from "../components/GoogleAuthButton";
import { theme } from "../theme/designSystem";

type SignUpScreenProps = {
  onGoToLogin: () => void;
  onComplete: () => void;
};

export function SignUpScreen({ onGoToLogin, onComplete }: SignUpScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.brand}>DidYouTho</Text>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Start personal tracking and unlock group accountability challenges.</Text>
      </View>

      <View style={styles.form}>
        <AuthInput
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          autoCapitalize="words"
          helperText=" "
        />
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
          placeholder="Create password"
          secureTextEntry
          helperText="Use 8+ characters"
        />
        <AuthInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Re-enter password"
          secureTextEntry
          helperText="Must match your password"
        />

        <Pressable style={styles.primaryButton} onPress={onComplete}>
          <Text style={styles.primaryButtonText}>Sign Up</Text>
        </Pressable>

        <GoogleAuthButton
          label="Continue with Google"
          onPress={() => Alert.alert("Google Sign Up", "Mock action only. No backend configured.")}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Already have an account?</Text>
          <Pressable onPress={onGoToLogin}>
            <Text style={styles.linkText}>Log In</Text>
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
    paddingTop: 72,
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
  primaryButton: {
    minHeight: 52,
    borderRadius: theme.radius.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.personal,
    marginTop: 8,
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
