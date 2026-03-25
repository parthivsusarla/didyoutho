import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MoneyPoolBadge } from "../components/common/MoneyPoolBadge";
import { theme } from "../theme/designSystem";

type GroupChallengeFailureScreenProps = {
  groupName: string;
  reason: string;
  poolAmount: number;
  duration: string;
  members: number;
  onBack: () => void;
};

export function GroupChallengeFailureScreen({
  groupName,
  reason,
  poolAmount,
  duration,
  members,
  onBack,
}: GroupChallengeFailureScreenProps) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Feather name="x-octagon" size={30} color={theme.colors.group} />
        <Text style={styles.title}>You have been eliminated</Text>
        <Text style={styles.subtitle}>You are no longer eligible to win this challenge pool.</Text>

        <View style={styles.reasonBox}>
          <Text style={styles.reasonLabel}>Reason</Text>
          <Text style={styles.reasonText}>{reason}</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>{groupName}</Text>
          <MoneyPoolBadge amount={poolAmount} />
          <Text style={styles.summaryText}>Duration: {duration}</Text>
          <Text style={styles.summaryText}>Members: {members}</Text>
        </View>

        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back to Group</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  card: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: "#6E2631",
    backgroundColor: "#2A151D",
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
    alignItems: "center",
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.weights.bold,
    textAlign: "center",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
    textAlign: "center",
    lineHeight: 20,
  },
  reasonBox: {
    width: "100%",
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: "#7B2A34",
    backgroundColor: "#3B171D",
    padding: theme.spacing.md,
    gap: 4,
  },
  reasonLabel: {
    color: theme.colors.group,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.bold,
  },
  reasonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.bodySm,
    lineHeight: 19,
  },
  summaryCard: {
    width: "100%",
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    gap: 6,
  },
  summaryTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
  },
  summaryText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
  },
  backButton: {
    marginTop: 4,
    minHeight: 46,
    alignSelf: "stretch",
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
  },
});
