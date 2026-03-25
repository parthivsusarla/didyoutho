import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../theme/designSystem";

export function ChatScreen() {
  const [message, setMessage] = useState("");

  const messages = [
    { id: "m1", user: "Rahul", text: "Submitted today\'s check-in proof.", time: "8:14 PM", mine: false },
    { id: "m2", user: "You", text: "Nice. I\'ll vote in a minute.", time: "8:15 PM", mine: true },
    { id: "m3", user: "Aisha", text: "Random check-in was intense today.", time: "8:16 PM", mine: false },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.messagesList} contentContainerStyle={styles.messagesContent}>
        {messages.map((item) => (
          <View key={item.id} style={[styles.messageRow, item.mine && styles.messageRowMine]}>
            {!item.mine ? <Text style={styles.userName}>{item.user}</Text> : null}
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputBar}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={styles.input}
          placeholder="Type a message"
          placeholderTextColor={theme.colors.textMuted}
        />
        <Pressable style={styles.sendButton}>
          <Feather name="send" size={15} color={theme.colors.textPrimary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: 90,
    gap: theme.spacing.sm,
  },
  messageRow: {
    alignSelf: "flex-start",
    maxWidth: "84%",
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 8,
    gap: 2,
  },
  messageRowMine: {
    alignSelf: "flex-end",
    backgroundColor: theme.colors.backgroundElevated,
  },
  userName: {
    color: theme.colors.personal,
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
  },
  messageText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.bodySm,
    lineHeight: 18,
  },
  timeText: {
    color: theme.colors.textMuted,
    fontSize: 10,
  },
  inputBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: 42,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cardSoft,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.sizes.bodySm,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.backgroundElevated,
    justifyContent: "center",
    alignItems: "center",
  },
});
