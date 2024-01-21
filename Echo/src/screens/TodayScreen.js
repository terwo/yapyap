// src/screens/TodayScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TodayScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Today Screen</Text>
            <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        marginBottom: 20
    }
});

export default TodayScreen;
