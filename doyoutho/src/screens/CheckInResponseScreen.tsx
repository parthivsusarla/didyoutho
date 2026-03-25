import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../theme/designSystem";

type CheckInResponseScreenProps = {
  habitName: string;
  groupName: string;
  initialSeconds?: number;
  onSubmit: () => void;
  onBack: () => void;
};

function formatTimer(totalSeconds: number) {
  const safe = Math.max(totalSeconds, 0);
  const minutes = Math.floor(safe / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (safe % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function CheckInResponseScreen({
  habitName,
  groupName,
  initialSeconds = 240,
  onSubmit,
  onBack,
}: CheckInResponseScreenProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((value) => (value > 0 ? value - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Pressable style={styles.iconButton} onPress={onBack}>
          <Feather name="chevron-left" size={18} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Respond to Check-In</Text>
        <View style={styles.timerPill}>
          <Text style={styles.timerText}>{formatTimer(secondsLeft)}</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Habit</Text>
        <Text style={styles.infoValue}>{habitName}</Text>
        <Text style={styles.infoLabel}>Group</Text>
        <Text style={styles.infoValue}>{groupName}</Text>
      </View>

      <View style={styles.cameraCard}>
        <Text style={styles.sectionTitle}>Camera Required</Text>
        <View style={styles.cameraPlaceholder}>
          <Feather name="camera" size={24} color={theme.colors.textSecondary} />
          <Text style={styles.cameraText}>Camera capture placeholder</Text>
          <Pressable style={styles.cameraButton}>
            <Text style={styles.cameraButtonText}>Open Camera</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.responseCard}>
        <Text style={styles.sectionTitle}>Short Response</Text>
        <TextInput
          value={response}
          onChangeText={setResponse}
          style={styles.input}
          placeholder="Add a quick confirmation note"
          placeholderTextColor={theme.colors.textMuted}
          multiline
        />
      </View>

      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Submit Check-In</Text>
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
    gap: 8,
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
    flex: 1,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
    marginLeft: 6,
  },
  timerPill: {
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: "#7B2A34",
    backgroundColor: "#3B171D",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  timerText: {
    color: theme.colors.group,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.bold,
  },
  infoCard: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: "#6A2A33",
    backgroundColor: "#31161D",
    padding: theme.spacing.md,
    gap: 3,
  },
  infoLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.caption,
  },
  infoValue: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
    marginBottom: 4,
  },
  cameraCard: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
  },
  cameraPlaceholder: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cardSoft,
    minHeight: 130,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
  },
  cameraText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
  },
  cameraButton: {
    minHeight: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  cameraButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
  },
  responseCard: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  input: {
    minHeight: 90,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cardSoft,
    color: theme.colors.textPrimary,
    padding: theme.spacing.md,
    textAlignVertical: "top",
    fontSize: theme.typography.sizes.bodySm,
  },
  submitButton: {
    minHeight: 50,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.group,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#2A0A0D",
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
});
