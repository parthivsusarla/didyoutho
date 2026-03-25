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

export type GroupMember = {
  id: string;
  name: string;
};

export type ChallengeLifecycleStatus = "proposed" | "active" | "expired" | "failed" | "won";

export type GroupChallengePoll = {
  id: string;
  question: string;
  proposedBy: string;
  habitName: string;
  timeWindow: string;
  durationDays: number;
  entryFee: number;
  pollDeadlineISO: string;
  minYesVotes: number;
  yesVotes: string[];
  noVotes: string[];
  participants: string[];
  status: "proposed" | "active" | "expired";
};

export type ActiveGroupChallenge = {
  id: string;
  habitName: string;
  timeWindow: string;
  durationDays: number;
  entryFee: number;
  participants: string[];
  poolTotal: number;
  status: "active" | "at-risk" | "won" | "failed";
};

export type GroupChallengeSpace = {
  id: string;
  groupName: string;
  members: GroupMember[];
  polls: GroupChallengePoll[];
  activeChallenges: ActiveGroupChallenge[];
};
