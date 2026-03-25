import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { TaskCreationSuccessCard } from "../components/TaskCreationSuccessCard";
import { theme } from "../theme/designSystem";

type AddPersonalTaskScreenProps = {
  onBack?: () => void;
  onGoHome?: () => void;
};

export function AddPersonalTaskScreen({ onBack, onGoHome }: AddPersonalTaskScreenProps) {
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("");
  const [timeWindow, setTimeWindow] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [saved, setSaved] = useState(false);

  if (saved) {
    return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TaskCreationSuccessCard
          taskName={taskName || "Untitled Task"}
          category={category || "Auto category"}
          timeWindow={timeWindow || "No window set"}
          frequency={frequency || "Flexible"}
          duration={duration || "15 min"}
          aiSuggestion="You are most consistent in early mornings. Try anchoring this task to your wake-up routine."
          onGoHome={() => {
            setSaved(false);
            onGoHome?.();
          }}
          onAddAnother={() => {
            setTaskName("");
            setCategory("");
            setTimeWindow("");
            setFrequency("");
            setDuration("");
            setSaved(false);
          }}
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Pressable style={styles.iconButton} onPress={onBack}>
          <Feather name="chevron-left" size={18} color={theme.colors.textPrimary} />
        </Pressable>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Add Personal Task</Text>
        <Text style={styles.subtitle}>Set a task with a clear window and schedule. AI suggestions can refine your plan.</Text>
      </View>

      <View style={styles.formCard}>
        <Field label="Task name">
          <TextInput
            value={taskName}
            onChangeText={setTaskName}
            style={styles.input}
            placeholder="e.g., Morning walk"
            placeholderTextColor={theme.colors.textMuted}
          />
        </Field>

        <Field label="Category">
          <TextInput
            value={category}
            onChangeText={setCategory}
            style={styles.input}
            placeholder="Category or auto-category"
            placeholderTextColor={theme.colors.textMuted}
          />
        </Field>

        <Field label="Time window">
          <TextInput
            value={timeWindow}
            onChangeText={setTimeWindow}
            style={styles.input}
            placeholder="e.g., 7:00 AM - 8:00 AM"
            placeholderTextColor={theme.colors.textMuted}
          />
        </Field>

        <Field label="Frequency">
          <TextInput
            value={frequency}
            onChangeText={setFrequency}
            style={styles.input}
            placeholder="e.g., Daily, Weekdays"
            placeholderTextColor={theme.colors.textMuted}
          />
        </Field>

        <Field label="Duration">
          <TextInput
            value={duration}
            onChangeText={setDuration}
            style={styles.input}
            placeholder="e.g., 30 mins"
            placeholderTextColor={theme.colors.textMuted}
          />
        </Field>
      </View>

      <View style={styles.aiBox}>
        <Text style={styles.aiTitle}>AI Suggestion</Text>
        <Text style={styles.aiText}>Based on your pattern, try a 25 minute focus block before lunch for better consistency.</Text>
      </View>

      <Pressable style={styles.saveButton} onPress={() => setSaved(true)}>
        <Text style={styles.saveButtonText}>Save Task</Text>
      </Pressable>
    </ScrollView>
  );
}

type FieldProps = {
  label: string;
  children: React.ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
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
  headerSpacer: {
    width: 36,
  },
  header: {
    gap: 6,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.weights.bold,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
    lineHeight: 20,
  },
  formCard: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  fieldWrap: {
    gap: 6,
  },
  fieldLabel: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.semibold,
  },
  input: {
    minHeight: 48,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cardSoft,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.sizes.body,
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
  saveButton: {
    minHeight: 50,
    borderRadius: theme.radius.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.personal,
  },
  saveButtonText: {
    color: "#052017",
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
});
