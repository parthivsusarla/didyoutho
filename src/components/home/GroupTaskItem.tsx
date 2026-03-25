import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme/designSystem";

type GroupTaskItemProps = {
  taskName: string;
  groupName: string;
  timeWindow: string;
  pendingMessage?: string;
};

export function GroupTaskItem({
  taskName,
  groupName,
  timeWindow,
  pendingMessage,
}: GroupTaskItemProps) {
  return (
    <View style={styles.row}>
      <View style={styles.iconWrap}>
        <Feather name="alert-triangle" size={13} color={theme.colors.group} />
      </View>

      <View style={styles.meta}>
        <Text style={styles.taskName}>{taskName}</Text>
        <Text style={styles.groupName}>{groupName}</Text>
        <Text style={styles.timeWindow}>{timeWindow}</Text>
      </View>

      <View style={styles.rightHintWrap}>
        <View style={styles.typeBadge}>
          <Text style={styles.typeBadgeText}>Group</Text>
        </View>
        {pendingMessage ? <Text style={styles.pendingText}>{pendingMessage}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "#63252D",
    backgroundColor: "#2A161C",
    padding: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
  },
  iconWrap: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: theme.colors.group,
    backgroundColor: "#421A1F",
    alignItems: "center",
    justifyContent: "center",
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
  groupName: {
    color: theme.colors.group,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
  },
  timeWindow: {
    color: "#F5B3BA",
    fontSize: theme.typography.sizes.caption,
  },
  rightHintWrap: {
    alignItems: "flex-end",
    gap: 4,
    maxWidth: 96,
  },
  typeBadge: {
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: "#67252E",
    backgroundColor: "#451B21",
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  typeBadgeText: {
    color: theme.colors.group,
    fontSize: 10,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: 0.3,
  },
  pendingText: {
    color: theme.colors.group,
    fontSize: 10,
    lineHeight: 13,
    textAlign: "right",
    fontWeight: theme.typography.weights.semibold,
  },
});
