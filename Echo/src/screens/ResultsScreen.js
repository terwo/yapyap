// src/screens/ResultsScreen.js
import React from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import happy from "../../assets/images/resultsscreen/happy_result.png";
import angry from "../../assets/images/resultsscreen/angry_result.png";
import neutral from "../../assets/images/resultsscreen/neutral_result.png";
import sad from "../../assets/images/resultsscreen/sad_result.png";
import scared from "../../assets/images/resultsscreen/scared_result.png";

const happy_text =
  "If you’re thriving and you know it clap your hands *clap clap*";
const angry_text =
  "You’re in the right place. Take deep breaths and vent away~";
const neutral_text =
  "Neutral is good! Take it one day at a time, slowly and steadily.";
const sad_text =
  "The sun always shines after the storm. Virtual head pats coming your way <3";
const scared_text =
  "Fear is just another reason to try harder. You’re stronger than you think!";

const imageEmotion = happy;
const textEmotion = happy_text;
const emotionHeader = "Happy";

const ResultsScreen = ({ route, navigation }) => {
  const finishPost = () => {
    navigation.navigate("Forum");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Sounds like you’re feeling...</Text>
      </View>
      <Image resizeMode="contain" source={imageEmotion} style={styles.image} />
      <View>
        <Text style={styles.heading}>{emotionHeader}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.quip}>{textEmotion}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailsText}>
          Going to my first 24hr hackathon today! excited to meet people and
          have a good time
        </Text>
      </View>
      <TouchableOpacity onPress={finishPost}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Finish Post</Text>
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
  },
  header: {
    color: "black",
    textAlign: "center",
    marginTop: 120,
    fontFamily: "Nunito",
    fontSize: 20,
  },
  image: {
    width: "100%",
    height: "30%",
  },
  heading: {
    color: "black",
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "NunitoMed",
    fontSize: 28,
  },
  info: {
    color: "black",
    lineHeight: "both",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 19,
    width: 297,
  },
  quip: {
    textAlign: "center",
    fontFamily: "Nunito",
    fontSize: 16,
  },
  details: {
    color: "black",
    lineHeight: "both",
    borderRadius: 20,
    backgroundColor: "#F8F8F8",
    alignSelf: "center",
    marginTop: 48,
    marginBottom: 100,
    width: "100%",
    maxWidth: 337,
    padding: 20,
  },
  detailsText: {
    fontFamily: "Nunito",
    fontSize: 16,
  },
  buttonContainer: {
    color: "black",
    borderRadius: 30,
    backgroundColor: "#F28D62",
    alignSelf: "center",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
    width: 292.7,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Nunito",
  },
});

export default ResultsScreen;
