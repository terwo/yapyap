import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import JournalCard from "../components/JournalCard";
import { useUser } from "../context/UserContext.js"; // Adjust this path to the correct location

import icon from "../../assets/images/todayscreen/icon.png";
import logo from "../../assets/images/todayscreen/logo.png";

const ForumScreen = ({ navigation }) => {
  const forumPosts = [
    {
      id: 1,
      avatar: "pig",
      date: "2021-10-01",
      image: require("../../assets/images/emotions/happy.png"),
      emotion: "Happy",
      content: "I am happy today",
      emojiCount: 0,
    },
    {
      id: 2,
      avatar: "bunny",
      date: "2021-10-02",
      image: require("../../assets/images/emotions/sad.png"),
      emotion: "Sad",
      content: "I am sad today",
      emojiCount: 0,
    },
    {
      id: 3,
      avatar: "penguin",
      date: "2021-10-03",
      image: require("../../assets/images/emotions/angry.png"),
      emotion: "Angry",
      content: "I am angry today",
      emojiCount: 0,
    },
    {
      id: 4,
      avatar: "duck",
      date: "2021-10-04",
      image: require("../../assets/images/emotions/neutral.png"),
      emotion: "Neutral",
      content: "Im just feeling whatever today",
      emojiCount: 0,
    },
    {
      id: 5,
      avatar: "pig",
      date: "2021-10-05",
      image: require("../../assets/images/emotions/happy.png"),
      emotion: "Fear",
      content: "That was really scary",
      emojiCount: 0,
    },
  ];

  const handleEmojiPress = (postId, emojiType) => {
    // Implement the emoji press handling logic here
    console.log(`Emoji ${emojiType} pressed on post ${postId}`);
  };

  const goProfile = () => {
    navigation.navigate("Profile");
  };

  const goNotifications = () => {
    navigation.navigate("Notifications");
  };

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <View>
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
      </View>

      {forumPosts.map((post, index) => (
        <JournalCard
          key={index}
          entry={post}
          handleEmojiPress={handleEmojiPress}
        />
      ))}
    </ScrollView>
  );
};

// Styles for ForumScreen
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",
  },
  header: {
    paddingTop: 40,
    width: "100%",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#F9F9F9",
    gap: 100,
    paddingBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "NunitoBold", // Ensure the font is loaded in the main app
  },
  // Add more styles as needed
});

export default ForumScreen;
