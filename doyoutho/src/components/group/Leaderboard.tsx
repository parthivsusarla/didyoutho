import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme/designSystem";

export type LeaderboardEntry = {
  id: string;
  rank: number;
  memberName: string;
  streak: number;
  consistency: number;
};

type LeaderboardProps = {
  title?: string;
  entries: LeaderboardEntry[];
};

export function Leaderboard({ title = "Leaderboard", entries }: LeaderboardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, styles.rankCell]}>Rank</Text>
        <Text style={[styles.headerCell, styles.nameCell]}>Member</Text>
        <Text style={[styles.headerCell, styles.metricCell]}>Streak</Text>
        <Text style={[styles.headerCell, styles.metricCell]}>Score</Text>
      </View>

      {entries.map((entry) => {
        const topUser = entry.rank <= 3;

        return (
          <View key={entry.id} style={[styles.row, topUser && styles.topRow]}>
            <Text style={[styles.rankCell, styles.rankText, topUser && styles.topText]}>#{entry.rank}</Text>
            <Text style={[styles.nameCell, styles.memberText]}>{entry.memberName}</Text>
            <Text style={[styles.metricCell, styles.metricText]}>{entry.streak}d</Text>
            <Text style={[styles.metricCell, styles.metricText]}>{entry.consistency}%</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 4,
  },
  headerCell: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cardSoft,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  topRow: {
    borderColor: "#6D561A",
    backgroundColor: "#312912",
  },
  rankCell: {
    width: 52,
  },
  nameCell: {
    flex: 1,
  },
  metricCell: {
    width: 60,
    textAlign: "right",
  },
  rankText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.semibold,
  },
  topText: {
    color: theme.colors.reward,
  },
  memberText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.semibold,
  },
  metricText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
  },
});
