import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme/designSystem";

type ActivityItem = {
  id: string;
  name: string;
  action: string;
  timestamp: string;
};

type RecentActivityFeedProps = {
  items: ActivityItem[];
};

export function RecentActivityFeed({ items }: RecentActivityFeedProps) {
  return (
    <View style={styles.card}>
      {items.map((item) => {
        const initials = item.name
          .split(" ")
          .map((part) => part[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        return (
          <View key={item.id} style={styles.row}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <View style={styles.meta}>
              <Text style={styles.text}>
                <Text style={styles.name}>{item.name}</Text> {item.action}
              </Text>
              <Text style={styles.time}>{item.timestamp}</Text>
            </View>
          </View>
        );
      })}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cardSoft,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: theme.colors.textPrimary,
    fontSize: 11,
    fontWeight: theme.typography.weights.bold,
  },
  meta: {
    flex: 1,
    gap: 2,
  },
  name: {
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.weights.bold,
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.bodySm,
    lineHeight: 18,
  },
  time: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.caption,
  },
});
