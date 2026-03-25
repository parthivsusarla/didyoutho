import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AppCard } from "../components/AppCard";
import { PersonalTaskItem } from "../components/home/PersonalTaskItem";
import { AISuggestionsCard } from "../components/personal/AISuggestionsCard";
import { MilestoneBadgesSection } from "../components/personal/MilestoneBadgesSection";
import { SectionTitle } from "../components/SectionTitle";
import { initialPersonalHabits, personalInsight } from "../data/mockData";
import { DailyReflectionScreen } from "./DailyReflectionScreen";
import { PersonalAnalyticsScreen } from "./PersonalAnalyticsScreen";
import { colors } from "../theme/colors";
export function PersonalScreen() {
  const [view, setView] = useState<"main" | "analytics" | "reflection">("main");
  const [habits, setHabits] = useState(initialPersonalHabits);
  const [reflection, setReflection] = useState(
    "Made progress today. Need to improve my afternoon focus window tomorrow."
  );

  if (view === "analytics") {
    return <PersonalAnalyticsScreen onBack={() => setView("main")} />;
  }

  if (view === "reflection") {
    return <DailyReflectionScreen onBack={() => setView("main")} />;
  }

  const completedCount = habits.filter((habit) => habit.completedToday).length;

  const insight = useMemo(() => {
    const completionRate = Math.round((completedCount / habits.length) * 100);
    return {
      ...personalInsight,
      completionRate,
      weeklyCompletions: 14 + completedCount,
      xp: 250 + completedCount * 30,
    };
  }, [completedCount, habits.length]);

  const onToggleHabit = (id: string) => {
    setHabits((current) =>
      current.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completedToday: !habit.completedToday,
              streakDays: habit.completedToday ? Math.max(habit.streakDays - 1, 0) : habit.streakDays + 1,
            }
          : habit
      )
    );
  };

  const progress = Math.min(insight.xp / insight.nextLevelXP, 1);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.wrapper} showsVerticalScrollIndicator={false}>
      <SectionTitle title="Personal Mode" subtitle="Self-tracking with AI suggestions, fixed reminders, reflections, and light gamification." />

      <View style={styles.quickActionsRow}>
        <Pressable style={styles.quickAction} onPress={() => setView("analytics")}>
          <Text style={styles.quickActionText}>View Analytics</Text>
        </Pressable>
        <Pressable style={styles.quickAction} onPress={() => setView("reflection")}>
          <Text style={styles.quickActionText}>Daily Reflection</Text>
        </Pressable>
      </View>

      <AISuggestionsCard
        suggestions={[
          "You often skip tasks after 9 PM, try moving this earlier.",
          "Fitness is your most skipped category this week.",
        ]}
      />

      <MilestoneBadgesSection badges={["7-day streak", "80 percent consistency", "first week completed"]} />

      <AppCard style={styles.greenGlow}>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>Today&apos;s Habits</Text>
          <Text style={styles.tag}>Flexible</Text>
        </View>

        {habits.map((habit) => (
          <PersonalTaskItem
            key={habit.id}
            taskName={habit.title}
            category={`${habit.category} | AI: ${habit.aiSuggestedCategory}`}
            timeWindow={`Reminder: ${habit.reminder}`}
            completed={habit.completedToday}
            streakHint={`${habit.streakDays}d`}
            onToggle={() => onToggleHabit(habit.id)}
          />
        ))}
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>Analytics + XP</Text>
        <View style={styles.analyticsGrid}>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>{insight.completionRate}%</Text>
            <Text style={styles.metricLabel}>Completion Rate</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>{insight.weeklyCompletions}</Text>
            <Text style={styles.metricLabel}>Weekly Checks</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>{insight.consistencyLevel}</Text>
            <Text style={styles.metricLabel}>Consistency</Text>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          XP {insight.xp} / {insight.nextLevelXP}
        </Text>
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>Daily Reflection</Text>
        <TextInput
          multiline
          value={reflection}
          onChangeText={setReflection}
          placeholder="How did today go?"
          placeholderTextColor={colors.textSecondary}
          style={styles.reflectionInput}
        />
      </AppCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  wrapper: {
    gap: 14,
    paddingBottom: 130,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quickActionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  quickAction: {
    flex: 1,
    minHeight: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
  },
  quickActionText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "700",
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800",
  },
  tag: {
    color: colors.personal,
    fontSize: 11,
    fontWeight: "700",
    backgroundColor: colors.personalSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  greenGlow: {
    shadowColor: colors.personal,
    shadowOpacity: 0.24,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  analyticsGrid: {
    flexDirection: "row",
    gap: 8,
  },
  metricBox: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    minHeight: 72,
    justifyContent: "center",
  },
  metricValue: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800",
  },
  metricLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 3,
  },
  progressTrack: {
    height: 9,
    borderRadius: 999,
    backgroundColor: colors.bgElevated,
    overflow: "hidden",
    marginTop: 6,
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.personal,
  },
  progressText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  reflectionInput: {
    minHeight: 96,
    textAlignVertical: "top",
    borderRadius: 14,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
    padding: 10,
    fontSize: 13,
    lineHeight: 18,
  },
});
