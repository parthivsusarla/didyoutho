import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Leaderboard } from "../components/group/Leaderboard";
import { GroupCard } from "../components/home/GroupCard";
import { CreateGroupChallengeScreen } from "./CreateGroupChallengeScreen";
import { GroupChallengeDetailScreen } from "./GroupChallengeDetailScreen";
import { theme } from "../theme/designSystem";

type GroupChallengeItem = {
  id: string;
  name: string;
  completedCount: number;
  totalCount: number;
  poolAmount: number;
  live?: boolean;
  status: "active" | "at-risk" | "won" | "failed";
};

const ACTIVE_CHALLENGES: GroupChallengeItem[] = [
  { id: "active-1", name: "Weekend Warriors", completedCount: 3, totalCount: 5, poolAmount: 50, live: true, status: "active" },
  { id: "active-2", name: "Iron Circle", completedCount: 2, totalCount: 5, poolAmount: 75, status: "at-risk" },
  { id: "active-3", name: "Study Syndicate", completedCount: 4, totalCount: 6, poolAmount: 120, status: "active" },
];

const PAST_CHALLENGES: GroupChallengeItem[] = [
  { id: "past-1", name: "No Sugar Sprint", completedCount: 5, totalCount: 5, poolAmount: 90, status: "won" },
  { id: "past-2", name: "30-Day Pushups", completedCount: 2, totalCount: 5, poolAmount: 60, status: "failed" },
  { id: "past-3", name: "Sunrise Crew", completedCount: 4, totalCount: 5, poolAmount: 100, status: "won" },
];

const STATUS_LABELS = {
  active: "In Progress",
  "at-risk": "At Risk",
  won: "Won",
  failed: "Failed",
} as const;

const STATUS_TONES = {
  active: "neutral",
  "at-risk": "danger",
  won: "positive",
  failed: "danger",
} as const;

const WEEKLY_LEADERBOARD = [
  { id: "p-1", rank: 1, memberName: "Rahul", streak: 9, consistency: 93 },
  { id: "p-2", rank: 2, memberName: "Aisha", streak: 8, consistency: 89 },
  { id: "p-3", rank: 3, memberName: "Priya", streak: 7, consistency: 86 },
  { id: "p-4", rank: 4, memberName: "Arjun", streak: 5, consistency: 74 },
];

export function GroupsScreen() {
  const [tab, setTab] = useState<"active" | "past">("active");
  const [screen, setScreen] = useState<"list" | "create" | "detail">("list");
  const [selectedChallenge, setSelectedChallenge] = useState<GroupChallengeItem | null>(null);

  const items = tab === "active" ? ACTIVE_CHALLENGES : PAST_CHALLENGES;

  if (screen === "create") {
    return <CreateGroupChallengeScreen onBack={() => setScreen("list")} />;
  }

  if (screen === "detail" && selectedChallenge) {
    return (
      <GroupChallengeDetailScreen
        onBack={() => setScreen("list")}
        details={{
          groupName: selectedChallenge.name,
          members: 6,
          totalPool: selectedChallenge.poolAmount,
          duration: "30 days",
          dailyWindow: "07:00 AM - 10:00 PM",
        }}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
      <View style={styles.headerRow}>
        <View style={styles.headerTextWrap}>
          <Text style={styles.title}>Group Challenges</Text>
          <Text style={styles.subtitle}>
            Friends-only challenges with pool stakes, random check-ins, and social validation.
          </Text>
        </View>

        <Pressable style={styles.createButton} onPress={() => setScreen("create")}>
          <Text style={styles.createButtonText}>Create</Text>
        </Pressable>
      </View>

      <View style={styles.segmentedWrap}>
        <Pressable style={[styles.segmentButton, tab === "active" && styles.segmentButtonActive]} onPress={() => setTab("active")}>
          <Text style={[styles.segmentText, tab === "active" && styles.segmentTextActive]}>Active</Text>
        </Pressable>
        <Pressable style={[styles.segmentButton, tab === "past" && styles.segmentButtonActive]} onPress={() => setTab("past")}>
          <Text style={[styles.segmentText, tab === "past" && styles.segmentTextActive]}>Past</Text>
        </Pressable>
      </View>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          tab === "active" ? (
            <View style={styles.leaderboardWrap}>
              <Leaderboard title="Top Performers This Week" entries={WEEKLY_LEADERBOARD} />
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <GroupCard
            groupName={item.name}
            completedCount={item.completedCount}
            totalCount={item.totalCount}
            poolAmount={item.poolAmount}
            live={item.live}
            statusText={STATUS_LABELS[item.status]}
            statusTone={STATUS_TONES[item.status]}
            actionLabel={tab === "active" ? "Watch" : "View"}
            onActionPress={() => {
              setSelectedChallenge(item);
              setScreen("detail");
            }}
            containerStyle={styles.listCard}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  headerTextWrap: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 28,
    fontWeight: "900",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  createButton: {
    marginTop: 2,
    minHeight: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#702A33",
    backgroundColor: "#3B171D",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  createButtonText: {
    color: theme.colors.group,
    fontSize: 12,
    fontWeight: "800",
  },
  segmentedWrap: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: 4,
    gap: 4,
  },
  segmentButton: {
    flex: 1,
    minHeight: 36,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentButtonActive: {
    backgroundColor: theme.colors.backgroundElevated,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  segmentText: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: "700",
  },
  segmentTextActive: {
    color: theme.colors.textPrimary,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 130,
    gap: 10,
  },
  leaderboardWrap: {
    marginBottom: 8,
  },
  listCard: {
    width: "100%",
  },
});
