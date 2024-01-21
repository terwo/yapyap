import React, { cloneElement } from "react";
import { Pressable, FlatList, ScrollView, View, StyleSheet, Image, Text } from "react-native";

import banner from '../../assets/images/todayscreen/banner.png';
import icon from '../../assets/images/todayscreen/icon.png';
import image from '../../assets/images/todayscreen/image.png';
import logo from '../../assets/images/todayscreen/logo.png';

const TodayScreen = ({ navigation }) => {

    const onPressFunction = () => {
        navigation.navigate('JournalEntry')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    resizeMode="contain"
                    source={logo}
                    style={styles.logo}
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Today</Text>
                </View>
                <Image
                    resizeMode="contain"
                    source={icon}
                    style={styles.icon}
                />
            </View>
            <Image
                resizeMode="contain"
                source={banner}
                style={styles.banner}
            />
            <View style={styles.shareContainer}>
                <Text style={styles.shareText}>Share your day to view other entries</Text>
            </View>

            <Pressable onPress={onPressFunction}>
                <Image
                    style={styles.image}
                    source={image}
                />
            </Pressable>

            {/* <Image
        resizeMode="contain"
        source={image}
        style={styles.image}
      /> */}
        </View>
    );
};

export default TodayScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        // display: "flex",
        // maxWidth: 480,
        width: "100%",
        // flexDirection: "column",
        // margin: "0 auto",
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
        lineHeight: 123,
        fontFamily: "Nunito, sans-serif",
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
        // leadingTrim: "both",
        // textEdge: "cap",
        // fontVariantNumeric: "lining-nums tabular-nums",
        marginTop: -20,
        marginBottom: 100,
        font: "500 25px/28px Nunito, sans-serif",
    },
    shareText: {
        fontSize: 25,
        fontWeight: "bold",
        lineHeight: 28,
        fontFamily: "Nunito, sans-serif",
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


