import React, { useState, useEffect } from 'react';
import { Pressable, FlatList, ScrollView, View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import JournalCard from '../components/JournalCard';
import { useUser } from '../context/UserContext.js'; // Adjust this path to the correct location


import icon from '../../assets/images/todayscreen/icon.png';
import logo from '../../assets/images/todayscreen/logo.png';

const ForumScreen = ({ navigation }) => {

    const forumPosts = [
        { avatar: "pig", date: '2021-10-01', image: "../../assets/images/happy.png", emotion: 'Happy', content: 'I am happy today', emojiCount: 0 },
        { avatar: "bunny", date: '2021-10-02', image: "../../assets/images/sad.png", emotion: 'Sad', content: 'I am sad today', emojiCount: 0 },
        { avatar: "penguin", date: '2021-10-03', image: "../../assets/images/angry.png", emotion: 'Angry', content: 'I am angry today', emojiCount: 0 },
        { avatar: "duck", date: '2021-10-04', image: "../../assets/images/neutral.png", emotion: 'Neutral', content: 'Im just feeling whatever today', emojiCount: 0 },
        { avatar: "pig", date: '2021-10-05', image: "../../assets/images/happy.png", emotion: 'Fear', content: 'That was really scary', emojiCount: 0 },
    ];
    // const [forumPosts, setForumPosts] = useState([]);

    // const { user } = useUser();
    // console.log('User:', user)
    // console.log('User ID:', user.id)

    const goProfile = () => {
        navigation.navigate('Profile')
    }

    const goNotifications = () => {
        navigation.navigate('Notifications')
    }

    // user.id = 0

    // useEffect(() => {
    //     const fetchForumPosts = async () => {
    //         try {
    //             user.id += 1
    //             const response = await fetch(`https://b18hhn83c8.execute-api.us-west-2.amazonaws.com/Prod/forum?user_id=${user.id}`, {
    //                 method: 'GET',
    //                 headers: { 'Content-Type': 'application/json' },
    //             });
    //             const data = await response.json();
    //             setForumPosts(data.posts || []); // Set to empty array if posts are undefined
    //         } catch (error) {
    //             console.error('Error fetching forum posts:', error);
    //         }
    //     };

    //     fetchForumPosts();
    // }, []);

    const handleEmojiPress = (postId, emojiType) => {
        // Implement the emoji press handling logic here
    };

    // const avatarMap = {
    //     pig: require('../../assets/images/avatars/pig.png'),
    //     bunny: require('../../assets/images/avatars/bunny.png'),
    //     penguin: require('../../assets/images/avatars/penguin.png'),
    //     duck: require('../../assets/images/avatars/duck.png'),
    // };

    // const getAvatarSource = (animalName) => {
    //     return avatarMap[animalName]
    // };

    return (


        <ScrollView
            style={styles.container}
            stickyHeaderIndices={[0]}>


            <View>

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

            </View>

            

            {forumPosts.map((post, index) => (
                <JournalCard key={index} entry={post} handleEmojiPress={handleEmojiPress} />
            ))}
        </ScrollView>
    );
};

// Styles for ForumScreen
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        width: "100%",
        height: "100%",
    },
    header: {
        paddingTop: 40,
        width: "100%",
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        alignSelf: "center",
        borderBottomWidth: 2,
        borderBottomColor: "#F9F9F9",
        gap: 100,
        paddingBottom: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },

    // Additional styles if needed
});

export default ForumScreen;

