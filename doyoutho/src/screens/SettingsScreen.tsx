import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/designSystem";

type SettingsScreenProps = {
  onBack: () => void;
};

type SettingsItem = {
  key: string;
  label: string;
  icon: keyof typeof Feather.glyphMap;
  destructive?: boolean;
};

const SETTINGS_ITEMS: SettingsItem[] = [
  { key: "account", label: "Account", icon: "user" },
  { key: "notifications", label: "Notifications", icon: "bell" },
  { key: "reminders", label: "Reminders", icon: "clock" },
  { key: "privacy", label: "Privacy", icon: "shield" },
  { key: "logout", label: "Logout", icon: "log-out", destructive: true },
];

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <Pressable style={styles.iconButton} onPress={onBack}>
          <Feather name="chevron-left" size={18} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.groupCard}>
        {SETTINGS_ITEMS.map((item, index) => (
          <View key={item.key}>
            <Pressable style={styles.itemRow}>
              <View style={styles.itemLeft}>
                <Feather
                  name={item.icon}
                  size={16}
                  color={item.destructive ? theme.colors.group : theme.colors.textSecondary}
                />
                <Text style={[styles.itemText, item.destructive && styles.destructiveText]}>{item.label}</Text>
              </View>
              <Feather name="chevron-right" size={15} color={theme.colors.textMuted} />
            </Pressable>
            {index < SETTINGS_ITEMS.length - 1 ? <View style={styles.separator} /> : null}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: 120,
    gap: theme.spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
  },
  headerSpacer: {
    width: 36,
  },
  headerTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  groupCard: {
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    overflow: "hidden",
  },
  itemRow: {
    minHeight: 54,
    paddingHorizontal: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  itemText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.medium,
  },
  destructiveText: {
    color: theme.colors.group,
    fontWeight: theme.typography.weights.semibold,
  },
  separator: {
    height: 1,
    marginLeft: 44,
    backgroundColor: theme.colors.border,
  },
});
