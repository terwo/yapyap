import * as React from "react";
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

function MyComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>H1 Title</Text>
      </View>
      <View style={styles.login}>
        <Text style={styles.loginText}>H4 Login</Text>
      </View>
      <View style={styles.createAccount}>
        <Text style={styles.createAccountText}>H4 Create Account</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    display: "flex",
    maxWidth: 480,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
    paddingVertical: 50,
    paddingHorizontal: 60,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 189,
  },
  headerText: {
    color: "#271E53", // Changed from CSS custom property to a hard-coded value
    textAlign: "center",
    letterSpacing: 1,
    textTransform: "uppercase",
    fontWeight: "bold",
    alignSelf: "center",
    fontFamily: "Nunito, sans-serif", // Make sure this font is imported or change it to a default font
    fontSize: 40,
  },
  login: {
    color: "black",
    textAlign: "center",
    letterSpacing: "1px",
    fontVariantNumeric: "lining-nums tabular-nums",
    alignSelf: "center",
    marginTop: 312,
    fontFamily: "Nunito, sans-serif",
    fontSize: 22,
  },
  loginText: {
    marginTop: 22,
  },
  createAccount: {
    color: "black",
    textAlign: "center",
    letterSpacing: "1px",
    fontVariantNumeric: "lining-nums tabular-nums",
    marginTop: 22,
    whiteSpace: "nowrap",
    fontFamily: "Nunito, sans-serif",
    fontSize: 22,
  },
  createAccountText: {
    marginTop: 22,
  },
});

export default MyComponent;
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
