export type AppTab = "personal" | "overview" | "group";

export type PersonalHabit = {
  id: string;
  title: string;
  category: string;
  aiSuggestedCategory: string;
  reminder: string;
  completedToday: boolean;
  streakDays: number;
};

export type GroupVote = "upvote" | "downvote";

export type GroupChallenge = {
  id: string;
  name: string;
  groupName: string;
  stakeAmount: number;
  poolTotal: number;
  habitWindow: string;
  randomCheckInAt: string;
  responseWindowMinutes: number;
  fixedRules: string[];
  votes: {
    upvotes: number;
    downvotes: number;
  };
  myVote?: GroupVote;
  status: "active" | "at-risk" | "failed" | "won";
  participants: number;
  winnersCount: number;
};

export type PersonalInsight = {
  completionRate: number;
  weeklyCompletions: number;
  consistencyLevel: string;
  xp: number;
  nextLevelXP: number;
};
