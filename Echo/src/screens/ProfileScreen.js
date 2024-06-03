import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import JournalCard from "../components/JournalCard";
import { useUser } from "../context/UserContext.js"; // Adjust this path to the correct location

import profileAvatar from "../../assets/images/avatars/bunny.png"; // Use the correct avatar image for the user
import settings from "../../assets/images/profilescreen/settings.svg";

const ProfileScreen = ({ navigation }) => {
  const profile = {
    avatar: "bunny",
  };

  const journalEntries = [
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
      content: "I'm just feeling whatever today",
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

  const goBack = () => {
    navigation.navigate("Forum");
  };

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <View>
        <View style={styles.profileUpper}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Profile</Text>
            <TouchableOpacity>
              <Image resizeMode="contain" source={settings} />
            </TouchableOpacity>
          </View>
          <Image
            resizeMode="contain"
            source={profileAvatar}
            style={styles.headerImage}
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        {journalEntries.map((entry, index) => (
          <JournalCard
            key={index}
            entry={entry}
            handleEmojiPress={handleEmojiPress}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",
  },
  profileUpper: {
    paddingTop: 40,
    width: "100%",
    backgroundColor: "#F28D62",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 25,
    alignItems: "center",
    position: "relative",
  },
  header: {
    alignItems: "center",
    display: "flex",
    alignContent: "center",
    flexDirection: "row",
    position: "absolute",
    alignSelf: "center",
    gap: 100,
  },
  // profileContainer: {
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   display: "flex",
  //   flexDirection: "row",
  //   width: "100%",
  // },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    fontSize: 30,
    color: "black",
    fontFamily: "NunitoBold",
    flex: 1,
    textAlign: "center",
  },
  spacer: {
    width: 50,
    height: 50,
  },
  headerImage: {
    alignSelf: "center",
    width: 148,
    height: 148,
    marginVertical: 38,
    marginBottom: -72,
  },
  contentContainer: {
    paddingHorizontal: 25,
    marginTop: 92,
  },
  username: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "NunitoBold",
    marginVertical: 10,
  },
});

export default ProfileScreen;
