import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme/designSystem";

type AISuggestionsCardProps = {
  title?: string;
  suggestions: string[];
};

export function AISuggestionsCard({ title = "AI Suggestions", suggestions }: AISuggestionsCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Feather name="cpu" size={15} color={theme.colors.personal} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.list}>
        {suggestions.map((item) => (
          <View key={item} style={styles.itemRow}>
            <View style={styles.bullet} />
            <Text style={styles.itemText}>{item}</Text>
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
    borderColor: "#1E5A48",
    backgroundColor: theme.colors.personalSoft,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  title: {
    color: theme.colors.personal,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.bold,
  },
  list: {
    gap: 8,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.personal,
    marginTop: 6,
  },
  itemText: {
    flex: 1,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.bodySm,
    lineHeight: 19,
  },
});
