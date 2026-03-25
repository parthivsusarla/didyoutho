import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { GroupChallengePoll } from "../types";
import { theme } from "../theme/designSystem";

type GroupChallengePollDetailsScreenProps = {
  poll: GroupChallengePoll;
  groupName: string;
  memberCount: number;
  currentUserId: string;
  onVote: (vote: "yes" | "no") => void;
  onActivate: () => void;
  onBack: () => void;
};

function getTimeRemaining(deadlineISO: string) {
  const diffMs = new Date(deadlineISO).getTime() - Date.now();
  if (diffMs <= 0) {
    return "Expired";
  }

  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const mins = totalMinutes % 60;

  if (days > 0) {
    return `${days}d ${hours}h left`;
  }

  if (hours > 0) {
    return `${hours}h ${mins}m left`;
  }

  return `${mins}m left`;
}

export function GroupChallengePollDetailsScreen({
  poll,
  groupName,
  memberCount,
  currentUserId,
  onVote,
  onActivate,
  onBack,
}: GroupChallengePollDetailsScreenProps) {
  const yesCount = poll.yesVotes.length;
  const noCount = poll.noVotes.length;
  const qualified = yesCount >= poll.minYesVotes;
  const myVote = poll.yesVotes.includes(currentUserId) ? "yes" : poll.noVotes.includes(currentUserId) ? "no" : null;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Pressable style={styles.iconButton} onPress={onBack}>
          <Feather name="chevron-left" size={18} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Poll Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.pollCard}>
        <Text style={styles.groupName}>{groupName}</Text>
        <Text style={styles.question}>{poll.question}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Proposed by</Text>
          <Text style={styles.value}>{poll.proposedBy}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Habit</Text>
          <Text style={styles.value}>{poll.habitName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Time window</Text>
          <Text style={styles.value}>{poll.timeWindow}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>{poll.durationDays} days</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Entry fee</Text>
          <Text style={styles.value}>Rs {poll.entryFee}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Poll deadline</Text>
          <Text style={styles.value}>{new Date(poll.pollDeadlineISO).toLocaleString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Time remaining</Text>
          <Text style={styles.deadlineValue}>{getTimeRemaining(poll.pollDeadlineISO)}</Text>
        </View>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Voting</Text>
        <View style={styles.statsRow}>
          <View style={[styles.statPill, styles.yesPill]}>
            <Text style={styles.yesText}>Yes {yesCount}</Text>
          </View>
          <View style={[styles.statPill, styles.noPill]}>
            <Text style={styles.noText}>No {noCount}</Text>
          </View>
          <View style={[styles.statPill, styles.minPill]}>
            <Text style={styles.minText}>Min {poll.minYesVotes}</Text>
          </View>
        </View>

        <Text style={styles.helperText}>
          Only Yes voters become participants for pool, leaderboard, random check-ins, and penalty rules.
        </Text>
        <Text style={styles.helperText}>Current eligible participants: {yesCount}/{memberCount}</Text>

        {poll.status === "proposed" ? (
          <View style={styles.voteRow}>
            <Pressable
              style={[styles.voteButton, styles.voteYesButton, myVote === "yes" && styles.voteButtonSelected]}
              onPress={() => onVote("yes")}
            >
              <Text style={styles.voteYesButtonText}>Vote Yes</Text>
            </Pressable>
            <Pressable
              style={[styles.voteButton, styles.voteNoButton, myVote === "no" && styles.voteButtonSelected]}
              onPress={() => onVote("no")}
            >
              <Text style={styles.voteNoButtonText}>Vote No</Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      {poll.status === "proposed" && qualified ? (
        <Pressable style={styles.activateButton} onPress={onActivate}>
          <Text style={styles.activateButtonText}>Activate Challenge and Collect Entry Fee</Text>
        </Pressable>
      ) : null}

      {poll.status === "active" ? (
        <View style={styles.activatedCard}>
          <Text style={styles.activatedTitle}>Challenge Activated</Text>
          <Text style={styles.activatedText}>
            Money pool collection starts now for Yes voters only. No voters remain in group and are excluded from this challenge.
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: 120,
    gap: theme.spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  headerSpacer: {
    width: 36,
  },
  pollCard: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: "#5F2431",
    backgroundColor: "#24141A",
    padding: theme.spacing.md,
    gap: 8,
  },
  groupName: {
    color: theme.colors.group,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.bold,
  },
  question: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
    lineHeight: 22,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.caption,
  },
  value: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
  },
  deadlineValue: {
    color: theme.colors.group,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.bold,
  },
  statsCard: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    gap: 10,
  },
  statsTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.bold,
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
  },
  statPill: {
    flex: 1,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    minHeight: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  yesPill: {
    borderColor: "#1F5D49",
    backgroundColor: "#17362A",
  },
  noPill: {
    borderColor: "#7B2A34",
    backgroundColor: "#3B171D",
  },
  minPill: {
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cardSoft,
  },
  yesText: {
    color: theme.colors.personal,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.bold,
  },
  noText: {
    color: theme.colors.group,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.bold,
  },
  minText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.bold,
  },
  helperText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.caption,
    lineHeight: 18,
  },
  voteRow: {
    flexDirection: "row",
    gap: 10,
  },
  voteButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  voteButtonSelected: {
    borderWidth: 2,
  },
  voteYesButton: {
    borderColor: "#1F5D49",
    backgroundColor: theme.colors.personalSoft,
  },
  voteYesButtonText: {
    color: theme.colors.personal,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.bold,
  },
  voteNoButton: {
    borderColor: "#7B2A34",
    backgroundColor: "#3B171D",
  },
  voteNoButtonText: {
    color: theme.colors.group,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.bold,
  },
  activateButton: {
    minHeight: 50,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.group,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  activateButtonText: {
    color: "#2A0A0D",
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.bold,
    textAlign: "center",
  },
  activatedCard: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: "#1F5D49",
    backgroundColor: "#132C23",
    padding: theme.spacing.md,
    gap: 6,
  },
  activatedTitle: {
    color: theme.colors.personal,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.bold,
  },
  activatedText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.bodySm,
    lineHeight: 19,
  },
});
