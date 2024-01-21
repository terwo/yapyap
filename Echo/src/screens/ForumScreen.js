import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import JournalCard from '../components/JournalCard';

const ForumScreen = () => {
    const [forumPosts, setForumPosts] = useState([]);

    useEffect(() => {
        // Fetch forum posts from the backend
    }, []);

    return (
        <ScrollView style={styles.container}>
            {forumPosts.map((post, index) => (
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
