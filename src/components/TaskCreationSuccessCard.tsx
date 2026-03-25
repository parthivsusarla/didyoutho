import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/designSystem";

type TaskCreationSuccessCardProps = {
  taskName: string;
  category: string;
  timeWindow: string;
  frequency: string;
  duration: string;
  aiSuggestion?: string;
  onGoHome: () => void;
  onAddAnother: () => void;
};

export function TaskCreationSuccessCard({
  taskName,
  category,
  timeWindow,
  frequency,
  duration,
  aiSuggestion,
  onGoHome,
  onAddAnother,
}: TaskCreationSuccessCardProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <Text style={styles.title}>Task Created</Text>
        <Text style={styles.subtitle}>Your personal task was added successfully.</Text>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Task Summary</Text>
          <Text style={styles.summaryLine}>Name: {taskName}</Text>
          <Text style={styles.summaryLine}>Category: {category}</Text>
          <Text style={styles.summaryLine}>Window: {timeWindow}</Text>
          <Text style={styles.summaryLine}>Frequency: {frequency}</Text>
          <Text style={styles.summaryLine}>Duration: {duration}</Text>
        </View>

        {aiSuggestion ? (
          <View style={styles.aiBox}>
            <Text style={styles.aiTitle}>AI Suggestion</Text>
            <Text style={styles.aiText}>{aiSuggestion}</Text>
          </View>
        ) : null}

        <View style={styles.actions}>
          <Pressable style={styles.secondaryButton} onPress={onGoHome}>
            <Text style={styles.secondaryButtonText}>Back Home</Text>
          </Pressable>
          <Pressable style={styles.primaryButton} onPress={onAddAnother}>
            <Text style={styles.primaryButtonText}>Add Another</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  title: {
    color: theme.colors.personal,
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.weights.bold,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
    lineHeight: 20,
  },
  summaryBox: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cardSoft,
    padding: theme.spacing.md,
    gap: 4,
  },
  summaryTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
    marginBottom: 2,
  },
  summaryLine: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
  },
  aiBox: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: "#215543",
    backgroundColor: theme.colors.personalSoft,
    padding: theme.spacing.md,
    gap: 4,
  },
  aiTitle: {
    color: theme.colors.personal,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.bold,
  },
  aiText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.bodySm,
    lineHeight: 19,
  },
  actions: {
    marginTop: 4,
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  primaryButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: theme.radius.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.personal,
  },
  primaryButtonText: {
    color: "#052017",
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.bold,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: theme.radius.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundElevated,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  secondaryButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
  },
});
