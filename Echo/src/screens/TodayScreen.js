import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

import banner from "../../assets/images/todayscreen/banner.png";
import icon from "../../assets/images/todayscreen/icon.png";
import image from "../../assets/images/todayscreen/image.png";
import logo from "../../assets/images/todayscreen/logo.png";

const TodayScreen = ({ navigation }) => {
  const addEntry = () => {
    navigation.navigate("JournalEntry");
  };

  const goProfile = () => {
    navigation.navigate("Profile");
  };

  const goNotifications = () => {
    navigation.navigate("Notifications");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goNotifications}>
          <Image resizeMode="contain" source={logo} style={styles.logo} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Today</Text>
        </View>
        <TouchableOpacity onPress={goProfile}>
          <Image resizeMode="contain" source={icon} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Image resizeMode="contain" source={banner} style={styles.banner} />
      <View style={styles.shareContainer}>
        <Text style={styles.shareText}>
          Share your day to view other entries
        </Text>
      </View>
      <TouchableOpacity onPress={addEntry}>
        <Image style={styles.image} source={image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",
    padding: 50,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    alignSelf: "center",
    gap: 100,
  },
  title: {
    fontSize: 30,
    lineHeight: 122,
    fontFamily: "NunitoBold",
  },
  banner: {
    overflow: "hidden",
    alignSelf: "center",
    position: "relative",
    display: "flex",
    width: 202,
    flexDirection: "column",
    aspectRatio: "0.53",
    marginTop: 50,
  },
  shareContainer: {
    color: "black",
    textAlign: "center",
    marginTop: -20,
    marginBottom: 100,
  },
  shareText: {
    fontSize: 25,
    lineHeight: 28,
    fontFamily: "Nunito",
    textAlign: "center",
  },
  image: {
    overflow: "hidden",
    alignSelf: "center",
    position: "relative",
    width: 64,
    maxWidth: "100%",
    flexDirection: "column",
    aspectRatio: "1",
  },
  logo: {
    // Style your logo here
  },
  icon: {
    // Style your icon here
  },
  titleContainer: {
    // Style your title container here
  },
});

export default TodayScreen;
