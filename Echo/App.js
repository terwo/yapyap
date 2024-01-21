import React, { useEffect } from 'react';
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
  AccessibilityInfo
} from "react-native";
import * as Font from 'expo-font';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import TodayScreen from './src/screens/TodayScreen';
import ForumScreen from './src/screens/ForumScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import JournalEntryScreen from './src/screens/JournalEntryScreen';
import NotificationsScreen from "./src/screens/NotificationsScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import ResultsScreen from "./src/screens/ResultsScreen";

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'custom-font': require('./assets/fonts/Nunito-Regular.ttf'),
      });

      Text.defaultProps.style.fontFamily = 'custom-font';
    }

    loadFont();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Today" component={TodayScreen} options={{ headerShown: false }} />
        <Stack.Screen name="JournalEntry" component={JournalEntryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Forum" component={ForumScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Results" component={ResultsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


