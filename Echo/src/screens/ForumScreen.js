import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import JournalCard from '../components/JournalCard';

const ForumScreen = () => {
    const [forumPosts, setForumPosts] = useState([]);

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
        <ScrollView style={styles.container}>
            {Array.isArray(forumPosts) && forumPosts.map((post, index) => (
                <JournalCard key={index} entry={post} handleEmojiPress={handleEmojiPress} />
            ))}
        </ScrollView>
    );
};

// Styles for ForumScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    // Additional styles if needed
});

export default ForumScreen;

