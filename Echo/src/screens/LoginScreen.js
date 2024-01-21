import * as React from "react";
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

import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as Random from 'expo-random';

const LoginScreen = ({ navigation }) => {



    // // Configurations for Auth0
    // const auth0ClientId = 'g2B3Ebz84Lqqt8ox7dw2J2wCRxfSaLxC'; // Replace with your Auth0 client ID
    // const auth0Domain = 'echo-dev.us.auth0.com'; // Replace with your Auth0 domain

    // // Construct the authorization request
    // const [request, response, promptAsync] = useAuthRequest({
    //     redirectUri: makeRedirectUri({
    //         // For development, the scheme will be 'exp'
    //         native: 'yourapp://redirect', // Replace with your app's redirect scheme
    //     }),
    //     clientId: auth0ClientId,
    //     responseType: 'id_token', // Token response type
    //     scopes: ['openid', 'profile', 'email'], // Scopes
    //     extraParams: {
    //         nonce: getRandomNonce(), // A randomly generated nonce for security
    //     },
    // }, {
    //     authorizationEndpoint: `${auth0Domain}/authorize`, // Auth0 authorization endpoint
    // });

    // // Random nonce generator
    // function getRandomNonce() {
    //     return Random.getRandomBytes(16).toString('hex');
    // }

    // // Handle the authentication response
    // React.useEffect(() => {
    //     if (response?.type === 'success') {
    //         const { id_token } = response.params;
    //         // TODO: Handle the ID token (validate, extract user data, etc.)
    //         // Navigate to the next screen or update the user context
    //     }
    // }, [response]);

    // return (
    //     <View style={styles.container}>
    //         <View style={styles.header}>
    //             <Text style={styles.headerText}>H1 Title</Text>
    //         </View>
    //         <Button title="Login with Auth0" onPress={() => promptAsync()} disabled={!request} />
    //         {/* Other UI components */}
    //     </View>
    // );
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
        color: "#271E53",
        textAlign: "center",
        letterSpacing: 1,
        textTransform: "uppercase",
        fontWeight: "bold",
        alignSelf: "center",
        fontFamily: "Nunito, sans-serif",
        fontSize: 40,
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
