import { useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { ActiveGroupsCarousel } from "../components/home/ActiveGroupsCarousel";
import { HomeTopBar } from "../components/home/HomeTopBar";
import { RecentActivityFeed } from "../components/home/RecentActivityFeed";
import { SectionHeader } from "../components/home/SectionHeader";
import { TodayTask, TodayTasksList } from "../components/home/TodayTasksList";
import { WeeklyHeatmap } from "../components/home/WeeklyHeatmap";
import { ProfileScreen } from "./ProfileScreen";
import { SettingsScreen } from "./SettingsScreen";
import { theme } from "../theme/designSystem";

export function HomeScreen() {
  const [homeView, setHomeView] = useState<"main" | "profile" | "settings">("main");
  const [tasks, setTasks] = useState<TodayTask[]>([
    { id: "task-1", title: "Morning run", category: "Fitness", timeWindow: "07:00 AM - 08:00 AM", type: "personal", done: true },
    { id: "task-2", title: "Deep work sprint", category: "Work", timeWindow: "10:30 AM - 12:00 PM", type: "personal", done: false },
    {
      id: "task-3",
      title: "Proof check-in submission",
      groupName: "Weekend Warriors",
      pendingMessage: "Pending check-in: 04:12 left",
      timeWindow: "Random 5-min window",
      type: "group",
      done: false,
    },
    { id: "task-4", title: "Read 15 pages", category: "Study", timeWindow: "09:00 PM - 09:30 PM", type: "personal", done: false },
  ]);

  const groups = [
    { id: "grp-1", name: "Weekend Warriors", completedCount: 3, totalCount: 5, pool: 50, live: true, actionLabel: "Watch" },
    { id: "grp-2", name: "Iron Circle", completedCount: 2, totalCount: 5, pool: 75, actionLabel: "Join" },
    { id: "grp-3", name: "Study Syndicate", completedCount: 4, totalCount: 6, pool: 120, live: true, actionLabel: "Watch" },
  ];

  const feed = [
    { id: "feed-1", name: "Rahul", action: "completed a 5k run", timestamp: "12m ago" },
    { id: "feed-2", name: "Aisha", action: "checked in for study session", timestamp: "44m ago" },
    { id: "feed-3", name: "Priya", action: "joined Night Owls challenge", timestamp: "2h ago" },
  ];

  const toggleTask = (taskId: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId && task.type === "personal"
          ? {
              ...task,
              done: !task.done,
            }
          : task
      )
    );
  };

  if (homeView === "profile") {
    return (
      <ProfileScreen
        userName="DidYouTho User"
        streakDays={7}
        xp={320}
        onBack={() => setHomeView("main")}
        onOpenSettings={() => setHomeView("settings")}
      />
    );
  }

  if (homeView === "settings") {
    return <SettingsScreen onBack={() => setHomeView("profile")} />;
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <HomeTopBar streakDays={7} xp={320} onProfilePress={() => setHomeView("profile")} />

      <WeeklyHeatmap />

      <ActiveGroupsCarousel groups={groups} />

      <TodayTasksList tasks={tasks} onToggleTask={toggleTask} />

      <SectionHeader title="Recent Activity" />
      <RecentActivityFeed items={feed} />
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
    paddingTop: theme.spacing.xl,
    paddingBottom: 120,
    gap: theme.spacing.md,
  },
});
