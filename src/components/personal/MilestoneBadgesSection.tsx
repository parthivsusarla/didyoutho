import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme/designSystem";

type MilestoneBadgesSectionProps = {
  title?: string;
  badges: string[];
};

export function MilestoneBadgesSection({ title = "Milestone Badges", badges }: MilestoneBadgesSectionProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.badgesWrap}>
        {badges.map((badge) => (
          <View key={badge} style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.bold,
  },
  badgesWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: "#1F5D49",
    backgroundColor: theme.colors.personalSoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    color: theme.colors.personal,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
  },
});
