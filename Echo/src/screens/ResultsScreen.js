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

const imageEmotion = happy
const textEmotion = happy_text
const emotionHeader = 'Happy'

// post is the post info in the database
// emotion should be the emotion returned from the ML model??

const ResultsScreen = ({ post, navigation, emotion }) => {

    const finishPost = () => {
        navigation.navigate('Forum')
    }

  //   const getSentimental = async () => {
  //     try {
  //         console.log('Attempting to log in'); // Debugging log
  //         const response = await fetch(`https://b18hhn83c8.execute-api.us-west-2.amazonaws.com/Prod/profile-read?username=${username}&password=${password}`, {
  //             method: 'GET',
  //             headers: { 'Content-Type': 'application/json' },
  //             // body: JSON.stringify({ username: username, password: password }),

  //         });
  //         console.log(response.status)
  //         if (response.ok) {
  //             userData = await response.json();
  //             setUser({ id: userData.user_id, username: username });
  //         } else {
  //             throw new Error('Login failed');
  //         }
  //         const id = userData.user_id;
  //         console.log('Seeing if user has made a post today or not');
  //         const posted = await fetch(`https://b18hhn83c8.execute-api.us-west-2.amazonaws.com/Prod/forum?user_id=${id}`, {
  //             method: 'GET',
  //             headers: { 'Content-Type': 'application/json' },
  //             // body: JSON.stringify({ user_id: id }),
  //         });
  //         console.log('Response:', posted.status)
  //         if (posted.ok) {
  //             console.log('User has made a post today, go to forum page');
  //             navigation.navigate('Forum');
  //         } else {
  //             console.log('User has not made a post today, go to Today page');
  //             navigation.navigate('Today');
  //         }
  //     } catch (error) {
  //         console.error('Login Error:', error);
  //     }
  // };


    checkSwitch=(param)=>{
      switch(param) {

        case 'happy':
          imageEmotion = happy;
          textEmotion = happy_text;
          emotionHeader = 'Happy'
          
        case 'angry':
          imageEmotion = angry;
          textEmotion = angry_text;
          emotionHeader = 'Angry'

        case 'neutral':
          imageEmotion = neutral;
          textEmotion = neutral_text;
          emotionHeader = 'Neutral'

        case 'sad':
          imageEmotion = sad;
          textEmotion = sad_text;
          emotionHeader = 'Sad'

        case 'scared':
          imageEmotion = scared;
          textEmotion = scared_text;
          emotionHeader = 'Scared'
      
        // default:
        //   Alert.alert(param);
        }
    
    }

    return (
        <View style={styles.container}>
      <View>
        <Text style={styles.header}>Sounds like you’re...</Text>
      </View>
      <Image
        // Image Source Result depends on AI
        resizeMode="contain"
        source={imageEmotion}
        style={styles.image}
      />
      <View >
        {/* Result depends on results on AI */}
        <Text style={styles.heading}>{emotionHeader}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.quip}>
           {/* Message depends on results on AI */}
          {textEmotion}
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
    marginTop: 120,
    // fontFamily: "Nunito, sans-serif",
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
    // fontFamily: "Nunito, sans-serif",
    fontSize: 28,
  },
  info: {
    color: "black",
    lineHeight: "both",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 19,
    width: 297,
    // fontFamily: "Nunito, sans-serif",
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
    color: "black",
      borderRadius: 30,
      backgroundColor: "#F28D62",
      alignSelf: "center",
      alignItems: "center",
      paddingTop: 12,
      paddingBottom: 12,
      width: 292.7,
    //   fontFamily: "Nunito, sans-serif",
  },
  buttonText: {
    fontSize: 18,
    
  },
});
