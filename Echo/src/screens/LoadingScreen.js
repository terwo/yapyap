// src/screens/ProfileScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hold on tight while we do our thing...</Text>
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
        fontSize: 20
    }
});

export default LoadingScreen;
