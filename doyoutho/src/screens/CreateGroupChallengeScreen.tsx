import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../theme/designSystem";

type CreateGroupChallengeScreenProps = {
  onBack: () => void;
};

export function CreateGroupChallengeScreen({ onBack }: CreateGroupChallengeScreenProps) {
  const [groupName, setGroupName] = useState("");
  const [habitName, setHabitName] = useState("");
  const [timeWindow, setTimeWindow] = useState("");
  const [duration, setDuration] = useState("");
  const [entryFee, setEntryFee] = useState("");

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Pressable style={styles.iconButton} onPress={onBack}>
          <Feather name="chevron-left" size={18} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Create Group Challenge</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>Important Rule</Text>
        <Text style={styles.warningText}>Challenge rules cannot be changed after creation.</Text>
      </View>

      <View style={styles.formCard}>
        <Field label="Group name">
          <TextInput
            value={groupName}
            onChangeText={setGroupName}
            style={styles.input}
            placeholder="e.g., Weekend Warriors"
            placeholderTextColor={theme.colors.textMuted}
          />
        </Field>

        <Field label="Habit name or habits">
          <TextInput
            value={habitName}
            onChangeText={setHabitName}
            style={styles.input}
            placeholder="e.g., No sugar, 30-min walk"
            placeholderTextColor={theme.colors.textMuted}
          />
        </Field>

        <Field label="Time window">
          <TextInput
            value={timeWindow}
            onChangeText={setTimeWindow}
            style={styles.input}
            placeholder="e.g., 7:00 AM - 9:00 PM"
            placeholderTextColor={theme.colors.textMuted}
          />
        </Field>

        <Field label="Duration">
          <TextInput
            value={duration}
            onChangeText={setDuration}
            style={styles.input}
            placeholder="e.g., 30 days"
            placeholderTextColor={theme.colors.textMuted}
          />
        </Field>

        <Field label="One-time entry fee">
          <TextInput
            value={entryFee}
            onChangeText={setEntryFee}
            style={styles.input}
            placeholder="e.g., ₹50"
            placeholderTextColor={theme.colors.textMuted}
            keyboardType="numeric"
          />
        </Field>

        <Field label="Invite friends">
          <View style={styles.placeholderInvite}>
            <Feather name="users" size={15} color={theme.colors.textSecondary} />
            <Text style={styles.placeholderInviteText}>Add friends placeholder</Text>
          </View>
        </Field>
      </View>

      <Pressable style={styles.createButton}>
        <Text style={styles.createButtonText}>Create Challenge</Text>
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
  headerTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  headerSpacer: {
    width: 36,
  },
  warningBox: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: "#74262E",
    backgroundColor: "#3B171D",
    padding: theme.spacing.md,
    gap: 4,
  },
  warningTitle: {
    color: theme.colors.group,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.bold,
  },
  warningText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.bodySm,
    lineHeight: 19,
  },
  formCard: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: "#5C2028",
    backgroundColor: "#25141A",
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
    borderColor: "#6A2730",
    backgroundColor: "#30171E",
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.sizes.body,
  },
  placeholderInvite: {
    minHeight: 48,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "#6A2730",
    backgroundColor: "#30171E",
    paddingHorizontal: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  placeholderInviteText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
  },
  createButton: {
    minHeight: 50,
    borderRadius: theme.radius.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.group,
  },
  createButtonText: {
    color: "#2A0A0D",
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
});
