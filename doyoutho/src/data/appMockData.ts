export type UserProfileMock = {
  id: string;
  name: string;
  avatarLabel: string;
  streakDays: number;
  xp: number;
  level: string;
};

export type PersonalTaskMock = {
  id: string;
  taskName: string;
  category: string;
  timeWindow: string;
  frequency: string;
  duration: string;
  completed: boolean;
};

export type GroupTaskMock = {
  id: string;
  taskName: string;
  groupName: string;
  timeWindow: string;
  pendingMessage?: string;
  status: "pending" | "approved" | "failed";
};

export type ActiveGroupMock = {
  id: string;
  name: string;
  completedCount: number;
  totalCount: number;
  poolAmount: number;
  live?: boolean;
  status: "active" | "at-risk" | "won" | "failed";
};

export type RecentActivityMock = {
  id: string;
  name: string;
  action: string;
  timestamp: string;
};

export type LeaderboardMock = {
  id: string;
  rank: number;
  memberName: string;
  streak: number;
  consistency: number;
};

export type ReflectionMock = {
  id: string;
  date: string;
  mood: "Calm" | "Focused" | "Tired" | "Distracted";
  note?: string;
};

export const mockUserProfile: UserProfileMock = {
  id: "user-1",
  name: "DidYouTho User",
  avatarLabel: "DY",
  streakDays: 7,
  xp: 320,
  level: "Steady Builder",
};

export const mockPersonalTasks: PersonalTaskMock[] = [
  {
    id: "pt-1",
    taskName: "Morning walk",
    category: "Fitness",
    timeWindow: "07:00 AM - 08:00 AM",
    frequency: "Daily",
    duration: "30 mins",
    completed: true,
  },
  {
    id: "pt-2",
    taskName: "Deep work sprint",
    category: "Work",
    timeWindow: "10:30 AM - 12:00 PM",
    frequency: "Weekdays",
    duration: "90 mins",
    completed: false,
  },
  {
    id: "pt-3",
    taskName: "Read 15 pages",
    category: "Study",
    timeWindow: "09:00 PM - 09:30 PM",
    frequency: "Daily",
    duration: "30 mins",
    completed: false,
  },
];

export const mockGroupTasks: GroupTaskMock[] = [
  {
    id: "gt-1",
    taskName: "Proof check-in submission",
    groupName: "Weekend Warriors",
    timeWindow: "Random 5-min window",
    pendingMessage: "Pending check-in: 04:12 left",
    status: "pending",
  },
  {
    id: "gt-2",
    taskName: "Study sprint verification",
    groupName: "Night Owls",
    timeWindow: "08:00 PM - 10:00 PM",
    status: "approved",
  },
];

export const mockActiveGroups: ActiveGroupMock[] = [
  { id: "ag-1", name: "Weekend Warriors", completedCount: 3, totalCount: 5, poolAmount: 50, live: true, status: "active" },
  { id: "ag-2", name: "Iron Circle", completedCount: 2, totalCount: 5, poolAmount: 75, status: "at-risk" },
  { id: "ag-3", name: "Study Syndicate", completedCount: 4, totalCount: 6, poolAmount: 120, live: true, status: "active" },
];

export const mockRecentActivity: RecentActivityMock[] = [
  { id: "ra-1", name: "Rahul", action: "completed a 5k run", timestamp: "12m ago" },
  { id: "ra-2", name: "Aisha", action: "checked in for study session", timestamp: "44m ago" },
  { id: "ra-3", name: "Priya", action: "joined Night Owls challenge", timestamp: "2h ago" },
];

export const mockLeaderboard: LeaderboardMock[] = [
  { id: "lb-1", rank: 1, memberName: "Rahul", streak: 9, consistency: 93 },
  { id: "lb-2", rank: 2, memberName: "Aisha", streak: 8, consistency: 89 },
  { id: "lb-3", rank: 3, memberName: "Priya", streak: 7, consistency: 86 },
  { id: "lb-4", rank: 4, memberName: "Arjun", streak: 5, consistency: 74 },
];

export const mockBadges: string[] = [
  "7-day streak",
  "80 percent consistency",
  "first week completed",
];

export const mockReflections: ReflectionMock[] = [
  { id: "rf-1", date: "2026-03-24", mood: "Focused", note: "Morning routine worked. Need less late scrolling." },
  { id: "rf-2", date: "2026-03-25", mood: "Calm", note: "Completed top priorities. Keep same evening schedule." },
  { id: "rf-3", date: "2026-03-26", mood: "Tired" },
];
