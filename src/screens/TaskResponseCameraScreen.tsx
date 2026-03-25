import { useEffect, useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/designSystem";

type TaskResponseCameraScreenProps = {
  taskTitle?: string;
  groupName?: string;
  initialSeconds?: number;
  onSubmit: (payload: { imageUri: string; taskTitle: string; groupName: string }) => void;
  onBack: () => void;
};

const DEFAULT_TASK_TITLE = "Submit proof: complete 30 push-ups";
const DEFAULT_GROUP_NAME = "Early Risers";
const DEFAULT_COUNTDOWN_SECONDS = 5 * 60;

function formatTimer(totalSeconds: number) {
  const safe = Math.max(totalSeconds, 0);
  const minutes = Math.floor(safe / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (safe % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function TaskResponseCameraScreen({
  taskTitle = DEFAULT_TASK_TITLE,
  groupName = DEFAULT_GROUP_NAME,
  initialSeconds = DEFAULT_COUNTDOWN_SECONDS,
  onSubmit,
  onBack,
}: TaskResponseCameraScreenProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [capturedUri, setCapturedUri] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((value) => (value > 0 ? value - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCapture = async () => {
    if (!cameraRef.current || isCapturing) {
      return;
    }

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7, skipProcessing: true });
      if (photo?.uri) {
        setCapturedUri(photo.uri);
      }
    } finally {
      setIsCapturing(false);
    }
  };

  const handleSubmit = () => {
    if (!capturedUri) {
      return;
    }

    onSubmit({ imageUri: capturedUri, taskTitle, groupName });
  };

  const showPermissionFallback = !permission || permission.granted === false;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Pressable style={styles.iconButton} onPress={onBack}>
            <Feather name="chevron-left" size={18} color={theme.colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Task Response</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.countdownCard}>
          <Text style={styles.countdownLabel}>Time Left</Text>
          <Text style={styles.countdownValue}>{formatTimer(secondsLeft)}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Task</Text>
          <Text style={styles.infoValue}>{taskTitle}</Text>
          <Text style={styles.infoLabel}>Group</Text>
          <Text style={styles.infoValue}>{groupName}</Text>
        </View>

        <View style={styles.cameraShell}>
          {showPermissionFallback ? (
            <View style={styles.permissionFallback}>
              <Feather name="camera-off" size={26} color={theme.colors.textSecondary} />
              <Text style={styles.fallbackTitle}>Camera Permission Needed</Text>
              <Text style={styles.fallbackText}>
                Enable camera access to capture proof for this task response.
              </Text>
              <Pressable style={styles.retryButton} onPress={requestPermission}>
                <Text style={styles.retryButtonText}>Request Permission</Text>
              </Pressable>
            </View>
          ) : capturedUri ? (
            <Image source={{ uri: capturedUri }} style={styles.previewImage} resizeMode="cover" />
          ) : (
            <CameraView ref={cameraRef} style={styles.cameraPreview} facing="back" />
          )}
        </View>

        {showPermissionFallback ? null : capturedUri ? (
          <View style={styles.actionRow}>
            <Pressable style={styles.retakeButton} onPress={() => setCapturedUri(null)}>
              <Text style={styles.retakeButtonText}>Retake</Text>
            </Pressable>
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.captureWrap}>
            <Pressable style={styles.captureButton} onPress={handleCapture} disabled={isCapturing}>
              <View style={styles.captureInner} />
            </Pressable>
            <Text style={styles.captureHint}>{isCapturing ? "Capturing..." : "Tap to capture proof"}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: 36,
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
  headerTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  headerSpacer: {
    width: 36,
  },
  countdownCard: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: "#7B2A34",
    backgroundColor: "#31161D",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countdownLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.bodySm,
  },
  countdownValue: {
    color: theme.colors.group,
    fontSize: 22,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: 1,
  },
  infoCard: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    gap: 4,
  },
  infoLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.caption,
  },
  infoValue: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
    marginBottom: 4,
  },
  cameraShell: {
    height: 360,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    overflow: "hidden",
  },
  cameraPreview: {
    flex: 1,
  },
  previewImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  permissionFallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.cardSoft,
  },
  fallbackTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.bold,
  },
  fallbackText: {
    color: theme.colors.textSecondary,
    textAlign: "center",
    fontSize: theme.typography.sizes.bodySm,
    lineHeight: 20,
  },
  retryButton: {
    marginTop: 6,
    minHeight: 42,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  retryButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.bodySm,
    fontWeight: theme.typography.weights.semibold,
  },
  captureWrap: {
    alignItems: "center",
    gap: 8,
  },
  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: theme.colors.textPrimary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.card,
  },
  captureInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.group,
  },
  captureHint: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.caption,
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
  },
  retakeButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    justifyContent: "center",
    alignItems: "center",
  },
  retakeButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
  },
  submitButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.group,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#2A0A0D",
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.bold,
  },
});
