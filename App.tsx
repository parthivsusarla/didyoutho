import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { AppTabs } from "./src/navigation/AppTabs";
import { InterestSetupScreen } from "./src/screens/InterestSetupScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { ModeOnboardingScreen } from "./src/screens/ModeOnboardingScreen";
import { SignUpScreen } from "./src/screens/SignUpScreen";
import { WelcomeScreen } from "./src/screens/WelcomeScreen";

export default function App() {
  const [screen, setScreen] = useState<
    "welcome" | "signup" | "login" | "interest-setup" | "mode-onboarding" | "app"
  >("welcome");

  if (screen === "welcome") {
    return (
      <>
        <StatusBar style="light" />
        <WelcomeScreen onSignUp={() => setScreen("signup")} onLogIn={() => setScreen("login")} />
      </>
    );
  }

  if (screen === "signup") {
    return (
      <>
        <StatusBar style="light" />
        <SignUpScreen onGoToLogin={() => setScreen("login")} onComplete={() => setScreen("interest-setup")} />
      </>
    );
  }

  if (screen === "login") {
    return (
      <>
        <StatusBar style="light" />
        <LoginScreen onGoToSignUp={() => setScreen("signup")} onComplete={() => setScreen("app")} />
      </>
    );
  }

  if (screen === "interest-setup") {
    return (
      <>
        <StatusBar style="light" />
        <InterestSetupScreen onContinue={() => setScreen("mode-onboarding")} />
      </>
    );
  }

  if (screen === "mode-onboarding") {
    return (
      <>
        <StatusBar style="light" />
        <ModeOnboardingScreen onContinue={() => setScreen("app")} />
      </>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <AppTabs />
    </NavigationContainer>
  );
}
