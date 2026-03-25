import { Feather } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

type FloatingCreateMenuProps = {
  expanded: boolean;
  onToggle: () => void;
  onCreatePersonal: () => void;
  onCreateGroup: () => void;
};

export function FloatingCreateMenu({
  expanded,
  onToggle,
  onCreatePersonal,
  onCreateGroup,
}: FloatingCreateMenuProps) {
  const animate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animate, {
      toValue: expanded ? 1 : 0,
      useNativeDriver: true,
      damping: 15,
      stiffness: 180,
      mass: 0.6,
    }).start();
  }, [animate, expanded]);

  const firstAction = {
    opacity: animate,
    transform: [
      {
        translateY: animate.interpolate({
          inputRange: [0, 1],
          outputRange: [18, -74],
        }),
      },
      {
        scale: animate.interpolate({
          inputRange: [0, 1],
          outputRange: [0.92, 1],
        }),
      },
    ],
  };

  const secondAction = {
    opacity: animate,
    transform: [
      {
        translateY: animate.interpolate({
          inputRange: [0, 1],
          outputRange: [18, -132],
        }),
      },
      {
        scale: animate.interpolate({
          inputRange: [0, 1],
          outputRange: [0.92, 1],
        }),
      },
    ],
  };

  return (
    <View pointerEvents="box-none" style={styles.container}>
      <Animated.View style={[styles.action, firstAction]} pointerEvents={expanded ? "auto" : "none"}>
        <Pressable style={[styles.actionButton, styles.personalAction]} onPress={onCreatePersonal}>
          <Feather name="check-circle" size={16} color={colors.personal} />
          <Text style={styles.actionText}>Create Personal Task</Text>
        </Pressable>
      </Animated.View>

      <Animated.View style={[styles.action, secondAction]} pointerEvents={expanded ? "auto" : "none"}>
        <Pressable style={[styles.actionButton, styles.groupAction]} onPress={onCreateGroup}>
          <Feather name="users" size={16} color={colors.group} />
          <Text style={styles.actionText}>Create Group Challenge</Text>
        </Pressable>
      </Animated.View>

      <Pressable style={styles.fab} onPress={onToggle}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: animate.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "45deg"],
                }),
              },
            ],
          }}
        >
          <Feather name="plus" size={26} color={colors.textPrimary} />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    bottom: 44,
    zIndex: 20,
    alignItems: "center",
  },
  action: {
    position: "absolute",
    width: 220,
  },
  actionButton: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 44,
    backgroundColor: colors.bgElevated,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  personalAction: {
    shadowColor: colors.personal,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  groupAction: {
    shadowColor: colors.group,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  actionText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  fab: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
});
