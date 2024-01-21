import React, { useState } from 'react';
import {
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

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            console.log('Attempting to log in'); // Debugging log
            const response = await fetch('https://b18hhn83c8.execute-api.us-west-2.amazonaws.com/Prod/profile-create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            console.log('Response:', data);
            // if (data.token) {
            //     await AsyncStorage.setItem('userToken', data.token);
            //     // Navigate to your main app screen
            //     navigation.navigate('Today');
            // }
            navigation.navigate('Today');
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    const handleRegister = async () => {
        try {
            console.log('Attempting to create an account'); // Debugging log
            // change api endpoint below
            const response = await fetch('https://b18hhn83c8.execute-api.us-west-2.amazonaws.com/Prod/profile-create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            console.log('Response:', data);
            // if (data.token) {
            //     await AsyncStorage.setItem('userToken', data.token);
            //     // Navigate to your main app screen
            //     navigation.navigate('Today');
            // }
            navigation.navigate('Today');
        } catch (error) {
            console.error('Account Creation Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome to EchoYap</Text>
            </View>

            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            <Button title="Login" onPress={handleLogin} />
            <Button title="Create an Account" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        display: "flex",
        flex: 1,
        maxWidth: 480,
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        marginHorizontal: "auto",
        //   paddingBottom: 50,
        //   paddingHorizontal: 60,
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    headerText: {
        color: "#271E53", // Changed from CSS custom property to a hard-coded value
        textAlign: "center",
        letterSpacing: 1,
        textTransform: "uppercase",
        fontWeight: "bold",
        alignSelf: "center",
        fontFamily: "Nunito, sans-serif", // Make sure this font is imported or change it to a default font
        fontSize: 40,
    },
    input: {
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    login: {
        color: "black",
        textAlign: "center",
        letterSpacing: "1px",
        fontVariantNumeric: "lining-nums tabular-nums",
        alignSelf: "center",
        fontFamily: "Nunito, sans-serif",
        fontSize: 22,
    },
    loginText: {
    },
    createAccount: {
        color: "black",
        textAlign: "center",
        letterSpacing: "1px",
        fontVariantNumeric: "lining-nums tabular-nums",
        whiteSpace: "nowrap",
        fontFamily: "Nunito, sans-serif",
        fontSize: 22,
    },
    createAccountText: {
    },
});

export default LoginScreen;