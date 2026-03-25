import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/designSystem";

type ModeOnboardingScreenProps = {
  onContinue: () => void;
};

export function ModeOnboardingScreen({ onContinue }: ModeOnboardingScreenProps) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.kicker}>How It Works</Text>
        <Text style={styles.title}>Two modes. One consistency engine.</Text>
      </View>

      <View style={[styles.modeCard, styles.personalCard]}>
        <View style={styles.modeTitleRow}>
          <Feather name="check-square" size={18} color={theme.colors.personal} />
          <Text style={[styles.modeTitle, styles.personalTitle]}>Personal Mode</Text>
        </View>
        <Text style={styles.modeBullet}>Flexible</Text>
        <Text style={styles.modeBullet}>Private</Text>
        <Text style={styles.modeBullet}>AI planning and tracking</Text>
      </View>

      <View style={[styles.modeCard, styles.groupCard]}>
        <View style={styles.modeTitleRow}>
          <Feather name="users" size={18} color={theme.colors.group} />
          <Text style={[styles.modeTitle, styles.groupTitle]}>Group Mode</Text>
        </View>
        <Text style={styles.modeBullet}>Friends-only</Text>
        <Text style={styles.modeBullet}>Strict</Text>
        <Text style={styles.modeBullet}>Money-based accountability</Text>
        <Text style={styles.modeBullet}>Social validation</Text>
      </View>

      <Pressable style={styles.continueButton} onPress={onContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 72,
    paddingBottom: 40,
    gap: 14,
  },
  header: {
    marginBottom: 4,
    gap: 10,
  },
  kicker: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    letterSpacing: 1.2,
    fontWeight: theme.typography.weights.semibold,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: theme.typography.weights.black,
    maxWidth: 340,
  },
  modeCard: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    gap: 8,
    minHeight: 170,
  },
  personalCard: {
    borderColor: "#1F5D49",
  },
  groupCard: {
    borderColor: "#5A1F26",
  },
  modeTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
  },
  modeTitle: {
    fontSize: 20,
    fontWeight: theme.typography.weights.bold,
  },
  personalTitle: {
    color: theme.colors.personal,
  },
  groupTitle: {
    color: theme.colors.group,
  },
  modeBullet: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.body,
    lineHeight: 22,
  },
  continueButton: {
    marginTop: "auto",
    minHeight: 52,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.brand,
  },
  continueButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
});
