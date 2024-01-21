import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

const LoadingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/37353037-f0e7-4f2c-9879-6987bc4b4fcd?apiKey=a65f153f0616484bbdddb43b863be0fa&",
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text>Hold on tight while we do our thing...</Text>
      </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {

        backgroundColor: "#FFF",
        width: "100%",
        height: "100%",
        padding: 50,

      backgroundColor: "#FFF",
      display: "flex",
      maxWidth: 480,
      width: "100%",
      flexDirection: "column",
      alignItems: "stretch",
      margin: "0 auto",
      padding: 50,
    },
    image: {
      overflow: "hidden",
      position: "relative",
      display: "flex",
    //   marginTop: 243,
      flexDirection: "column",
      aspectRatio: 1.18,
    },
    content: {
      color: "var(--black, #000C34)",
      textAlign: "center",
      lineHeightTrim: "both",
      textEmphasis: "filled",
      marginVertical: 8,
    //   marginBottom: 180,
      fontWeight: "500",
      fontSize: 25,
      lineHeight: 28,
      fontFamily: "Nunito, sans-serif",
    },
  });

export default LoadingScreen;

