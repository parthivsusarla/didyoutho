import { Feather } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/designSystem";

type ExpandableFabProps = {
  expanded: boolean;
  onToggle: () => void;
  onClose: () => void;
  onCreatePersonal: () => void;
  onCreateGroup: () => void;
};

export function ExpandableFab({
  expanded,
  onToggle,
  onClose,
  onCreatePersonal,
  onCreateGroup,
}: ExpandableFabProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(progress, {
      toValue: expanded ? 1 : 0,
      useNativeDriver: true,
      damping: 18,
      stiffness: 220,
      mass: 0.65,
    }).start();
  }, [expanded, progress]);

  const backdropOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.45],
  });

  const personalAction = {
    opacity: progress,
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [16, -84],
        }),
      },
      {
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.94, 1],
        }),
      },
    ],
  };

  const groupAction = {
    opacity: progress,
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [16, -144],
        }),
      },
      {
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.94, 1],
        }),
      },
    ],
  };

  const plusRotation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
    <View pointerEvents="box-none" style={styles.root}>
      <Animated.View
        pointerEvents={expanded ? "auto" : "none"}
        style={[styles.backdrop, { opacity: backdropOpacity }]}
      >
        <Pressable style={styles.backdropPressable} onPress={onClose} />
      </Animated.View>

      <View style={styles.centerDock} pointerEvents="box-none">
        <Animated.View style={[styles.actionWrap, personalAction]} pointerEvents={expanded ? "auto" : "none"}>
          <Pressable style={[styles.actionButton, styles.personalAction]} onPress={onCreatePersonal}>
            <Feather name="check-circle" size={16} color={theme.colors.personal} />
            <Text style={styles.actionText}>Create Personal Task</Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={[styles.actionWrap, groupAction]} pointerEvents={expanded ? "auto" : "none"}>
          <Pressable style={[styles.actionButton, styles.groupAction]} onPress={onCreateGroup}>
            <Feather name="users" size={16} color={theme.colors.group} />
            <Text style={styles.actionText}>Create Group Challenge</Text>
          </Pressable>
        </Animated.View>

        <Pressable style={styles.mainButton} onPress={onToggle}>
          <Animated.View style={{ transform: [{ rotate: plusRotation }] }}>
            <Feather name="plus" size={26} color={theme.colors.textPrimary} />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
    elevation: 50,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#03070D",
  },
  backdropPressable: {
    flex: 1,
  },
  centerDock: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 28,
    alignItems: "center",
  },
  actionWrap: {
    position: "absolute",
    width: 236,
  },
  actionButton: {
    minHeight: 48,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  personalAction: {
    shadowColor: theme.colors.personal,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  groupAction: {
    shadowColor: theme.colors.group,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  actionText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.bold,
  },
  mainButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.brand,
    borderColor: theme.colors.border,
    borderWidth: 1,
    shadowColor: theme.colors.brand,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 12,
  },
});
