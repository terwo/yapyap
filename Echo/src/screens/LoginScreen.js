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

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>H1 Title</Text>
            </View>
            <Button title="Go to Today" onPress={() => navigation.navigate('Today')} />
            <View style={styles.login}>
                <Text style={styles.loginText}>Login</Text>
            </View>
            <View style={styles.createAccount}>
                <Text style={styles.createAccountText}>Create Account</Text>
            </View>
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
