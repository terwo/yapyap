import React, { useState, useEffect } from 'react';
import { Pressable, FlatList, ScrollView, View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import JournalCard from '../components/JournalCard';

import icon from '../../assets/images/todayscreen/icon.png';
import logo from '../../assets/images/todayscreen/logo.png';

const ForumScreen = ({ navigation }) => {
    const [forumPosts, setForumPosts] = useState([]);


    const goProfile = () => {
        navigation.navigate('Profile')
    }

    const goNotifications = () => {
        navigation.navigate('Results')
    }

    useEffect(() => {
        const fetchForumPosts = async () => {
            try {
                const response = await fetch('https://b18hhn83c8.execute-api.us-west-2.amazonaws.com/Prod/forum');
                const data = await response.json();
                setForumPosts(data.posts || []); // Set to empty array if posts are undefined
            } catch (error) {
                console.error('Error fetching forum posts:', error);
            }
        };

        fetchForumPosts();
    }, []);

    const handleEmojiPress = (postId, emojiType) => {
        // Implement the emoji press handling logic here
    };

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
        // padding: 50,
    },
    header: {
        alignContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        // position: "absolute",
        alignSelf: "center",
        gap: 100,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        lineHeight: 122,
    },

    // Additional styles if needed
});

export default ForumScreen;

