import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme/designSystem";

type HeatCell = {
  day: string;
  intensity: 0 | 1 | 2 | 3;
};

type WeeklyHeatmapProps = {
  title?: string;
  data?: HeatCell[];
};

const DEFAULT_MOCK_DATA: HeatCell[] = [
  { day: "Mon", intensity: 3 },
  { day: "Tue", intensity: 2 },
  { day: "Wed", intensity: 1 },
  { day: "Thu", intensity: 3 },
  { day: "Fri", intensity: 2 },
  { day: "Sat", intensity: 0 },
  { day: "Sun", intensity: 1 },
];

const intensityMap = {
  0: "#1A2234",
  1: "#1F3C31",
  2: "#1E6A4E",
  3: "#34D399",
} as const;

export function WeeklyHeatmap({ title = "Weekly Consistency", data = DEFAULT_MOCK_DATA }: WeeklyHeatmapProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.grid}>
        {data.map((cell) => (
          <View key={cell.day} style={styles.dayBlock}>
            <View style={[styles.dot, { backgroundColor: intensityMap[cell.intensity] }]} />
            <Text style={styles.dayLabel}>{cell.day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
  dayBlock: {
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  dot: {
    width: 34,
    height: 34,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#2B3A56",
  },
  dayLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.caption,
  },
});
