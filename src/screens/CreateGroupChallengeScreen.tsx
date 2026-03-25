import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { GroupChallengePoll } from "../types";
import { theme } from "../theme/designSystem";

type CreateGroupChallengeScreenProps = {
  groupName: string;
  proposedBy: string;
  minYesVotes: number;
  memberCount: number;
  onCreatePoll: (poll: GroupChallengePoll) => void;
  onBack: () => void;
};

export function CreateGroupChallengeScreen({
  groupName,
  proposedBy,
  minYesVotes,
  memberCount,
  onCreatePoll,
  onBack,
}: CreateGroupChallengeScreenProps) {
  const [habitName, setHabitName] = useState("");
  const [timeWindow, setTimeWindow] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [question, setQuestion] = useState("");
  const [deadlineHours, setDeadlineHours] = useState("24");

  const createPoll = () => {
    const parsedDuration = Number(durationDays);
    const parsedFee = Number(entryFee);
    const parsedDeadlineHours = Number(deadlineHours);

    const nextPoll: GroupChallengePoll = {
      id: `poll-${Date.now()}`,
      question:
        question.trim() ||
        `Down for ${habitName.trim() || "this habit"} from ${timeWindow.trim() || "custom time window"} for ${parsedDuration || 7} days?`,
      proposedBy,
      habitName: habitName.trim() || "Custom habit",
      timeWindow: timeWindow.trim() || "Flexible window",
      durationDays: Number.isNaN(parsedDuration) || parsedDuration <= 0 ? 7 : parsedDuration,
      entryFee: Number.isNaN(parsedFee) || parsedFee < 0 ? 0 : parsedFee,
      pollDeadlineISO: new Date(Date.now() + (Number.isNaN(parsedDeadlineHours) ? 24 : parsedDeadlineHours) * 60 * 60 * 1000).toISOString(),
      minYesVotes,
      yesVotes: [],
      noVotes: [],
      participants: [],
      status: "proposed",
    };

    onCreatePoll(nextPoll);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Pressable style={styles.iconButton} onPress={onBack}>
          <Feather name="chevron-left" size={18} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Create Challenge Poll</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>Poll First Flow</Text>
        <Text style={styles.warningText}>
          Challenge activates only after at least {minYesVotes} Yes votes. Money is collected only after poll success.
        </Text>
      </View>

      <View style={styles.formCard}>
        <Field label="Group">
          <View style={styles.readOnlyBox}>
            <Text style={styles.readOnlyText}>{groupName}</Text>
          </View>
        </Field>

        <Field label="Poll question">
          <TextInput
            value={question}
            onChangeText={setQuestion}
            style={styles.input}
            placeholder="Down for a study session from 3 PM to 5 PM for 20 days?"
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
            value={durationDays}
            onChangeText={setDurationDays}
            style={styles.input}
            placeholder="e.g., 20"
            placeholderTextColor={theme.colors.textMuted}
            keyboardType="numeric"
          />
        </Field>

        <Field label="Entry fee (per Yes participant)">
          <TextInput
            value={entryFee}
            onChangeText={setEntryFee}
            style={styles.input}
            placeholder="e.g., 50"
            placeholderTextColor={theme.colors.textMuted}
            keyboardType="numeric"
          />
        </Field>

        <Field label="Poll deadline (hours from now)">
          <TextInput
            value={deadlineHours}
            onChangeText={setDeadlineHours}
            style={styles.input}
            placeholder="e.g., 24"
            placeholderTextColor={theme.colors.textMuted}
            keyboardType="numeric"
          />
        </Field>

        <View style={styles.metaStrip}>
          <Text style={styles.metaStripText}>Minimum Yes votes: {minYesVotes}</Text>
          <Text style={styles.metaStripText}>Group members: {memberCount}</Text>
        </View>
      </View>

      <Pressable style={styles.createButton} onPress={createPoll}>
        <Text style={styles.createButtonText}>Create Poll Proposal</Text>
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
  readOnlyBox: {
    minHeight: 48,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "#6A2730",
    backgroundColor: "#30171E",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.md,
  },
  readOnlyText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
  },
  metaStrip: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: 10,
    gap: 4,
  },
  metaStripText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.caption,
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
