import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { theme } from "../theme/designSystem";

type AuthInputProps = TextInputProps & {
  label: string;
  helperText?: string;
};

export function AuthInput({ label, helperText, style, ...inputProps }: AuthInputProps) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...inputProps}
        style={[styles.input, style]}
        placeholderTextColor={theme.colors.textMuted}
      />
      <Text style={styles.helperText}>{helperText ?? " "}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldWrap: {
    gap: theme.spacing.xs,
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.semibold,
  },
  input: {
    minHeight: 52,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    paddingHorizontal: theme.spacing.md,
  },
  helperText: {
    minHeight: 16,
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.caption,
  },
});
