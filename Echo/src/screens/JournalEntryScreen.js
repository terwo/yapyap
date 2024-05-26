// src/screens/JournalEntryScreen.js
import React, { useState } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import back from "../../assets/images/journalentryscreen/back.png";

const formatDate = (date) => {
  const options = { month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options).toUpperCase();
};

const JournalEntryScreen = ({ navigation }) => {
  const [value, onChangeText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const date = formatDate(new Date());

  const goBack = () => {
    navigation.navigate("Today");
  };

  const callResults = () => {
    navigation.navigate("Loading");
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (value === "Start typing...") {
      onChangeText("");
    }
  };

  const handleBlur = () => {
    if (value === "") {
      onChangeText("Start typing...");
      setIsFocused(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={goBack}>
        <Image resizeMode="contain" source={back} style={styles.back} />
      </Pressable>
      <View style={styles.header}>
        <Text style={styles.title}>New Entry</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.question}>
        <Text style={styles.questionText}>What’s on your mind?</Text>
        <TextInput
          editable
          multiline
          numberOfLines={14}
          maxLength={300}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          style={styles.textYap}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={isFocused ? "" : "Start typing..."}
          placeholderTextColor="#A9A9A9"
        />
      </View>
      <TouchableOpacity onPress={callResults}>
        <View style={styles.analyzeButton}>
          <Text style={styles.buttonText}>Next</Text>
        </View>
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
    justifyContent: "center",
    flexDirection: "row",
  },
  back: {
    position: "absolute",
    left: -20,
    top: 2,
  },
  title: {
    alignSelf: "center",
    color: "black",
    fontSize: 30,
    marginTop: -8,
    fontFamily: "NunitoBold",
  },
  date: {
    color: "black",
    textAlign: "center",
    marginTop: 30,
    fontSize: 20,
    fontFamily: "NunitoMed",
  },
  question: {
    marginBottom: 100,
  },
  questionText: {
    color: "black",
    borderRadius: 20,
    alignSelf: "stretch",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 140,
    fontSize: 24,
    fontFamily: "NunitoMed",
  },
  textYap: {
    textAlignVertical: "top",
    borderRadius: 20,
    backgroundColor: "#F8F8F8",
    paddingTop: 20,
    padding: 20,
    fontSize: 16,
    fontFamily: "Nunito",
  },
  analyzeButton: {
    color: "black",
    textAlign: "center",
    borderRadius: 30,
    backgroundColor: "#F28D62",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "NunitoMed",
  },
});

export default JournalEntryScreen;
