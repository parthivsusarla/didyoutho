import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { AppCard } from "../components/AppCard";
import { SectionTitle } from "../components/SectionTitle";
import { colors } from "../theme/colors";
import { GroupChallenge, PersonalHabit } from "../types";

type OverviewScreenProps = {
  habits: PersonalHabit[];
  groupChallenges: GroupChallenge[];
};

export function OverviewScreen({ habits, groupChallenges }: OverviewScreenProps) {
  const completed = habits.filter((h) => h.completedToday).length;
  const downvoteRisks = groupChallenges.filter((c) => c.votes.downvotes >= c.votes.upvotes).length;
  const totalPool = groupChallenges.reduce((sum, challenge) => sum + challenge.poolTotal, 0);

  return (
    <View style={styles.wrapper}>
      <SectionTitle
        title="Overview"
        subtitle="A blended view of solo consistency and competitive challenge pressure."
      />

      <View style={styles.metricsRow}>
        <AppCard style={styles.metricCard}>
          <Feather name="check-circle" size={16} color={colors.personal} />
          <Text style={styles.metricValue}>{completed}</Text>
          <Text style={styles.metricLabel}>Done Today</Text>
        </AppCard>

        <AppCard style={styles.metricCard}>
          <Feather name="alert-triangle" size={16} color={colors.group} />
          <Text style={styles.metricValue}>{downvoteRisks}</Text>
          <Text style={styles.metricLabel}>Vote Risks</Text>
        </AppCard>

        <AppCard style={styles.metricCard}>
          <Feather name="award" size={16} color={colors.gold} />
          <Text style={styles.metricValue}>${totalPool}</Text>
          <Text style={styles.metricLabel}>Pool Total</Text>
        </AppCard>
      </View>

      <AppCard>
        <Text style={styles.cardTitle}>Mode Balance</Text>
        <Text style={styles.bodyText}>
          Personal mode keeps your baseline consistency high. Group mode adds consequence and accountability through money and peer validation.
        </Text>
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>Today&apos;s Pulse</Text>
        <View style={styles.legendRow}>
          <View style={[styles.dot, { backgroundColor: colors.personal }]} />
          <Text style={styles.legendText}>Green means personal momentum</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.dot, { backgroundColor: colors.group }]} />
          <Text style={styles.legendText}>Red means group urgency</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.dot, { backgroundColor: colors.gold }]} />
          <Text style={styles.legendText}>Gold tracks stake and payout value</Text>
        </View>
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 14,
    paddingBottom: 130,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 8,
  },
  metricCard: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: 100,
  },
  metricValue: {
    color: colors.textPrimary,
    fontWeight: "800",
    fontSize: 18,
  },
  metricLabel: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "800",
  },
  bodyText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  legendText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
