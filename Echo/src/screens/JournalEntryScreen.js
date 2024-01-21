import * as React from "react";
import {
  Pressable,
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
  AccessibilityInfo
} from "react-native";

import back from '../../assets/images/journalentryscreen/back.png';

// const month = getMonth()
const date = new Date().toDateString()

const JournalEntryScreen = ({ navigation }) => {

  const goBack = () => {
    navigation.navigate('Today')
  }

  // NEED TO SAVE THE TEXT SUBMITTED AND SEND IT TO AI AND RESULTS!!
  const [value, onChangeText] = React.useState('YAP AWAY!!!');

  const callResults = async () => {
    try {
      const response = await fetch('https://b18hhn83c8.execute-api.us-west-2.amazonaws.com/Prod/post-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ journal_entry: value, user_id: '65ac855974d67649a3ab6993' }),
      });
      const data = await response.json();
      console.log('Response:', data);
      if (!response.ok) {
        console.log('Response:', response.status);
        throw new Error('Network response was not ok');
      }
      // Handle successful response, then navigate
      navigation.navigate('Loading');
    } catch (error) {
      console.error('Error posting journal entry:', error);
    }
  };

  return (
    <View style={styles.container}>

      <Pressable onPress={goBack}>
        <Image
          resizeMode="contain"
          source={back}
          style={styles.back}
        />
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
          // placeholderTextColor={black}
          onChangeText={text => onChangeText(text)}
          value={value}
          style={styles.textYap}
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
    // alignContent: "space-between",
    justifyContent: "center",
    // alignItems: "center",
    flexDirection: 'row',
    // position: "relative",
    // textAlign: "center",
    // alignSelf: "center",
    // alignSelf: "center",
    // gap: 100,
    // marginBottom: 100,
    // alignSelf: "stretch",
    // display: "flex",

  },
  back: {
    // position: "absolute",
    // width: "90%",
    position: 'absolute',
    left: -20,
    top: 2,

  },
  title: {
    alignSelf: "center",
    // alignItems: "center",
    // flexDirection: 'row',
    // position: "absolute",
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: -8,
    // lineHeight: 122,
    //   position: "absolute",

    //   textAlign: "center",
    //   alignSelf: "center",
    //   flexGrow: 1,
    //   whiteSpace: "nowrap",
    //   margin: "auto 0",
    //   font: "700 30px/123% Nunito, sans-serif ",
  },
  date: {
    color: "black",
    textAlign: "center",
    marginTop: 90,
    marginBottom: 60,
    fontSize: 22,
    fontWeight: "bold",
    //   font: "600 18px/156% Nunito, sans-serif ",
  },
  question: {
    //   color: "black",
    //   textAlign: "center",
    //   alignItems: "center",
    // //   marginTop: 13,
    //   fontSize: 26,
    marginBottom: 100,
    //   font: "500 25px/112% Nunito, sans-serif ",
  },
  questionText: {
    color: "black",
    borderRadius: 20,
    alignSelf: "stretch",
    alignItems: "center",
    textAlign: "center",
    padding: 20,
    fontSize: 16,
    //   fontFamily: "Nunito, sans-serif",
  },
  textYap: {
    //   color: "black",
    textAlignVertical: 'top',
    borderRadius: 20,
    backgroundColor: "#F8F8F8",
    //   alignSelf: "stretch",
    //   marginTop: 102,
    //   alignItems: "start",
    //   padding: "20px 60px 229px 20px",
    paddingTop: 20,
    padding: 20,
    fontSize: 16,
    // marginBottom: 100,
    //   fontFamily: "Nunito, sans-serif",
  },
  analyzeButton: {
    color: "black",
    textAlign: "center",
    borderRadius: 30,
    backgroundColor: "#F28D62",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    //   margin: "151px 0 7px",
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 22,
    //   fontFamily: "Nunito, sans-serif",
  },
  buttonText: {
    fontSize: 18,
    // fontWeight: "bold",   
  }
});

export default JournalEntryScreen;
