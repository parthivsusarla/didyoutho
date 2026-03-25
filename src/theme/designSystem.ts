import { ViewStyle } from "react-native";

export const theme = {
  colors: {
    brand: "#3B82F6",
    brandStrong: "#2563EB",
    background: "#090E14",
    backgroundElevated: "#121926",
    card: "#141D2D",
    cardSoft: "#1A2437",
    border: "#26324A",
    textPrimary: "#F4F7FF",
    textSecondary: "#9AA9C4",
    textMuted: "#6B7A96",
    personal: "#34D399",
    personalSoft: "#11372D",
    group: "#EF4444",
    groupSoft: "#3A1719",
    reward: "#F5C84B",
    rewardSoft: "#3D3212",
    info: "#60A5FA",
    gradientStart: "#060A11",
    gradientMid: "#0A1220",
    gradientEnd: "#111A2A",
  },
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 28,
  },
  radius: {
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
    pill: 999,
  },
  typography: {
    sizes: {
      caption: 11,
      bodySm: 12,
      body: 14,
      subtitle: 16,
      title: 22,
      display: 28,
    },
    lineHeights: {
      tight: 16,
      body: 20,
      relaxed: 24,
    },
    weights: {
      regular: "400" as const,
      medium: "500" as const,
      semibold: "600" as const,
      bold: "700" as const,
      black: "900" as const,
    },
  },
} as const;

export type ShadowLevel = "sm" | "md" | "lg";

type ModeTone = "personal" | "group" | "reward";

export const getShadow = (level: ShadowLevel, color = "#000000"): ViewStyle => {
  if (level === "sm") {
    return {
      shadowColor: color,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    };
  }

  if (level === "md") {
    return {
      shadowColor: color,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 5,
    };
  }

  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.32,
    shadowRadius: 12,
    elevation: 9,
  };
};

export const getModeGlow = (tone: ModeTone): ViewStyle => {
  const colorByMode = {
    personal: theme.colors.personal,
    group: theme.colors.group,
    reward: theme.colors.reward,
  } as const;

  return {
    ...getShadow("md", colorByMode[tone]),
    shadowOpacity: 0.28,
    elevation: 6,
  };
};

export const elevation = {
  level1: getShadow("sm"),
  level2: getShadow("md"),
  level3: getShadow("lg"),
};

export const shadows = {
  sm: getShadow("sm"),
  md: getShadow("md"),
  lg: getShadow("lg"),
  personalGlow: getModeGlow("personal"),
  groupGlow: getModeGlow("group"),
  rewardGlow: getModeGlow("reward"),
} as const;
