import * as React from "react";
import { FlatList, ScrollView, View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

import happy from '../../assets/images/resultsscreen/happy_result.png';
import angry from '../../assets/images/resultsscreen/angry_result.png';
import neutral from '../../assets/images/resultsscreen/neutral_result.png';
import sad from '../../assets/images/resultsscreen/sad_result.png';
import scared from '../../assets/images/resultsscreen/scared_result.png';

const happy_text = "If you’re thriving and you know it clap your hands *clap clap*"
const angry_text = "You’re in the right place. Take deep breaths and vent away~"
const neutral_text = "Neutral is good! Take it one day at a time, slowly and steadily."
const sad_text = "The sun always shines after the storm. Virtual head pats coming your way <3"
const scared_text = "Fear is just another reason to try harder. You’re stronger than you think! "

// post is the post info in the database
// emotion should be the emotion returned from the ML model??

const ResultsScreen = ({ post, navigation, emotion }) => {

    const finishPost = () => {
        navigation.navigate('Forum')
    }

    return (
        <View style={styles.container}>
      <View>
        <Text style={styles.header}>Sounds like you’re...</Text>
      </View>
      <Image
        // Image Source Result depends on AI
        resizeMode="contain"
        source={happy}
        style={styles.image}
      />
      <View >
        {/* Result depends on results on AI */}
        <Text style={styles.heading}>Happy</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.quip}>
           {/* Message depends on results on AI */}
          If you’re thriving and you know it clap your hands *clap clap*
        </Text>
      </View>
      <View style={styles.details}>
        <Text>
            {/* Should take message from Journal Entry Screen AND ALSO SAVE IT! */}
            
            {/* replace with post.journal_entry */}
          Going to my first 24hr hackathon today! excited to met people and have a good time
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

export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",
    // padding: 50,
  },
  header: {
    color: "black",
    textAlign: "center",
    // lineHeight: "both",
    // textTransform: "uppercase",
    // alignSelf: "center",
    marginTop: 120,
    // width: 363,
    // fontFamily: "Nunito, sans-serif",
    // fontWeight: "400",
    fontSize: 20,
    // lineHeight: "127%",
  },
  image: {
    // overflow: "hidden",
    // alignSelf: "stretch",
    // position: "relative",
    // display: "flex",
    // marginTop: 44,
    width: "100%",
    height: "30%",
    // flexDirection: "column",
    // aspectRatio: 1,
  },
  heading: {
    color: "black",
    textAlign: "center",
    alignSelf: "center",
    // marginTop: 25,
    // fontFamily: "Nunito, sans-serif",
    // fontWeight: "500",
    fontSize: 28,
    // lineHeight: "112%",
  },
  info: {
    color: "black",
    // textAlign: "center",
    lineHeight: "both",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 19,
    width: 297,
    // fontFamily: "Nunito, sans-serif",
    // fontWeight: "400",
    fontSize: 16,
  },
  quip: {
    textAlign: "center",
    // alignSelf: "center"
  },
  details: {
    color: "black",
    lineHeight: "both",
    borderRadius: 20,
    backgroundColor: "#F8F8F8",
    alignSelf: "center",
    marginTop: 48,
    marginBottom: 120,
    width: "100%",
    maxWidth: 337,
    padding: 20,
    // fontFamily: "Nunito, sans-serif",
    fontWeight: "400",
    fontSize: 16,
  },
  buttonContainer: {
    // position: "absolute",
    color: "black",
    // height: "0.5vh",
    //   textAlign: "center",
      borderRadius: 30,
      backgroundColor: "#F28D62",
      alignSelf: "center",
    //   justifyContent: "center",
      alignItems: "center",
    //   margin: "151px 0 7px",
      paddingTop: 12,
      paddingBottom: 12,
      width: 292.7,
    //   fontFamily: "Nunito, sans-serif",
  },
  buttonText: {
    // color: "#FFF",
    fontSize: 18,
    
  },
});
