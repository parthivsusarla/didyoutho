import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/designSystem";

type RandomCheckInScreenProps = {
  habitName: string;
  groupName: string;
  initialSeconds?: number;
  onRespond: () => void;
  onClose: () => void;
};

function formatTimer(totalSeconds: number) {
  const safe = Math.max(totalSeconds, 0);
  const minutes = Math.floor(safe / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (safe % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function RandomCheckInScreen({
  habitName,
  groupName,
  initialSeconds = 300,
  onRespond,
  onClose,
}: RandomCheckInScreenProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((value) => (value > 0 ? value - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.modalCard}>
        <Text style={styles.kicker}>Random Check-In</Text>
        <Text style={styles.title}>Check In Now</Text>

        <Text style={styles.timer}>{formatTimer(secondsLeft)}</Text>
        <Text style={styles.timerHint}>You have 5 minutes to respond.</Text>

        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Habit</Text>
          <Text style={styles.metaValue}>{habitName}</Text>
          <Text style={styles.metaLabel}>Group</Text>
          <Text style={styles.metaValue}>{groupName}</Text>
        </View>

        <Pressable style={styles.respondButton} onPress={onRespond}>
          <Text style={styles.respondButtonText}>Respond Now</Text>
        </Pressable>

        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Dismiss</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0B090C",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  modalCard: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: "#7B2A34",
    backgroundColor: "#2C131A",
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  kicker: {
    color: "#F08A93",
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.semibold,
    letterSpacing: 0.6,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: theme.typography.weights.black,
  },
  timer: {
    color: theme.colors.group,
    fontSize: 42,
    fontWeight: theme.typography.weights.black,
    letterSpacing: 1,
  },
  timerHint: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
  },
  metaBox: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: "#69313A",
    backgroundColor: "#361820",
    padding: theme.spacing.md,
    gap: 3,
  },
  metaLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.caption,
  },
  metaValue: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
    marginBottom: 4,
  },
  respondButton: {
    minHeight: 52,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.group,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  respondButtonText: {
    color: "#2A0A0D",
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  closeButton: {
    minHeight: 44,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: "#6A2A33",
    backgroundColor: "#32161D",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.semibold,
  },
});
