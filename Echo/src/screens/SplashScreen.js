// src/screens/SplashScreen.js
import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";

const SplashScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.6,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("Login");
    });
  };

  useEffect(() => {
    // Optionally, you can add some initial animation when the screen loads
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Text style={styles.logoText}>yapyap</Text>
        </Animated.View>
        <Text style={styles.continueText}>Tap anywhere to continue</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  logoText: {
    fontSize: 48,
    fontFamily: "NunitoBold",
  },
  continueText: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Nunito",
  },
});

export default SplashScreen;
