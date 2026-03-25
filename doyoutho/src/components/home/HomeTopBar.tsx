import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme/designSystem";

type HomeTopBarProps = {
  streakDays: number;
  xp: number;
  avatarLabel?: string;
  onProfilePress?: () => void;
};

export function HomeTopBar({ streakDays, xp, avatarLabel = "DY", onProfilePress }: HomeTopBarProps) {
  return (
    <View style={styles.row}>
      <View style={styles.badgesWrap}>
        <View style={[styles.badge, styles.streakBadge]}>
          <MaterialCommunityIcons name="fire" size={14} color={theme.colors.personal} />
          <Text style={styles.badgeText}>{streakDays} day streak</Text>
        </View>

        <View style={[styles.badge, styles.xpBadge]}>
          <Feather name="star" size={14} color={theme.colors.reward} />
          <Text style={styles.badgeText}>{xp} XP</Text>
        </View>
      </View>

      <Pressable style={styles.profileButton} onPress={onProfilePress}>
        <Text style={styles.avatarText}>{avatarLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  badgesWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    flex: 1,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: theme.radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
  },
  streakBadge: {
    backgroundColor: theme.colors.personalSoft,
    borderColor: "#1E5A48",
  },
  xpBadge: {
    backgroundColor: theme.colors.rewardSoft,
    borderColor: "#5C4A18",
  },
  badgeText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
  },
  profileButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 4,
  },
  avatarText: {
    color: theme.colors.textPrimary,
    fontSize: 12,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: 0.3,
  },
});
