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

  const callResults = () => {
    navigation.navigate('Loading')
  }


  // NEED TO SAVE THE TEXT SUBMITTED AND SEND IT TO AI AND RESULTS!!
  const [value, onChangeText] = React.useState('YAP AWAY!!!');

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
        justifyContent: "center",
        flexDirection: 'row',
        
      },
    back: {
      position: 'absolute',
      left: -20,
      top: 2,

    },
    title: {
      alignSelf: "center",
      color: "black",
      fontSize: 30,
      fontWeight: "bold",
      marginTop: -8,
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
    paddingTop: 20,
    padding: 20,
    fontSize: 16,
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
    fontSize: 22,
    //   fontFamily: "Nunito, sans-serif",
  },
  buttonText: {
    fontSize: 18,   
  }
});

export default JournalEntryScreen;
