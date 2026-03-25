import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/designSystem";

type CheckInVotingScreenProps = {
  memberName: string;
  responseSummary: string;
  onBack: () => void;
};

export function CheckInVotingScreen({ memberName, responseSummary, onBack }: CheckInVotingScreenProps) {
  const [upvotes, setUpvotes] = useState(4);
  const [downvotes, setDownvotes] = useState(1);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Pressable style={styles.iconButton} onPress={onBack}>
          <Feather name="chevron-left" size={18} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Validate Check-In</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.memberCard}>
        <Text style={styles.memberLabel}>Member</Text>
        <Text style={styles.memberName}>{memberName}</Text>
        <Text style={styles.summaryLabel}>Submitted Response</Text>
        <Text style={styles.summaryText}>{responseSummary}</Text>
      </View>

      <View style={styles.votesCard}>
        <Text style={styles.cardTitle}>Current Votes</Text>
        <View style={styles.voteCountRow}>
          <View style={[styles.countPill, styles.upvotePill]}>
            <Text style={styles.countText}>Upvotes: {upvotes}</Text>
          </View>
          <View style={[styles.countPill, styles.downvotePill]}>
            <Text style={styles.countText}>Downvotes: {downvotes}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <Pressable style={[styles.voteButton, styles.upvoteButton]} onPress={() => setUpvotes((v) => v + 1)}>
            <Feather name="thumbs-up" size={15} color={theme.colors.personal} />
            <Text style={styles.voteButtonText}>Upvote</Text>
          </Pressable>

          <Pressable style={[styles.voteButton, styles.downvoteButton]} onPress={() => setDownvotes((v) => v + 1)}>
            <Feather name="thumbs-down" size={15} color={theme.colors.group} />
            <Text style={styles.voteButtonText}>Downvote</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.note}>Majority downvotes means failure (frontend preview only).</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
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
  headerSpacer: {
    width: 36,
  },
  headerTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  memberCard: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    gap: 4,
  },
  memberLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.caption,
  },
  memberName: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.weights.bold,
    marginBottom: 2,
  },
  summaryLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.caption,
  },
  summaryText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
    lineHeight: 19,
  },
  votesCard: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
  },
  voteCountRow: {
    flexDirection: "row",
    gap: 8,
  },
  countPill: {
    flex: 1,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  upvotePill: {
    borderColor: "#1E5A48",
    backgroundColor: theme.colors.personalSoft,
  },
  downvotePill: {
    borderColor: "#67252E",
    backgroundColor: "#451B21",
  },
  countText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
    textAlign: "center",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  voteButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  upvoteButton: {
    borderColor: "#1E5A48",
    backgroundColor: theme.colors.personalSoft,
  },
  downvoteButton: {
    borderColor: "#67252E",
    backgroundColor: "#451B21",
  },
  voteButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.semibold,
  },
  note: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.caption,
    textAlign: "center",
  },
});
