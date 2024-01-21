// src/screens/TodayScreen.js

// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

import * as React from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";

import image1 from '../../assets/images/todayscreen/image1.png';
import image2 from '../../assets/images/todayscreen/image2.png';
import image3 from '../../assets/images/todayscreen/image3.png';
import image4 from '../../assets/images/todayscreen/image4.png';
import image5 from '../../assets/images/todayscreen/image5.png';
import image6 from '../../assets/images/todayscreen/image6.png';

const TodayScreen = ({ navigation }) => {
    return (
        <View style={styles.view1}>
      <View style={styles.view2}>
        <Image
        
          resizeMode="contain"
          source={image1}
          style={styles.image1}
        />
        <View style={styles.view3}>
          <Text>Today</Text>
        </View>
        <Image
          resizeMode="contain"
          source={image2}
          style={styles.image2}
        />
      </View>
      <View style={styles.view4}>
        <Image
          resizeMode="contain"
          source={image3}
          style={styles.image3}
        />
        <View style={styles.view5}>
          <Image
            resizeMode="contain"
            source={image4}
            style={styles.image4}
          />
          <Image
            resizeMode="contain"
            source={image5}
            style={styles.image5}
          />
        </View>
      </View>
      <View style={styles.view6}>
        <Text>Share your day to view other entries</Text>
      </View>
      <Image
        resizeMode="contain"
        source={image6}
        style={styles.image6}
      />
    </View>
    );
};

export default TodayScreen;

const styles = StyleSheet.create({
  view1: {
    backgroundColor: "#FFF",
    display: "flex",
    maxWidth: 480,
    width: "100%",
    flexDirection: "column",
    margin: "0 auto",
    padding: "24px 25px 50px",
  },
  view2: {
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    display: "flex",
  },
  image1: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    alignSelf: "stretch",
    position: "relative",
    display: "flex",
    width: 24,
    flexShrink: 0,
    maxWidth: "100%",
    flexDirection: "column",
    aspectRatio: "1",
  },
  view3: {
    color: "black",
    textAlign: "center",
    fontVariantNumeric: "lining-nums tabular-nums",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    margin: "auto 0",
    fontSize: 30,
    // font: "700 30px/123% Nunito, sans-serif ",
    // fontFamily: "Nunito, sans-serif", // Make sure this font is imported or change it to a default font
  },
  image2: {
    overflow: "hidden",
    alignSelf: "stretch",
    position: "relative",
    display: "flex",
    width: 24,
    flexShrink: 0,
    maxWidth: "100%",
    flexDirection: "column",
    aspectRatio: "1",
  },
  view4: {
    alignSelf: "center",
    display: "flex",
    marginTop: 189,
    alignItems: "end",
    gap: 19,
  },
  image3: {
    overflow: "hidden",
    position: "relative",
    display: "flex",
    marginTop: 85,
    width: 76,
    flexShrink: 0,
    maxWidth: "100%",
    flexDirection: "column",
    aspectRatio: "1",
  },
  view5: {
    // alignSelf: "stretch",
    // display: "flex",
    // flexGrow: 1,
    // flexBasis: 0,
    // flexDirection: "column",
    // alignItems: "start",
  },
  image4: {
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: 76,
    maxWidth: "100%",
    flexDirection: "column",
    aspectRatio: "0.96",
  },
  image5: {
    overflow: "hidden",
    alignSelf: "center",
    position: "relative",
    display: "flex",
    width: 107,
    flexDirection: "column",
    aspectRatio: "1.03",
  },
  view6: {
    // color: "black",
    // textAlign: "center",
    // fontVariantNumeric: "lining-nums tabular-nums",
    // marginTop: 96,
    // // font: "500 25px/28px Nunito, sans-serif ",
    // fontSize: 25,
    // // fontFamily: "Nunito, sans-serif", // Make sure this font is imported or change it to a default font
  },
  image6: {
    overflow: "hidden",
    alignSelf: "center",
    position: "relative",
    display: "flex",
    width: 64,
    maxWidth: "100%",
    flexDirection: "column",
    margin: "152px 0 9px",
    aspectRatio: "1",
  },
});


