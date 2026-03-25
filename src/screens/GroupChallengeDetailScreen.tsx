import { useMemo, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { GroupChallengePollCard } from "../components/group/GroupChallengePollCard";
import { MoneyPoolBadge } from "../components/common/MoneyPoolBadge";
import { GroupChallengeSpace } from "../types";
import { RandomCheckInScreen } from "./RandomCheckInScreen";
import { TaskResponseCameraScreen } from "./TaskResponseCameraScreen";
import { theme } from "../theme/designSystem";

type GroupChallengeDetailScreenProps = {
  group: GroupChallengeSpace;
  onBack: () => void;
  onOpenPoll: (pollId: string) => void;
  onOpenCreatePoll: () => void;
};

export function GroupChallengeDetailScreen({ group, onBack, onOpenPoll, onOpenCreatePoll }: GroupChallengeDetailScreenProps) {
  const [view, setView] = useState<"detail" | "random-check-in" | "task-response-camera">("detail");

  const firstActiveChallenge = group.activeChallenges[0];

  const participantNames = useMemo(() => {
    if (!firstActiveChallenge) {
      return [] as string[];
    }

    return group.members.filter((member) => firstActiveChallenge.participants.includes(member.id)).map((member) => member.name);
  }, [group.members, firstActiveChallenge]);

  if (view === "random-check-in" && firstActiveChallenge) {
    return (
      <RandomCheckInScreen
        habitName={firstActiveChallenge.habitName}
        groupName={group.groupName}
        onRespond={() => setView("task-response-camera")}
        onClose={() => setView("detail")}
      />
    );
  }

  if (view === "task-response-camera" && firstActiveChallenge) {
    return (
      <TaskResponseCameraScreen
        taskTitle={`Capture proof: ${firstActiveChallenge.habitName}`}
        groupName={group.groupName}
        initialSeconds={300}
        onSubmit={() => setView("detail")}
        onBack={() => setView("detail")}
      />
    );
  }

  const openPolls = group.polls.filter((poll) => poll.status === "proposed" || poll.status === "active");

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Pressable style={styles.iconButton} onPress={onBack}>
          <Feather name="chevron-left" size={18} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>{group.groupName}</Text>
        <Pressable style={styles.createPollButton} onPress={onOpenCreatePoll}>
          <Text style={styles.createPollButtonText}>Create Poll</Text>
        </Pressable>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Friends-only challenge workflow</Text>
        <Text style={styles.infoText}>1. Create a proposal poll</Text>
        <Text style={styles.infoText}>2. Members vote Yes or No</Text>
        <Text style={styles.infoText}>3. Only Yes voters become participants</Text>
        <Text style={styles.infoText}>4. Money is collected only after poll qualifies</Text>
      </View>

      <View style={styles.sectionWrap}>
        <Text style={styles.sectionTitle}>Active Challenge Polls</Text>
        {openPolls.length > 0 ? (
          <View style={styles.sectionList}>
            {openPolls.map((poll) => (
              <GroupChallengePollCard
                key={poll.id}
                poll={poll}
                memberCount={group.members.length}
                onOpen={() => onOpenPoll(poll.id)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No open polls right now.</Text>
          </View>
        )}
      </View>

      <View style={styles.sectionWrap}>
        <Text style={styles.sectionTitle}>Active Challenges</Text>
        {group.activeChallenges.length > 0 ? (
          <View style={styles.sectionList}>
            {group.activeChallenges.map((challenge) => (
              <View key={challenge.id} style={styles.challengeCard}>
                <View style={styles.challengeTopRow}>
                  <Text style={styles.challengeTitle}>{challenge.habitName}</Text>
                  <View style={styles.statusPill}>
                    <Text style={styles.statusPillText}>{challenge.status.toUpperCase()}</Text>
                  </View>
                </View>

                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Time window</Text>
                  <Text style={styles.metaValue}>{challenge.timeWindow}</Text>
                </View>
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Duration</Text>
                  <Text style={styles.metaValue}>{challenge.durationDays} days</Text>
                </View>
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Participants (Yes voters)</Text>
                  <Text style={styles.metaValue}>{challenge.participants.length}</Text>
                </View>

                <MoneyPoolBadge amount={challenge.poolTotal} label="Pool (post-poll)" />

                <Text style={styles.participantLine}>
                  Included members: {group.members.filter((member) => challenge.participants.includes(member.id)).map((member) => member.name).join(", ")}
                </Text>
              </View>
            ))}

            {firstActiveChallenge ? (
              <Pressable style={styles.randomCheckInButton} onPress={() => setView("random-check-in")}>
                <Text style={styles.randomCheckInButtonText}>Run Random Check-In for Active Participants</Text>
              </Pressable>
            ) : null}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No active challenges yet. Qualify a poll first.</Text>
          </View>
        )}
      </View>

      {firstActiveChallenge ? (
        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Eligibility Notice</Text>
          <Text style={styles.noteText}>Only Yes voters are eligible for random check-ins, leaderboard ranking, penalties, and elimination logic.</Text>
          <Text style={styles.noteText}>Current active participant roster: {participantNames.join(", ") || "No participants"}</Text>
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
    gap: 8,
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
    flex: 1,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
    marginLeft: 6,
  },
  createPollButton: {
    minHeight: 34,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "#7B2A34",
    backgroundColor: "#3B171D",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  createPollButtonText: {
    color: theme.colors.group,
    fontSize: 12,
    fontWeight: theme.typography.weights.bold,
  },
  infoCard: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    gap: 4,
  },
  infoTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.bold,
    marginBottom: 2,
  },
  infoText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
    lineHeight: 19,
  },
  sectionWrap: {
    gap: 8,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  sectionList: {
    gap: 8,
  },
  emptyState: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    minHeight: 74,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
  },
  emptyStateText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.bodySm,
    textAlign: "center",
  },
  challengeCard: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: "#5F2431",
    backgroundColor: "#24141A",
    padding: theme.spacing.md,
    gap: 8,
  },
  challengeTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  challengeTitle: {
    flex: 1,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.bold,
  },
  statusPill: {
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: "#7A5A1E",
    backgroundColor: "#2F2616",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusPillText: {
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
  participantLine: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.caption,
    lineHeight: 18,
  },
  randomCheckInButton: {
    minHeight: 44,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "#7B2A34",
    backgroundColor: "#3B171D",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  randomCheckInButtonText: {
    color: theme.colors.group,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.bold,
    textAlign: "center",
  },
  noteCard: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: "#1F5D49",
    backgroundColor: "#132C23",
    padding: theme.spacing.md,
    gap: 4,
  },
  noteTitle: {
    color: theme.colors.personal,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.bold,
  },
  noteText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.caption,
    lineHeight: 18,
  },
});
