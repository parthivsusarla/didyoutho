import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { GroupCard } from "../components/home/GroupCard";
import { GroupChallengePollDetailsScreen } from "./GroupChallengePollDetailsScreen";
import { CreateGroupChallengeScreen } from "./CreateGroupChallengeScreen";
import { GroupChallengeDetailScreen } from "./GroupChallengeDetailScreen";
import { mockCurrentUserId, mockGroupChallengeSpaces } from "../data/appMockData";
import { GroupChallengePoll, GroupChallengeSpace } from "../types";
import { theme } from "../theme/designSystem";

type GroupsView = "list" | "detail" | "create-poll" | "poll-details";

export function GroupsScreen() {
  const [groups, setGroups] = useState<GroupChallengeSpace[]>(mockGroupChallengeSpaces);
  const [screen, setScreen] = useState<GroupsView>("list");
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedPollId, setSelectedPollId] = useState<string | null>(null);

  const selectedGroup = useMemo(
    () => groups.find((group) => group.id === selectedGroupId) ?? null,
    [groups, selectedGroupId]
  );

  const selectedPoll = useMemo(
    () => selectedGroup?.polls.find((poll) => poll.id === selectedPollId) ?? null,
    [selectedGroup, selectedPollId]
  );

  const handleCreatePoll = (nextPoll: GroupChallengePoll) => {
    if (!selectedGroupId) {
      return;
    }

    setGroups((current) =>
      current.map((group) =>
        group.id === selectedGroupId
          ? {
              ...group,
              polls: [nextPoll, ...group.polls],
            }
          : group
      )
    );

    setSelectedPollId(nextPoll.id);
    setScreen("poll-details");
  };

  const handleVote = (vote: "yes" | "no") => {
    if (!selectedGroupId || !selectedPollId) {
      return;
    }

    setGroups((current) =>
      current.map((group) => {
        if (group.id !== selectedGroupId) {
          return group;
        }

        return {
          ...group,
          polls: group.polls.map((poll) => {
            if (poll.id !== selectedPollId || poll.status !== "proposed") {
              return poll;
            }

            const yesVotes = poll.yesVotes.filter((id) => id !== mockCurrentUserId);
            const noVotes = poll.noVotes.filter((id) => id !== mockCurrentUserId);

            if (vote === "yes") {
              yesVotes.push(mockCurrentUserId);
            } else {
              noVotes.push(mockCurrentUserId);
            }

            return {
              ...poll,
              yesVotes,
              noVotes,
              participants: yesVotes,
            };
          }),
        };
      })
    );
  };

  const handleActivatePoll = () => {
    if (!selectedGroupId || !selectedPollId) {
      return;
    }

    setGroups((current) =>
      current.map((group) => {
        if (group.id !== selectedGroupId) {
          return group;
        }

        const poll = group.polls.find((item) => item.id === selectedPollId);
        if (!poll || poll.status !== "proposed" || poll.yesVotes.length < poll.minYesVotes) {
          return group;
        }

        return {
          ...group,
          polls: group.polls.map((item) =>
            item.id === selectedPollId
              ? {
                  ...item,
                  status: "active",
                  participants: item.yesVotes,
                }
              : item
          ),
          activeChallenges: [
            {
              id: `challenge-${poll.id}`,
              habitName: poll.habitName,
              timeWindow: poll.timeWindow,
              durationDays: poll.durationDays,
              entryFee: poll.entryFee,
              participants: poll.yesVotes,
              poolTotal: poll.yesVotes.length * poll.entryFee,
              status: "active",
            },
            ...group.activeChallenges,
          ],
        };
      })
    );
  };

  if (screen === "create-poll" && selectedGroup) {
    return (
      <CreateGroupChallengeScreen
        groupName={selectedGroup.groupName}
        proposedBy="Aisha"
        minYesVotes={Math.max(2, Math.ceil(selectedGroup.members.length / 2))}
        memberCount={selectedGroup.members.length}
        onCreatePoll={handleCreatePoll}
        onBack={() => setScreen("detail")}
      />
    );
  }

  if (screen === "poll-details" && selectedGroup && selectedPoll) {
    return (
      <GroupChallengePollDetailsScreen
        poll={selectedPoll}
        groupName={selectedGroup.groupName}
        memberCount={selectedGroup.members.length}
        currentUserId={mockCurrentUserId}
        onVote={handleVote}
        onActivate={handleActivatePoll}
        onBack={() => setScreen("detail")}
      />
    );
  }

  if (screen === "detail" && selectedGroup) {
    return (
      <GroupChallengeDetailScreen
        group={selectedGroup}
        onBack={() => setScreen("list")}
        onOpenCreatePoll={() => setScreen("create-poll")}
        onOpenPoll={(pollId) => {
          setSelectedPollId(pollId);
          setScreen("poll-details");
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
            <Text style={styles.subtitle}>Poll-based challenge creation for friends-only groups.</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const activeChallenge = item.activeChallenges[0];
          const openPollCount = item.polls.filter((poll) => poll.status === "proposed").length;

          return (
            <GroupCard
              groupName={item.groupName}
              completedCount={activeChallenge ? activeChallenge.participants.length : 0}
              totalCount={item.members.length}
              poolAmount={activeChallenge ? activeChallenge.poolTotal : 0}
              live={Boolean(activeChallenge)}
              statusText={openPollCount > 0 ? `${openPollCount} open poll${openPollCount > 1 ? "s" : ""}` : "No open polls"}
              statusTone={openPollCount > 0 ? "danger" : "neutral"}
              actionLabel="Open"
              onActionPress={() => {
                setSelectedGroupId(item.id);
                setScreen("detail");
              }}
              containerStyle={styles.listCard}
            />
          );
        }}
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
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 130,
    gap: 10,
  },
  listCard: {
    width: "100%",
  },
});
