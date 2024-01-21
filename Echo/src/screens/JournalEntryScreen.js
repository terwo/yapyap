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

    const [value, onChangeText] = React.useState('YAP AWAY!!!');

    return (
        <View style={styles.container}>
        <View style={styles.header}>
 
          <Pressable onPress={goBack}>
            <Image
            resizeMode="contain"
            source={back}
            style={styles.back}
            />
            </Pressable>
          <Text style={styles.title}>New Entry</Text>
          <View></View>
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
        <View style={styles.analyzeButton}>

        <TouchableOpacity onPress={callResults}>
        <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>

          
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
    },
    header: {
        // alignContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        position: "absolute",
        // textAlign: "center",
        alignSelf: "center",
        // alignSelf: "center",
        gap: 100,
        // marginBottom: 100,
        // alignSelf: "stretch",
        // display: "flex",
        
      },
    back: {
    //   position: "absolute",
    },
    title: {
      color: "black",
      fontSize: 30,
      fontWeight: "bold",
      lineHeight: 122,
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
      marginTop: 120,
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
