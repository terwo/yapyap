// src/screens/LoadingScreen.js
import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import loading from "../../assets/images/loading.gif";

const LoadingScreen = ({ navigation }) => {
  setTimeout(() => {
    navigation.navigate("Results");
  }, 5000);

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={loading} style={styles.image} />
      <View>
        <Text style={styles.content}>
          Hold on tight while we do our thing...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFBFB",
    width: "100%",
    height: "100%",
  },
  image: {
    overflow: "hidden",
    position: "relative",
    display: "flex",
    aspectRatio: 0.3,
    alignSelf: "center",
  },
  content: {
    color: "black",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 25,
    marginTop: -200,
    width: 250,
    alignSelf: "center",
    fontFamily: "Nunito",
  },
});

export default LoadingScreen;
