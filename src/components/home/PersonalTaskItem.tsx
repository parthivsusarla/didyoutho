import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme/designSystem";

type PersonalTaskItemProps = {
  taskName: string;
  category: string;
  timeWindow: string;
  completed: boolean;
  streakHint?: string;
  onToggle?: () => void;
};

export function PersonalTaskItem({
  taskName,
  category,
  timeWindow,
  completed,
  streakHint,
  onToggle,
}: PersonalTaskItemProps) {
  return (
    <Pressable style={styles.row} onPress={onToggle}>
      <View style={[styles.checkbox, completed && styles.checkboxDone]}>
        {completed ? <Feather name="check" size={13} color={theme.colors.background} /> : null}
      </View>

      <View style={styles.meta}>
        <Text style={[styles.taskName, completed && styles.completedTaskName]}>{taskName}</Text>
        <Text style={styles.subline}>{category}</Text>
        <Text style={styles.subline}>{timeWindow}</Text>
      </View>

      <View style={styles.rightHintWrap}>
        <View style={styles.typeBadge}>
          <Text style={styles.typeBadgeText}>Personal</Text>
        </View>
        {streakHint ? <Text style={styles.streakHint}>{streakHint}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cardSoft,
    padding: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: theme.colors.border,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxDone: {
    borderColor: theme.colors.personal,
    backgroundColor: theme.colors.personal,
  },
  meta: {
    flex: 1,
    gap: 2,
  },
  taskName: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
  },
  completedTaskName: {
    color: theme.colors.textSecondary,
    textDecorationLine: "line-through",
  },
  subline: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.caption,
  },
  rightHintWrap: {
    alignItems: "flex-end",
    gap: 4,
  },
  typeBadge: {
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: "#1F5D49",
    backgroundColor: theme.colors.personalSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  typeBadgeText: {
    color: theme.colors.personal,
    fontSize: 10,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: 0.3,
  },
  streakHint: {
    color: theme.colors.personal,
    fontSize: 10,
    fontWeight: theme.typography.weights.semibold,
  },
});
