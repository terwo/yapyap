// App.js
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./src/context/UserContext";
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import TodayScreen from "./src/screens/TodayScreen";
import ForumScreen from "./src/screens/ForumScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import JournalEntryScreen from "./src/screens/JournalEntryScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import ResultsScreen from "./src/screens/ResultsScreen";
import * as Font from "expo-font";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Nunito: require("./assets/fonts/Nunito-Regular.ttf"),
        NunitoMed: require("./assets/fonts/Nunito-Medium.ttf"),
        NunitoBold: require("./assets/fonts/Nunito-Bold.ttf"),
      });
    }
    loadFonts();
  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Today"
            component={TodayScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="JournalEntry"
            component={JournalEntryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Forum"
            component={ForumScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Results"
            component={ResultsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
