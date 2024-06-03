import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Avatar, Card } from "react-native-elements";
import EmojiButton from "./EmojiButton"; // Assuming EmojiButton is a separate component
import muchlove from "../../assets/images/reactions/muchlove.png";
import babel from "../../assets/images/reactions/babel.png";
import samehere from "../../assets/images/reactions/samehere.png";
import staystrong from "../../assets/images/reactions/staystrong.png";
import youdeserveit from "../../assets/images/reactions/youdeserveit.png";

const JournalCard = ({ entry, handleEmojiPress }) => {
  const avatarMap = {
    pig: require("../../assets/images/avatars/pig.png"),
    bunny: require("../../assets/images/avatars/bunny.png"),
    penguin: require("../../assets/images/avatars/penguin.png"),
    duck: require("../../assets/images/avatars/duck.png"),
  };

  const getAvatarSource = (animalName) => {
    return avatarMap[animalName];
  };

  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Avatar size="small" rounded source={getAvatarSource(entry.avatar)} />
        <Text style={styles.dateText}>{entry.date}</Text>
      </View>
      <Image source={entry.image} style={styles.cardImage} />
      <Text style={styles.imageDescription}>{entry.emotion}</Text>
      <Text style={styles.contentText}>{entry.content}</Text>
      <View style={styles.emojiContainer}>
        <EmojiButton
          emojiImage={muchlove}
          count={entry.emojiCount}
          onPress={() => handleEmojiPress(entry.id, "muchlove")}
        />
        <EmojiButton
          emojiImage={babel}
          count={entry.emojiCount}
          onPress={() => handleEmojiPress(entry.id, "babel")}
        />
        <EmojiButton
          emojiImage={samehere}
          count={entry.emojiCount}
          onPress={() => handleEmojiPress(entry.id, "samehere")}
        />
        <EmojiButton
          emojiImage={staystrong}
          count={entry.emojiCount}
          onPress={() => handleEmojiPress(entry.id, "staystrong")}
        />
        <EmojiButton
          emojiImage={youdeserveit}
          count={entry.emojiCount}
          onPress={() => handleEmojiPress(entry.id, "youdeserveit")}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    backgroundColor: "#F8F8F8",

    // this is all just to remove stupid default card properties

    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    fontFamily: "Nunito", // Ensure the font is loaded in the main app
  },
  cardImage: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  imageDescription: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
    fontFamily: "Nunito", // Ensure the font is loaded in the main app
  },
  contentText: {
    marginVertical: 10,
    fontFamily: "Nunito", // Ensure the font is loaded in the main app
  },
  emojiContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  // Add more styles as needed
});

export default JournalCard;
