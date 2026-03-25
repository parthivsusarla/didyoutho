import { ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/designSystem";

type PersonalAnalyticsScreenProps = {
  onBack: () => void;
};

export function PersonalAnalyticsScreen({ onBack }: PersonalAnalyticsScreenProps) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Personal Analytics</Text>
        <Text style={styles.backText} onPress={onBack}>Back</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Consistency</Text>
        <View style={styles.weekRow}>
          {[3, 2, 1, 3, 2, 0, 1].map((level, i) => (
            <View key={i} style={[styles.weekDot, { opacity: 0.25 + level * 0.25 }]} />
          ))}
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>82%</Text>
          <Text style={styles.metricLabel}>Completion</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>11 days</Text>
          <Text style={styles.metricLabel}>Longest Streak</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Most Skipped Category</Text>
        <Text style={styles.skipText}>Study</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Milestone Badges</Text>
        <View style={styles.badgesRow}>
          <View style={styles.badge}><Text style={styles.badgeText}>7-Day Streak</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>100 XP</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>Consistency Pro</Text></View>
        </View>
      </View>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.weights.bold,
  },
  backText: {
    color: theme.colors.textSecondary,
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
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekDot: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: theme.colors.personal,
  },
  metricsGrid: { flexDirection: "row", gap: theme.spacing.sm },
  metricCard: {
    flex: 1,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
  },
  metricValue: {
    color: theme.colors.personal,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  metricLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.caption,
    marginTop: 2,
  },
  skipText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
  },
  badgesRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  badge: {
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cardSoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.caption,
  },
});
