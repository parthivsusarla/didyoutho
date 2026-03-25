import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { MoneyPoolBadge } from "../common/MoneyPoolBadge";
import { theme } from "../../theme/designSystem";

type GroupCardProps = {
  groupName: string;
  completedCount: number;
  totalCount: number;
  poolAmount: number;
  actionLabel: string;
  statusText?: string;
  statusTone?: "neutral" | "positive" | "danger";
  containerStyle?: StyleProp<ViewStyle>;
  live?: boolean;
  onActionPress?: () => void;
};

export function GroupCard({
  groupName,
  completedCount,
  totalCount,
  poolAmount,
  actionLabel,
  statusText,
  statusTone = "neutral",
  containerStyle,
  live = false,
  onActionPress,
}: GroupCardProps) {
  const progress = totalCount > 0 ? Math.min(completedCount / totalCount, 1) : 0;
  const statusColor =
    statusTone === "danger"
      ? theme.colors.group
      : statusTone === "positive"
        ? theme.colors.personal
        : theme.colors.textSecondary;

  return (
    <View style={[styles.card, containerStyle]}>
      <View style={styles.topRow}>
        <Text style={styles.groupName}>{groupName}</Text>
        {live ? (
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.progressText}>{completedCount}/{totalCount} completed</Text>

      {statusText ? <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text> : null}

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <View style={styles.bottomRow}>
        <MoneyPoolBadge amount={poolAmount} />

        <Pressable style={styles.actionButton} onPress={onActionPress}>
          <Text style={styles.actionText}>{actionLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 236,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: "#6E2631",
    backgroundColor: "#2A151D",
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.34,
    shadowRadius: 12,
    elevation: 6,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  groupName: {
    flex: 1,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.bold,
  },
  liveBadge: {
    borderRadius: theme.radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: "#4A0E17",
    borderWidth: 1,
    borderColor: theme.colors.group,
  },
  liveText: {
    color: theme.colors.group,
    fontSize: 10,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: 0.5,
  },
  progressText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.medium,
  },
  statusText: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
    marginTop: -2,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "#3A2230",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: theme.colors.personal,
  },
  bottomRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
  },
  actionButton: {
    minHeight: 34,
    borderRadius: theme.radius.md,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#311821",
    borderWidth: 1,
    borderColor: "#7A2D3A",
  },
  actionText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
  },
});
