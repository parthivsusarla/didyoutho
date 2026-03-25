import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";
import { theme } from "../theme/designSystem";

type GoogleAuthButtonProps = {
  label: string;
  onPress: () => void;
};

export function GoogleAuthButton({ label, onPress }: GoogleAuthButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Feather name="chrome" size={16} color={theme.colors.textPrimary} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
  },
});
