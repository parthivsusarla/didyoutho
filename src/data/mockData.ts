import { GroupChallenge, PersonalHabit, PersonalInsight } from "../types";

export const initialPersonalHabits: PersonalHabit[] = [
  {
    id: "habit-1",
    title: "Morning Walk",
    category: "Health",
    aiSuggestedCategory: "Energy",
    reminder: "07:00 AM",
    completedToday: true,
    streakDays: 5,
  },
  {
    id: "habit-2",
    title: "Deep Work Session",
    category: "Productivity",
    aiSuggestedCategory: "Focus",
    reminder: "10:30 AM",
    completedToday: false,
    streakDays: 9,
  },
  {
    id: "habit-3",
    title: "Read 15 Pages",
    category: "Learning",
    aiSuggestedCategory: "Mindset",
    reminder: "09:15 PM",
    completedToday: false,
    streakDays: 3,
  },
];

export const personalInsight: PersonalInsight = {
  completionRate: 74,
  weeklyCompletions: 19,
  consistencyLevel: "Steady",
  xp: 320,
  nextLevelXP: 500,
};

export const initialGroupChallenges: GroupChallenge[] = [
  {
    id: "grp-1",
    name: "30-Day No Sugar",
    groupName: "Weekend Warriors",
    stakeAmount: 20,
    poolTotal: 120,
    habitWindow: "08:00 AM - 10:00 PM",
    randomCheckInAt: "Random daily check-in",
    responseWindowMinutes: 5,
    fixedRules: [
      "One-time entry fee to join",
      "Random check-in must be answered in 5 minutes",
      "Peer validation via upvote/downvote",
      "Majority downvote means fail",
      "Winners split final pool",
    ],
    votes: {
      upvotes: 4,
      downvotes: 1,
    },
    myVote: "upvote",
    status: "active",
    participants: 6,
    winnersCount: 3,
  },
  {
    id: "grp-2",
    name: "Daily Push-Up Proof",
    groupName: "Iron Circle",
    stakeAmount: 15,
    poolTotal: 75,
    habitWindow: "06:00 AM - 09:00 PM",
    randomCheckInAt: "Today 07:12 PM",
    responseWindowMinutes: 5,
    fixedRules: [
      "Video proof required",
      "No late responses",
      "Three misses = auto fail",
    ],
    votes: {
      upvotes: 2,
      downvotes: 2,
    },
    myVote: undefined,
    status: "at-risk",
    participants: 5,
    winnersCount: 2,
  },
];

export const initialReflection =
  "Felt focused in the morning but dropped pace after lunch. Need a better midday reset.";
