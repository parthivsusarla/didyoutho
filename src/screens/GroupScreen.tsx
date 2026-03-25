import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppCard } from "../components/AppCard";
import { SectionTitle } from "../components/SectionTitle";
import { colors } from "../theme/colors";
import { GroupChallenge, GroupVote } from "../types";

type GroupScreenProps = {
  challenges: GroupChallenge[];
  onVote: (challengeId: string, vote: GroupVote) => void;
};

export function GroupScreen({ challenges, onVote }: GroupScreenProps) {
  return (
    <View style={styles.wrapper}>
      <SectionTitle
        title="Group Mode"
        subtitle="Friends-only challenges with fixed rules, random check-ins, 5-minute responses, and peer voting."
      />

      {challenges.map((challenge) => {
        const danger = challenge.status === "at-risk" || challenge.status === "failed";
        const downvoteLeading = challenge.votes.downvotes > challenge.votes.upvotes;

        return (
          <AppCard key={challenge.id} style={danger ? styles.redGlow : undefined}>
            <View style={styles.rowBetween}>
              <View style={styles.titleWrap}>
                <Text style={styles.cardTitle}>{challenge.name}</Text>
                <Text style={styles.groupName}>{challenge.groupName}</Text>
              </View>

              <View style={styles.poolBadge}>
                <Feather name="dollar-sign" size={13} color={colors.gold} />
                <Text style={styles.poolText}>${challenge.poolTotal}</Text>
              </View>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>Stake ${challenge.stakeAmount}</Text>
              <Text style={styles.metaText}>{challenge.participants} players</Text>
              <Text style={styles.metaText}>{challenge.winnersCount} winners</Text>
            </View>

            <View style={styles.alertBox}>
              <Text style={styles.alertTitle}>Random check-in: {challenge.randomCheckInAt}</Text>
              <Text style={styles.alertSub}>
                Reply window: {challenge.responseWindowMinutes} minutes in {challenge.habitWindow}
              </Text>
            </View>

            <View style={styles.ruleWrap}>
              {challenge.fixedRules.map((rule, index) => (
                <Text key={rule + index} style={styles.ruleText}>
                  • {rule}
                </Text>
              ))}
            </View>

            <View style={styles.voteRow}>
              <Pressable
                onPress={() => onVote(challenge.id, "upvote")}
                style={[
                  styles.voteButton,
                  challenge.myVote === "upvote" && styles.activeUpvote,
                ]}
              >
                <Feather name="thumbs-up" size={14} color={colors.personal} />
                <Text style={styles.voteText}>Upvote {challenge.votes.upvotes}</Text>
              </Pressable>

              <Pressable
                onPress={() => onVote(challenge.id, "downvote")}
                style={[
                  styles.voteButton,
                  challenge.myVote === "downvote" && styles.activeDownvote,
                ]}
              >
                <Feather name="thumbs-down" size={14} color={colors.group} />
                <Text style={styles.voteText}>Downvote {challenge.votes.downvotes}</Text>
              </Pressable>
            </View>

            <Text style={[styles.statusText, downvoteLeading && styles.failRiskText]}>
              {downvoteLeading
                ? "Majority downvote risk: this challenge would fail right now"
                : "Currently safe: upvotes are holding majority"}
            </Text>
          </AppCard>
        );
      })}

      <AppCard style={styles.payoutCard}>
        <Text style={styles.cardTitle}>Pool Payout Logic</Text>
        <Text style={styles.payoutText}>
          At challenge end, all participants with successful validations share the money pool equally.
        </Text>
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 14,
    paddingBottom: 130,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleWrap: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800",
  },
  groupName: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  poolBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    backgroundColor: colors.goldSoft,
    borderWidth: 1,
    borderColor: "#54431A",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  poolText: {
    color: colors.gold,
    fontWeight: "800",
  },
  metaRow: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  alertBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#592026",
    backgroundColor: colors.groupSoft,
    padding: 10,
    gap: 4,
  },
  alertTitle: {
    color: "#FCA5A5",
    fontWeight: "700",
    fontSize: 12,
  },
  alertSub: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  ruleWrap: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgElevated,
    padding: 10,
    gap: 4,
  },
  ruleText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  voteRow: {
    flexDirection: "row",
    gap: 10,
  },
  voteButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgElevated,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  voteText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "700",
  },
  activeUpvote: {
    borderColor: colors.personal,
    backgroundColor: colors.personalSoft,
  },
  activeDownvote: {
    borderColor: colors.group,
    backgroundColor: colors.groupSoft,
  },
  statusText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  failRiskText: {
    color: "#FDA4AF",
  },
  redGlow: {
    shadowColor: colors.group,
    shadowOpacity: 0.24,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  payoutCard: {
    borderColor: "#5A4714",
    backgroundColor: "#1C1608",
  },
  payoutText: {
    color: "#E7D4A2",
    fontSize: 12,
    lineHeight: 18,
  },
});
