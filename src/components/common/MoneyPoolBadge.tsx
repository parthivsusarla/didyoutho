import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme/designSystem";

type MoneyPoolBadgeProps = {
  amount: number;
  label?: string;
};

export function MoneyPoolBadge({ amount, label = "Pool" }: MoneyPoolBadgeProps) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>₹{amount} {label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: "#6D561A",
    backgroundColor: theme.colors.rewardSoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  text: {
    color: theme.colors.reward,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.bold,
  },
});
