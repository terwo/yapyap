import React, { cloneElement } from "react";
import { Pressable, FlatList, ScrollView, View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

import banner from '../../assets/images/todayscreen/banner.png';
import icon from '../../assets/images/todayscreen/icon.png';
import image from '../../assets/images/todayscreen/image.png';
import logo from '../../assets/images/todayscreen/logo.png';

const TodayScreen = ({ navigation }) => {

    const addEntry = () => {
        navigation.navigate('JournalEntry')
    }

    const goProfile = () => {
        navigation.navigate('Profile')
    }

    const goNotifications = () => {
        navigation.navigate('Results')
    }

    return (
        <View style={styles.container}>
      <View style={styles.header}>

<TouchableOpacity onPress={goNotifications}>
      <Image
            resizeMode="contain"
            source={logo}
            style={styles.logo}
      />
    </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Today</Text>
        </View>

        <TouchableOpacity onPress={goProfile}>
      <Image
              resizeMode="contain"
              source={icon}
              style={styles.icon}
      />
    </TouchableOpacity>

      </View>
      <Image
        resizeMode="contain"
        source={banner}
        style={styles.banner}
      />
      <View style={styles.shareContainer}>
        <Text style={styles.shareText}>Share your day to view other entries</Text>
      </View>

      <TouchableOpacity onPress={addEntry}>
      <Image
        style={styles.image}
        source={image}
      />
    </TouchableOpacity>
    </View>
    );
};

export default TodayScreen;

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
    alignSelf: "center",
    gap: 100
    
    // alignSelf: "stretch",
    // display: "flex",
    
  },
  logo: {
    // justifyContent: "center",
    // alignItems: "center",
    // overflow: "hidden",
    // alignSelf: "stretch",
    // position: "absolute",
    // display: "flex",
    // width: 24,
    // flexShrink: 0,
    // maxWidth: "100%",
    // flexDirection: "column",
    // aspectRatio: "1",
  },
  titleContainer: {
    // color: "black",
    // textAlign: "center",
    // fontVariantNumeric: "lining-nums tabular-nums",
    // flexGrow: 1,
    // flexShrink: 1,
    // flexBasis: "auto",
    // margin: "auto 0",
    // font: "700 30px/123% Nunito, sans-serif",
  },

    // GOOD
    title: {
        fontSize: 30,
        fontWeight: "bold",
        lineHeight: 122,
        // fontFamily: "Nunito, sans-serif",
    },
    icon: {
        // overflow: "hidden",
        // alignSelf: "stretch",
        // position: "relative",
        // // display: "flex",
        // width: 24,
        // flexShrink: 0,
        // maxWidth: "100%",
        // flexDirection: "column",
        // aspectRatio: "1",
    },
    banner: {
        overflow: "hidden",
        alignSelf: "center",
        position: "relative",
        display: "flex",
        width: 202,
        // maxWidth: "100%",
        flexDirection: "column",
        aspectRatio: "0.53",
        marginTop: 50,
    },
    shareContainer: {
        color: "black",
        textAlign: "center",
        marginTop: -20,
        marginBottom: 100,
        // font: "500 25px/28px Nunito, sans-serif",
    },
    shareText: {
        fontSize: 25,
        fontWeight: "bold",
        lineHeight: 28,
        // fontFamily: "Nunito, sans-serif",
        textAlign: "center",
    },
    image: {
        overflow: "hidden",
        alignSelf: "center",
        position: "relative",
        // display: "flex",
        width: 64,
        maxWidth: "100%",
        flexDirection: "column",
        // marginVertical: 152,
        aspectRatio: "1",
    },
});


