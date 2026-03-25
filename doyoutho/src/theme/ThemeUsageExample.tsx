import { StyleSheet, Text, View } from "react-native";
import { getModeGlow, shadows, theme } from "./designSystem";

export function ThemeUsageExample() {
  return (
    <View style={styles.screen}>
      <View style={[styles.card, shadows.md, getModeGlow("personal")]}> 
        <Text style={styles.title}>Personal Streak</Text>
        <Text style={styles.body}>7 days completed. Keep momentum.</Text>
      </View>

      <View style={[styles.card, shadows.md, getModeGlow("group")]}> 
        <Text style={styles.title}>Group Check-In</Text>
        <Text style={styles.body}>Respond within 5 minutes to avoid failure.</Text>
      </View>

      <View style={[styles.badge, shadows.sm]}>
        <Text style={styles.badgeText}>$120 pool reward</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  body: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.body,
    lineHeight: theme.typography.lineHeights.body,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.rewardSoft,
    borderWidth: 1,
    borderColor: "#54431A",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  badgeText: {
    color: theme.colors.reward,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.bold,
  },
});
