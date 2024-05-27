// src/screens/SplashScreen.js
import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import login from "../../assets/images/loginscreen/login.png";

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value of 0

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  const handlePress = () => {
    navigation.navigate("Login");
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.animatedContainer}>
          <Image resizeMode="contain" source={login} style={styles.logo} />
          <View style={styles.header}>
            <Text style={styles.headerText}>yapyap</Text>
          </View>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>
            share freely, acknowledge kindly, encourage warmly
          </Text>
        </View>
        <View style={styles.noteContainer}>
          <Animated.Text style={[styles.noteText, { opacity: fadeAnim }]}>
            Tap anywhere to continue
          </Animated.Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedContainer: {
    alignItems: "center",
    transform: [{ scale: 1.25 }], // Scale the container by 25%
  },
  logo: {
    overflow: "hidden",
    alignSelf: "center",
    position: "relative",
    marginTop: 60,
    width: 165,
    maxWidth: "100%",
    aspectRatio: 0.96,
  },
  header: {
    textAlign: "center",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 80,
    width: 257,
  },
  headerText: {
    fontSize: 50,
    textAlign: "center",
    fontFamily: "NunitoBold",
  },
  subtitleContainer: {
    marginTop: 20,
    width: 257,
    alignSelf: "center",
    marginBottom: 40,
  },
  subtitleText: {
    fontSize: 18,
    fontFamily: "Nunito",
    textAlign: "center",
  },
  noteContainer: {
    marginTop: 40,
  },
  noteText: {
    fontSize: 16,
    fontFamily: "Nunito",
    textAlign: "center",
  },
});

export default SplashScreen;
