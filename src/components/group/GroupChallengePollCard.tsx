import { Pressable, StyleSheet, Text, View } from "react-native";
import { GroupChallengePoll } from "../../types";
import { theme } from "../../theme/designSystem";

type GroupChallengePollCardProps = {
  poll: GroupChallengePoll;
  memberCount: number;
  onOpen: () => void;
};

function getDeadlineLabel(deadlineISO: string) {
  const target = new Date(deadlineISO).getTime();
  const now = Date.now();
  const diffMs = target - now;

  if (diffMs <= 0) {
    return "Poll ended";
  }

  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days}d ${hours}h left`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m left`;
  }

  return `${minutes}m left`;
}

export function GroupChallengePollCard({ poll, memberCount, onOpen }: GroupChallengePollCardProps) {
  const statusTone =
    poll.status === "active" ? styles.statusActive : poll.status === "expired" ? styles.statusExpired : styles.statusProposed;
  const statusText = poll.status === "active" ? "Qualified" : poll.status === "expired" ? "Expired" : "Proposed";

  return (
    <Pressable style={styles.card} onPress={onOpen}>
      <View style={styles.topRow}>
        <Text style={styles.title} numberOfLines={2}>
          {poll.question}
        </Text>
        <View style={[styles.statusPill, statusTone]}>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Proposed by</Text>
        <Text style={styles.metaValue}>{poll.proposedBy}</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Habit</Text>
        <Text style={styles.metaValue}>{poll.habitName}</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Window</Text>
        <Text style={styles.metaValue}>{poll.timeWindow}</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Duration</Text>
        <Text style={styles.metaValue}>{poll.durationDays} days</Text>
      </View>

      <View style={styles.statsRow}>
        <VotePill label="Yes" value={poll.yesVotes.length} tone="yes" />
        <VotePill label="No" value={poll.noVotes.length} tone="no" />
        <VotePill label="Min" value={poll.minYesVotes} tone="muted" />
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.deadlineText}>{getDeadlineLabel(poll.pollDeadlineISO)}</Text>
        <Text style={styles.membersText}>{poll.yesVotes.length}/{memberCount} responded Yes</Text>
      </View>
    </Pressable>
  );
}

type VotePillProps = {
  label: string;
  value: number;
  tone: "yes" | "no" | "muted";
};

function VotePill({ label, value, tone }: VotePillProps) {
  const toneStyle = tone === "yes" ? styles.voteYes : tone === "no" ? styles.voteNo : styles.voteMuted;
  const toneTextStyle = tone === "yes" ? styles.voteYesText : tone === "no" ? styles.voteNoText : styles.voteMutedText;

  return (
    <View style={[styles.votePill, toneStyle]}>
      <Text style={[styles.voteLabel, toneTextStyle]}>{label}</Text>
      <Text style={[styles.voteValue, toneTextStyle]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: "#5D2430",
    backgroundColor: "#23141A",
    padding: theme.spacing.md,
    gap: 8,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  title: {
    flex: 1,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.bold,
    lineHeight: 20,
  },
  statusPill: {
    borderRadius: theme.radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
  },
  statusProposed: {
    borderColor: "#7A5A1E",
    backgroundColor: "#2F2616",
  },
  statusActive: {
    borderColor: "#1F5D49",
    backgroundColor: "#153428",
  },
  statusExpired: {
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  statusText: {
    color: theme.colors.textPrimary,
    fontSize: 10,
    fontWeight: theme.typography.weights.bold,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  metaLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.caption,
  },
  metaValue: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
  },
  votePill: {
    flex: 1,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    paddingVertical: 8,
    alignItems: "center",
    gap: 2,
  },
  voteYes: {
    borderColor: "#1F5D49",
    backgroundColor: "#17362A",
  },
  voteNo: {
    borderColor: "#7B2A34",
    backgroundColor: "#3B171D",
  },
  voteMuted: {
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  voteLabel: {
    fontSize: 10,
    fontWeight: theme.typography.weights.semibold,
  },
  voteValue: {
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.bold,
  },
  voteYesText: {
    color: theme.colors.personal,
  },
  voteNoText: {
    color: theme.colors.group,
  },
  voteMutedText: {
    color: theme.colors.textSecondary,
  },
  footerRow: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  deadlineText: {
    color: theme.colors.group,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
  },
  membersText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.caption,
  },
});
