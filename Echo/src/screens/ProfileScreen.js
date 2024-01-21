import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import JournalCard from '../components/JournalCard'; // Assuming this is the correct path
import { useUser } from '../context/UserContext.js';

const ProfileScreen = () => {
    const [journalEntries, setJournalEntries] = useState([]);

    const { user } = useUser();

    const profile = null; // keep profile as a global var in this function

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`https://b18hhn83c8.execute-api.us-west-2.amazonaws.com/Prod/profile-read?user_id=${user.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                profile = await response.json();
                console.log('Response status:' + response.status);
                setJournalEntries(data.posts); // Assuming user has journalEntries
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleEmojiPress = async (entryId, emojiType) => {
        try {
            const response = await fetch(`https://b18hhn83c8.execute-api.us-west-2.amazonaws.com/Prod/react`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emojiType }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            // TODO Handle successful reaction update...
        } catch (error) {
            console.error('Error updating reaction:', error);
        }
    };

    const avatarMap = {
        pig: require('../../assets/images/avatars/pig.png'),
        bunny: require('../../assets/images/avatars/bunny.png'),
        penguin: require('../../assets/images/avatars/penguin.png'),
        duck: require('../../assets/images/avatars/duck.png'),
    };

    const getAvatarSource = (animalName) => {
        return avatarMap[animalName]
    };

    if (!user) {
        return <Text>Loading...</Text>; // Or any other loading state representation
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.avatarContainer}>
                <Avatar
                    size="large"
                    rounded
                    source={getAvatarSource(profile.avatar)}
                    containerStyle={styles.avatar}
                />
                <Text style={styles.username}>{user.username}</Text>
            </View>
            {journalEntries.map((entry, index) => (
                <JournalCard
                    key={index}
                    entry={entry}
                    handleEmojiPress={handleEmojiPress}
                />
            ))}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatar: {
        marginBottom: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardText: {
        marginBottom: 10,
    },
    cardContainer: {
        borderRadius: 10, // Rounded corners for the card
    },
    imageDescription: {
        fontFamily: 'Nunito, sans-serif',
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontFamily: 'Nunito, sans-serif',
        fontSize: 16,
    },
    cardImage: {
        // width: 'auto',
        // height: 100,
        // do this robbie
        aspectRatio: 0.5,
        resizeMode: 'cover',
    },
    contentText: {
        fontFamily: 'Nunito, sans-serif',
        marginVertical: 10,
    },
    emojiContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    emojiCount: {
    }
    // Additional styles...
});

export default ProfileScreen;