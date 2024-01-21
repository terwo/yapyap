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
import { useFonts } from 'expo-font';


import login from '../../assets/images/loginscreen/login.png';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fontsLoaded, fontError] = useFonts({
        'Nunito': require('../../assets/fonts/Nunito-Regular.ttf'),
    });

    const handleLogin = async () => {
        try {
            console.log('Attempting to log in'); // Debugging log
            const response = await fetch('https://b18hhn83c8.execute-api.us-west-2.amazonaws.com/Prod/profile-read', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            const user_id = data.user_id;
            console.log('Seeing if user has made a post today or not');
            const posted = await fetch('https://b18hhn83c8.execute-api.us-west-2.amazonaws.com/Prod/forum', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ user_id }),
            });
            console.log('Response:', posted.status)
            if (posted.ok) {
                console.log('User has made a post today, go to forum page');
                navigation.navigate('Forum');
            } else {
                console.log('User has not made a post today, go to Today page');
                navigation.navigate('Today');
            }
            // // if (data.token) {
            // //     await AsyncStorage.setItem('userToken', data.token);
            // //     // Navigate to your main app screen
            // //     navigation.navigate('Today');
            // // }
            // navigation.navigate('Today');
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

            <Image
                resizeMode="contain"
                source={login}
                style={styles.logo}
            />

            <View style={styles.header}>
                <Text style={styles.headerText}>yapyap</Text>
            </View>

            <View style={styles.fulllogin}>

                <View style={styles.inputs}>
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
                </View>


                <View style={styles.buttons}>

                    <TouchableOpacity onPress={handleLogin}>
                        <View style={styles.login}>
                            <Text style={styles.loginText}>Login</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleRegister}>
                        <View style={styles.create}>
                            <Text style={styles.createText}>Create an Account</Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        width: "100%",
        height: "100%",
        padding: 50,
    },
    logo: {
        overflow: "hidden",
        alignSelf: "center",
        position: "relative",
        display: "flex",
        marginTop: 60,
        width: 165,
        maxWidth: "100%",
        flexDirection: "column",
        aspectRatio: "0.96",
    },
    header: {
        color: "black",
        textAlign: "center",
        alignSelf: "center",
        marginTop: 16,
        whiteSpace: "nowrap",
        fontFamily: "Nunito",
        marginBottom: 40,
    },
    headerText: {
        fontSize: 40,
        fontFamily: "Nunito",
    },

    input: {
        // color: "var(--black, #000C34)",
        justifyContent: "center",
        alignItems: "stretch",
        borderRadius: 20,
        backgroundColor: "#F8F8F8",
        marginTop: 12,
        padding: 20,
        fontFamily: "Nunito",
    },
    //   button: {
    //     color: "var(--Black, #271E53)",
    //     textAlign: "center",
    //     leadingTrim: "both",
    //     textEdge: "cap",
    //     fontVariantNumeric: "lining-nums tabular-nums",
    //     borderRadius: 30,
    //     backgroundColor: "#F28D62",
    //     marginTop: 118,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     padding: "15px 60px",
    //     font: "400 22px/127% Nunito, sans-serif ",
    //   },

    inputs: {
        gap: 20,
    },

    login: {
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
    },

    create: {
        color: "black",
        textAlign: "center",
        borderRadius: 30,
        backgroundColor: "#FBFBFB",
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
        //   margin: "151px 0 7px",
        paddingTop: 12,
        paddingBottom: 12,
        fontSize: 22,
    },

    buttons: {
        gap: 20,
    },

    fulllogin: {
        gap: 80,
    }
});
