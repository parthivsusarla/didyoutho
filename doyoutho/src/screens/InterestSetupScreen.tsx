import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/designSystem";

const CATEGORIES = ["Fitness", "Study", "Work", "Personal Care", "Misc"] as const;

type InterestSetupScreenProps = {
  onContinue: (interests: string[]) => void;
};

export function InterestSetupScreen({ onContinue }: InterestSetupScreenProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const selectedCount = selected.length;
  const canContinue = useMemo(() => selectedCount > 0, [selectedCount]);

  const toggleCategory = (category: string) => {
    setSelected((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Quick Setup</Text>
        <Text style={styles.title}>Choose your habit interests</Text>
        <Text style={styles.subtitle}>Pick at least one category to personalize your dashboard and suggestions.</Text>
      </View>

      <View style={styles.chipGrid}>
        {CATEGORIES.map((category) => {
          const isSelected = selected.includes(category);
          return (
            <Pressable
              key={category}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => toggleCategory(category)}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>{category}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Text style={styles.helper}>{selectedCount} selected</Text>
        <Pressable
          style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
          disabled={!canContinue}
          onPress={() => onContinue(selected)}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 72,
    paddingBottom: 40,
    gap: 24,
  },
  header: {
    gap: 10,
  },
  kicker: {
    color: theme.colors.personal,
    fontSize: 13,
    letterSpacing: 1.2,
    fontWeight: theme.typography.weights.bold,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: theme.typography.weights.black,
    maxWidth: 340,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.body,
    lineHeight: 22,
    maxWidth: 340,
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipSelected: {
    borderColor: theme.colors.personal,
    backgroundColor: theme.colors.personalSoft,
  },
  chipText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.semibold,
  },
  chipTextSelected: {
    color: theme.colors.personal,
  },
  footer: {
    marginTop: "auto",
    gap: 8,
  },
  helper: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.caption,
  },
  continueButton: {
    minHeight: 52,
    borderRadius: theme.radius.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.personal,
  },
  continueButtonDisabled: {
    opacity: 0.45,
  },
  continueButtonText: {
    color: "#052017",
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
});
