import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MoneyPoolBadge } from "../components/common/MoneyPoolBadge";
import { Leaderboard, LeaderboardEntry } from "../components/group/Leaderboard";
import { CheckInResponseScreen } from "./CheckInResponseScreen";
import { CheckInVotingScreen } from "./CheckInVotingScreen";
import { GroupChallengeFailureScreen } from "./GroupChallengeFailureScreen";
import { GroupCheckInSuccessScreen } from "./GroupCheckInSuccessScreen";
import { RandomCheckInScreen } from "./RandomCheckInScreen";
import { theme } from "../theme/designSystem";

type ChallengeDetails = {
  groupName: string;
  members: number;
  totalPool: number;
  duration: string;
  dailyWindow: string;
};

type GroupChallengeDetailScreenProps = {
  details: ChallengeDetails;
  onBack: () => void;
};

const SAMPLE_LEADERBOARD: LeaderboardEntry[] = [
  { id: "lb-1", rank: 1, memberName: "Rahul", streak: 9, consistency: 93 },
  { id: "lb-2", rank: 2, memberName: "Aisha", streak: 8, consistency: 89 },
  { id: "lb-3", rank: 3, memberName: "Priya", streak: 7, consistency: 86 },
  { id: "lb-4", rank: 4, memberName: "Arjun", streak: 5, consistency: 74 },
];

const UPDATES = [
  "Rahul submitted check-in proof (08:14 PM)",
  "Aisha completed study sprint (07:03 PM)",
  "Priya received 4 upvotes on today's check-in",
];

export function GroupChallengeDetailScreen({ details, onBack }: GroupChallengeDetailScreenProps) {
  const [view, setView] = useState<"detail" | "random-check-in" | "response" | "voting" | "success" | "failure">("detail");

  if (view === "random-check-in") {
    return (
      <RandomCheckInScreen
        habitName="Daily Check-In Proof"
        groupName={details.groupName}
        onRespond={() => setView("response")}
        onClose={() => setView("detail")}
      />
    );
  }

  if (view === "response") {
    return (
      <CheckInResponseScreen
        habitName="Daily Check-In Proof"
        groupName={details.groupName}
        onSubmit={() => setView("voting")}
        onBack={() => setView("detail")}
      />
    );
  }

  if (view === "voting") {
    return (
      <CheckInVotingScreen
        memberName="Rahul"
        responseSummary="Submitted gym check-in photo at 08:14 PM with short note confirmation."
        onBack={() => setView("detail")}
      />
    );
  }

  if (view === "success") {
    return (
      <GroupCheckInSuccessScreen
        streakIncrease={1}
        onGoGroup={() => setView("detail")}
        onGoHome={onBack}
      />
    );
  }

  if (view === "failure") {
    return (
      <GroupChallengeFailureScreen
        groupName={details.groupName}
        reason="Majority downvotes on the submitted check-in."
        poolAmount={details.totalPool}
        duration={details.duration}
        members={details.members}
        onBack={() => setView("detail")}
      />
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Pressable style={styles.iconButton} onPress={onBack}>
          <Feather name="chevron-left" size={18} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Challenge Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.groupName}>{details.groupName}</Text>

        <MoneyPoolBadge amount={details.totalPool} label="Total Pool" />

        <View style={styles.metaGrid}>
          <Meta label="Members" value={String(details.members)} />
          <Meta label="Duration" value={details.duration} />
          <Meta label="Daily Window" value={details.dailyWindow} />
        </View>

        <View style={styles.actionsRow}>
          <Pressable style={styles.urgentAction} onPress={() => setView("random-check-in")}>
            <Text style={styles.urgentActionText}>Trigger Random Check-In</Text>
          </Pressable>
          <Pressable style={styles.secondaryAction} onPress={() => setView("voting")}>
            <Text style={styles.secondaryActionText}>Open Voting UI</Text>
          </Pressable>
        </View>

        <View style={styles.actionsRow}>
          <Pressable style={styles.successAction} onPress={() => setView("success")}>
            <Text style={styles.successActionText}>Open Success State</Text>
          </Pressable>
          <Pressable style={styles.failureAction} onPress={() => setView("failure")}>
            <Text style={styles.failureActionText}>Open Failure State</Text>
          </Pressable>
        </View>
      </View>

      <Leaderboard entries={SAMPLE_LEADERBOARD} />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Check-ins</Text>
        {UPDATES.map((item) => (
          <View key={item} style={styles.updateRow}>
            <View style={styles.dot} />
            <Text style={styles.updateText}>{item}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

type MetaProps = {
  label: string;
  value: string;
};

function Meta({ label, value }: MetaProps) {
  return (
    <View style={styles.metaBox}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
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
  heroCard: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: "#6E2631",
    backgroundColor: "#2A151D",
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  groupName: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.weights.bold,
  },
  metaGrid: {
    flexDirection: "row",
    gap: 8,
  },
  metaBox: {
    flex: 1,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "#60303A",
    backgroundColor: "#341B22",
    padding: 10,
    gap: 2,
  },
  metaLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.caption,
  },
  metaValue: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.semibold,
  },
  card: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  updateRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.group,
    marginTop: 6,
  },
  updateText: {
    flex: 1,
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
    lineHeight: 19,
  },
  actionsRow: {
    marginTop: 4,
    flexDirection: "row",
    gap: 8,
  },
  urgentAction: {
    flex: 1,
    minHeight: 38,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "#7B2A34",
    backgroundColor: "#3B171D",
    justifyContent: "center",
    alignItems: "center",
  },
  urgentActionText: {
    color: theme.colors.group,
    fontSize: 11,
    fontWeight: theme.typography.weights.bold,
  },
  secondaryAction: {
    flex: 1,
    minHeight: 38,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryActionText: {
    color: theme.colors.textPrimary,
    fontSize: 11,
    fontWeight: theme.typography.weights.semibold,
  },
  successAction: {
    flex: 1,
    minHeight: 38,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "#1F5D49",
    backgroundColor: theme.colors.personalSoft,
    justifyContent: "center",
    alignItems: "center",
  },
  successActionText: {
    color: theme.colors.personal,
    fontSize: 11,
    fontWeight: theme.typography.weights.bold,
  },
  failureAction: {
    flex: 1,
    minHeight: 38,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "#7B2A34",
    backgroundColor: "#3B171D",
    justifyContent: "center",
    alignItems: "center",
  },
  failureActionText: {
    color: theme.colors.group,
    fontSize: 11,
    fontWeight: theme.typography.weights.bold,
  },
});
