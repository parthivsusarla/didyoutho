import { Feather } from "@expo/vector-icons";
import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { AddPersonalTaskScreen } from "../screens/AddPersonalTaskScreen";
import { ExpandableFab } from "../components/ExpandableFab";
import { ChatScreen } from "../screens/ChatScreen";
import { CreateScreen } from "../screens/CreateScreen";
import { GroupsScreen } from "../screens/GroupsScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { PersonalScreen } from "../screens/PersonalScreen";
import { theme } from "../theme/designSystem";

export type RootTabParamList = {
  Home: undefined;
  Personal: undefined;
  Create: undefined;
  Groups: undefined;
  Chat: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

type TabName = keyof RootTabParamList;

const TAB_CONFIG: Record<
  TabName,
  {
    label: string;
    icon: keyof typeof Feather.glyphMap;
  }
> = {
  Home: { label: "Home", icon: "home" },
  Personal: { label: "Personal", icon: "check-square" },
  Create: { label: "Create", icon: "plus" },
  Groups: { label: "Groups", icon: "users" },
  Chat: { label: "Chat", icon: "message-circle" },
};

export function AppTabs() {
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [showPersonalTaskCreator, setShowPersonalTaskCreator] = useState(false);

  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            color: theme.colors.textPrimary,
            fontWeight: "800",
            fontSize: theme.typography.sizes.title,
          },
          sceneStyle: {
            backgroundColor: theme.colors.background,
          },
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabItem,
          tabBarActiveTintColor: route.name === "Groups" ? theme.colors.group : theme.colors.personal,
          tabBarInactiveTintColor: theme.colors.textMuted,
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ color, size }) => (
            <Feather name={TAB_CONFIG[route.name as TabName].icon} size={size} color={color} />
          ),
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarLabel: TAB_CONFIG.Home.label }}
          listeners={{ tabPress: () => setCreateMenuOpen(false) }}
        />
        <Tab.Screen
          name="Personal"
          component={PersonalScreen}
          options={{ tabBarLabel: TAB_CONFIG.Personal.label }}
          listeners={{ tabPress: () => setCreateMenuOpen(false) }}
        />
        <Tab.Screen
          name="Create"
          component={CreateScreen}
          options={{
            tabBarLabel: "",
            headerTitle: "Create",
            tabBarButton: () => <View style={styles.createSpacer} />,
            tabBarIcon: () => null,
          }}
          listeners={{ tabPress: (event) => event.preventDefault() }}
        />
        <Tab.Screen
          name="Groups"
          component={GroupsScreen}
          options={{ tabBarLabel: TAB_CONFIG.Groups.label }}
          listeners={{ tabPress: () => setCreateMenuOpen(false) }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{ tabBarLabel: TAB_CONFIG.Chat.label }}
          listeners={{ tabPress: () => setCreateMenuOpen(false) }}
        />
      </Tab.Navigator>

      <ExpandableFab
        expanded={createMenuOpen}
        onToggle={() => setCreateMenuOpen((current) => !current)}
        onClose={() => setCreateMenuOpen(false)}
        onCreatePersonal={() => {
          setCreateMenuOpen(false);
          setShowPersonalTaskCreator(true);
        }}
        onCreateGroup={() => {
          setCreateMenuOpen(false);
          Alert.alert("Create Group Challenge", "Mock action only: open group challenge creation flow.");
        }}
      />

      {showPersonalTaskCreator ? (
        <View style={styles.creatorOverlay}>
          <AddPersonalTaskScreen
            onBack={() => setShowPersonalTaskCreator(false)}
            onGoHome={() => setShowPersonalTaskCreator(false)}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  tabBar: {
    position: "absolute",
    height: 78,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: theme.colors.backgroundElevated,
    borderTopWidth: 0,
    elevation: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
  },
  tabItem: {
    paddingVertical: 6,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: "700",
  },
  createSpacer: {
    width: 68,
  },
  creatorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background,
    zIndex: 60,
    elevation: 60,
  },
});
