import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme/designSystem";

type EmptyStateCardProps = {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
};

export function EmptyStateCard({ icon, title, description }: EmptyStateCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Feather name={icon} size={18} color={theme.colors.textSecondary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

export function NoPersonalTasksEmptyState() {
  return (
    <EmptyStateCard
      icon="check-square"
      title="No personal tasks yet"
      description="Add your first personal task to start building consistency."
    />
  );
}

export function NoActiveGroupsEmptyState() {
  return (
    <EmptyStateCard
      icon="users"
      title="No active groups"
      description="Create or join a challenge to start group accountability."
    />
  );
}

export function NoRecentActivityEmptyState() {
  return (
    <EmptyStateCard
      icon="clock"
      title="No recent activity"
      description="Your updates and group actions will appear here once activity starts."
    />
  );
}

export function NoBadgesYetEmptyState() {
  return (
    <EmptyStateCard
      icon="award"
      title="No badges yet"
      description="Complete tasks consistently to unlock your first milestone badge."
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
    lineHeight: 19,
    textAlign: "center",
    maxWidth: 320,
  },
});
