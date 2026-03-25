import { StyleSheet, View } from "react-native";
import { GroupTaskItem } from "./GroupTaskItem";
import { PersonalTaskItem } from "./PersonalTaskItem";
import { SectionHeader } from "./SectionHeader";
import { theme } from "../../theme/designSystem";

export type TodayTask = {
  id: string;
  title: string;
  timeWindow: string;
  category?: string;
  groupName?: string;
  pendingMessage?: string;
  type: "personal" | "group";
  done: boolean;
};

type TodayTasksListProps = {
  title?: string;
  subtitle?: string;
  tasks: TodayTask[];
  onToggleTask: (taskId: string) => void;
};

export function TodayTasksList({
  title = "Today's Tasks",
  subtitle = "Personal checkboxes + urgent group tasks",
  tasks,
  onToggleTask,
}: TodayTasksListProps) {
  return (
    <View style={styles.wrap}>
      <SectionHeader title={title} subtitle={subtitle} />

      <View style={styles.card}>
        {tasks.map((task) => {
          const isGroup = task.type === "group";
          return (
            <View key={task.id}>
              {isGroup ? (
                <GroupTaskItem
                  taskName={task.title}
                  groupName={task.groupName ?? "Friends Group"}
                  timeWindow={task.timeWindow}
                  pendingMessage={task.pendingMessage}
                />
              ) : (
                <PersonalTaskItem
                  taskName={task.title}
                  category={task.category ?? "Personal"}
                  timeWindow={task.timeWindow}
                  completed={task.done}
                  streakHint={task.done ? "Streak on" : "Build streak"}
                  onToggle={() => onToggleTask(task.id)}
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
});
