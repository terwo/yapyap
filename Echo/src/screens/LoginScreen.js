// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { useUser } from "../context/UserContext";
import login from "../../assets/images/loginscreen/login.png";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const loginBut = () => {
    navigation.navigate("Forum");
  };

  const createBut = () => {
    navigation.navigate("Today");
  };

  // const handleLogin = async () => {
  //     try {
  //         console.log('Attempting to log in'); // Debugging log
  //         const response = await fetch(`https://b18hhn83c8.execute-api.us-west-2.amazonaws.com/Prod/profile-read?username=${username}&password=${password}`, {
  //             method: 'GET',
  //             headers: { 'Content-Type': 'application/json' },

  //         });
  //         console.log(response.status)
  //         if (response.ok) {
  //             userData = await response.json();
  //             // IMPORTANT: user context will NOT have password available
  //             setUser({ user_id: userData.user_id, username: userData.username });
  //         } else {
  //             throw new Error('Login failed');
  //         }
  //         const id = userData.user_id;
  //         console.log('Seeing if user has made a post today or not');
  //         const posted = await fetch(`https://b18hhn83c8.execute-api.us-west-2.amazonaws.com/Prod/forum?user_id=${id}`, {
  //             method: 'GET',
  //             headers: { 'Content-Type': 'application/json' },
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

  // const handleRegister = async () => {
  //     try {
  //         console.log('Attempting to create an account');
  //         const response = await fetch('https://b18hhn83c8.execute-api.us-west-2.amazonaws.com/Prod/profile-create', {
  //             method: 'POST',
  //             headers: { 'Content-Type': 'application/json' },
  //             body: JSON.stringify({ username: username, password: password }),
  //         });
  //         if (response.ok) {
  //             userData = await response.json();
  //             setUser({ id: userData.user_id, username: username });
  //             navigation.navigate('Today');
  //         } else {
  //             throw new Error('Account creation failed');
  //         }
  //         // console.log('Response:', data);
  //         // navigation.navigate('Today');
  //     } catch (error) {
  //         console.error('Account Creation Error:', error);
  //     }
  // };

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={login} style={styles.logo} />
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
          <TouchableOpacity onPress={loginBut}>
            <View style={styles.login}>
              <Text style={styles.loginText}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={createBut}>
            <View style={styles.create}>
              <Text style={styles.createText}>Create an Account</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
    marginTop: 60,
    width: 165,
    maxWidth: "100%",
    aspectRatio: 0.96,
  },
  header: {
    textAlign: "center",
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 40,
  },
  headerText: {
    fontSize: 40,
    fontFamily: "NunitoBold",
  },
  input: {
    borderRadius: 20,
    backgroundColor: "#F8F8F8",
    marginTop: 12,
    padding: 20,
    fontFamily: "Nunito",
  },
  inputs: {
    gap: 20,
  },
  login: {
    textAlign: "center",
    borderRadius: 30,
    backgroundColor: "#F28D62",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 22,
  },
  create: {
    textAlign: "center",
    borderRadius: 30,
    backgroundColor: "#FBFBFB",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 22,
  },
  buttons: {
    gap: 20,
  },
  fulllogin: {
    gap: 80,
  },
  loginText: {
    fontFamily: "NunitoBold",
  },
  createText: {
    fontFamily: "NunitoBold",
  },
});

export default LoginScreen;
