import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppTab } from "../types";
import { colors } from "../theme/colors";

type BottomTabBarProps = {
  activeTab: AppTab;
  onTabPress: (tab: AppTab) => void;
};

const tabs: { key: AppTab; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { key: "personal", label: "Personal", icon: "check-square" },
  { key: "overview", label: "Overview", icon: "bar-chart-2" },
  { key: "group", label: "Group", icon: "users" },
];

export function BottomTabBar({ activeTab, onTabPress }: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const active = tab.key === activeTab;
          const accent = tab.key === "group" ? colors.group : colors.personal;

          return (
            <Pressable
              key={tab.key}
              style={styles.tabButton}
              onPress={() => onTabPress(tab.key)}
              android_ripple={{ color: "#1F2A40" }}
            >
              <Feather name={tab.icon} size={18} color={active ? accent : colors.textSecondary} />
              <Text style={[styles.tabText, active && { color: accent }]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 12,
  },
  tabBar: {
    backgroundColor: "#101825",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "700",
  },
});
