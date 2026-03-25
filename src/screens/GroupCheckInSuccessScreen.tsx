import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/designSystem";

type GroupCheckInSuccessScreenProps = {
  streakIncrease: number;
  onGoGroup: () => void;
  onGoHome: () => void;
};

export function GroupCheckInSuccessScreen({ streakIncrease, onGoGroup, onGoHome }: GroupCheckInSuccessScreenProps) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <Feather name="check" size={24} color={theme.colors.personal} />
        </View>

        <Text style={styles.title}>Check-In Approved</Text>
        <Text style={styles.subtitle}>Your submission was validated by group members.</Text>

        <View style={styles.streakPill}>
          <Text style={styles.streakPillText}>+{streakIncrease} day streak</Text>
        </View>

        <Text style={styles.note}>Nice consistency. Keep momentum for the pool win.</Text>

        <View style={styles.actionsRow}>
          <Pressable style={styles.secondaryButton} onPress={onGoGroup}>
            <Text style={styles.secondaryButtonText}>Back to Group</Text>
          </Pressable>
          <Pressable style={styles.primaryButton} onPress={onGoHome}>
            <Text style={styles.primaryButtonText}>Go Home</Text>
          </Pressable>
        </View>
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
    borderColor: "#1F5D49",
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
    alignItems: "center",
  },
  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: "#1F5D49",
    backgroundColor: theme.colors.personalSoft,
    justifyContent: "center",
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
  streakPill: {
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: "#1F5D49",
    backgroundColor: theme.colors.personalSoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  streakPillText: {
    color: theme.colors.personal,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.bold,
  },
  note: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
    textAlign: "center",
  },
  actionsRow: {
    marginTop: 4,
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.semibold,
  },
  primaryButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.personal,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#052017",
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.bold,
  },
});
