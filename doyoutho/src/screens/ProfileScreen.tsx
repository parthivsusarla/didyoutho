import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/designSystem";

type ProfileScreenProps = {
  userName: string;
  streakDays: number;
  xp: number;
  onBack: () => void;
  onOpenSettings: () => void;
};

export function ProfileScreen({ userName, streakDays, xp, onBack, onOpenSettings }: ProfileScreenProps) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Pressable style={styles.iconButton} onPress={onBack}>
          <Feather name="chevron-left" size={18} color={theme.colors.textPrimary} />
        </Pressable>

        <Text style={styles.headerTitle}>Profile</Text>

        <Pressable style={styles.iconButton} onPress={onOpenSettings}>
          <Feather name="settings" size={16} color={theme.colors.textPrimary} />
        </Pressable>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>DY</Text>
        </View>
        <Text style={styles.userName}>{userName}</Text>

        <View style={styles.summaryRow}>
          <View style={[styles.summaryPill, styles.streakPill]}>
            <Feather name="zap" size={14} color={theme.colors.personal} />
            <Text style={styles.summaryText}>{streakDays} day streak</Text>
          </View>

          <View style={[styles.summaryPill, styles.xpPill]}>
            <Feather name="star" size={14} color={theme.colors.reward} />
            <Text style={styles.summaryText}>{xp} XP</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Badges</Text>
        <View style={styles.badgesRow}>
          <View style={styles.badge}><Text style={styles.badgeText}>Consistency</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>Early Bird</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>Team Player</Text></View>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Personal Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCell}>
            <Text style={styles.statValue}>82%</Text>
            <Text style={styles.statLabel}>Completion</Text>
          </View>
          <View style={styles.statCell}>
            <Text style={styles.statValue}>21</Text>
            <Text style={styles.statLabel}>Weekly Checks</Text>
          </View>
          <View style={styles.statCell}>
            <Text style={styles.statValue}>9</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </View>
        </View>
      </View>

      <View style={[styles.sectionCard, styles.groupCard]}>
        <Text style={styles.sectionTitle}>Group Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCell}>
            <Text style={[styles.statValue, styles.groupValue]}>4</Text>
            <Text style={styles.statLabel}>Active Groups</Text>
          </View>
          <View style={styles.statCell}>
            <Text style={[styles.statValue, styles.groupValue]}>14</Text>
            <Text style={styles.statLabel}>Validated Check-ins</Text>
          </View>
          <View style={styles.statCell}>
            <Text style={[styles.statValue, styles.groupValue]}>₹240</Text>
            <Text style={styles.statLabel}>Pool Wins</Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.settingsButton} onPress={onOpenSettings}>
        <Text style={styles.settingsButtonText}>Open Settings</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
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
  headerTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  profileCard: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    alignItems: "center",
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: theme.typography.weights.bold,
  },
  userName: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.weights.bold,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 8,
  },
  summaryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  streakPill: {
    backgroundColor: theme.colors.personalSoft,
    borderColor: "#1E5A48",
  },
  xpPill: {
    backgroundColor: theme.colors.rewardSoft,
    borderColor: "#5C4A18",
  },
  summaryText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
  },
  sectionCard: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  groupCard: {
    borderColor: "#5A1F26",
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
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
  statsGrid: {
    flexDirection: "row",
    gap: 8,
  },
  statCell: {
    flex: 1,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    padding: 10,
    gap: 3,
  },
  statValue: {
    color: theme.colors.personal,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  groupValue: {
    color: theme.colors.group,
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.caption,
  },
  settingsButton: {
    minHeight: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.backgroundElevated,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
  },
});
