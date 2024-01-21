import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import JournalCard from '../components/JournalCard'; // Assuming this is the correct path
import pig from '../../assets/images/avatars/pig.png'
import happy from '../../assets/images/emotions/happy.png'
import muchlove from '../../assets/images/reactions/muchlove.png'
import babel from '../../assets/images/reactions/babel.config.png'
import samehere from '../../assets/images/reactions/samehere.png'
import staystrong from '../../assets/images/reactions/staystrong.png'
import youdeserveit from '../../assets/images/reactions/youdeserveit.png'
const ProfileScreen = () => {
    const journalEntries = [
        {
            title: 'Entry 1', date: '2023-01-01', content: 'Content for entry 1 and i dna;ejiahsdfhuhauif uawehfe hoafosdfasdfasdfjaklsjdfkladsjfkjkl;asjfkljsakdjsdlfjkadjsf fjdsklaf;js lakfjsklf js fldjsl fjkds fklj slkf',
            avatar: '../../assets/images/avatars/pig.png', emotion: 'happy'
        }
    ];



    const handleEmojiPress = async (entryId, emojiType) => {
        try {
            const response = await fetch(`https://yourapi.com/entries/${entryId}/reactions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emojiType }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            // Handle successful reaction update...
        } catch (error) {
            console.error('Error updating reaction:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.avatarContainer}>
                <Avatar
                    size="large"
                    rounded
                    source={require('../../assets/images/avatars/pig.png')}
                    containerStyle={styles.avatar}
                />
                <Text style={styles.username}>YapperBear</Text>
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