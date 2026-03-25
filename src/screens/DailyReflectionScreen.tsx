import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../theme/designSystem";

type DailyReflectionScreenProps = {
  onBack: () => void;
};

const MOODS = ["Calm", "Focused", "Tired", "Distracted"] as const;

export function DailyReflectionScreen({ onBack }: DailyReflectionScreenProps) {
  const [mood, setMood] = useState<(typeof MOODS)[number]>("Focused");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Daily Reflection</Text>
        <Text style={styles.backText} onPress={onBack}>Back</Text>
      </View>

      <Text style={styles.subtitle}>Quick check-in to keep your routine practical and steady.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Mood</Text>
        <View style={styles.moodRow}>
          {MOODS.map((item) => {
            const active = item === mood;
            return (
              <Pressable key={item} style={[styles.moodChip, active && styles.moodChipActive]} onPress={() => setMood(item)}>
                <Text style={[styles.moodChipText, active && styles.moodChipTextActive]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Optional Note</Text>
        <TextInput
          multiline
          value={note}
          onChangeText={setNote}
          style={styles.input}
          placeholder="What worked today? What should be adjusted tomorrow?"
          placeholderTextColor={theme.colors.textMuted}
        />
      </View>

      <Pressable
        style={styles.saveButton}
        onPress={() => {
          setSaved(true);
        }}
      >
        <Text style={styles.saveButtonText}>Save Reflection</Text>
      </Pressable>

      {saved ? <Text style={styles.savedText}>Saved. Keep building steady consistency.</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: 120,
    gap: theme.spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.title,
    fontWeight: theme.typography.weights.bold,
  },
  backText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.semibold,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
    lineHeight: 20,
  },
  card: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
  },
  moodRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  moodChip: {
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cardSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  moodChipActive: {
    borderColor: "#1F5D49",
    backgroundColor: theme.colors.personalSoft,
  },
  moodChipText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
  },
  moodChipTextActive: {
    color: theme.colors.personal,
  },
  input: {
    minHeight: 110,
    textAlignVertical: "top",
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cardSoft,
    color: theme.colors.textPrimary,
    padding: theme.spacing.md,
    fontSize: theme.typography.sizes.bodySm,
    lineHeight: 19,
  },
  saveButton: {
    minHeight: 50,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.personal,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#052017",
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  savedText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
    textAlign: "center",
  },
});
