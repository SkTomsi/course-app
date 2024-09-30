import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import "../global.css";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Geist-Regular": require("../assets/fonts/Geist-Regular.ttf"),
    "Geist-Bold": require("../assets/fonts/Geist-Bold.ttf"),
    "Geist-Medium": require("../assets/fonts/Geist-Medium.ttf"),
    "Geist-SemiBold": require("../assets/fonts/Geist-SemiBold.ttf"),
    "Geist-ExtraBold": require("../assets/fonts/Geist-ExtraBold.ttf"),
    "Geist-ExtraLight": require("../assets/fonts/Geist-ExtraLight.ttf"),
    "Geist-Light": require("../assets/fonts/Geist-Light.ttf"),
    "Geist-Thin": require("../assets/fonts/Geist-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
