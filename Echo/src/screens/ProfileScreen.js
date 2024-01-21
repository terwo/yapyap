import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image, EmojiButton } from 'react-native';
import { Avatar, Card } from 'react-native-elements';

const ProfileScreen = () => {
    const journalEntries = [
        { title: 'Entry 1', date: '2023-01-01', content: 'Content for entry 1 and i dna;ejiahsdfhuhauif uawehfe hoafosdfasdfasdfjaklsjdfkladsjfkjkl;asjfkljsakdjsdlfjkadjsf fjdsklaf;js lakfjsklf js fldjsl fjkds fklj slkf' },
        // more entries...
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.avatarContainer}>
                <Avatar
                    size="large"
                    rounded
                    source={{ uri: "https://your-avatar-url.jpg" }}
                    containerStyle={styles.avatar}
                />
                <Text style={styles.username}>YapperBear</Text>
            </View>

            {journalEntries.map((entry, index) => (
                <Card key={index} containerStyle={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                        <Avatar size="small" rounded source={{ uri: "https://your-avatar-url.jpg" }} />
                        <Text style={styles.dateText}>{entry.date}</Text>
                    </View>
                    <Image source={{ uri: entry.imageUrl }} style={styles.cardImage} />
                    <Text style={styles.contentText}>{entry.content}</Text>
                    <View style={styles.emojiContainer}>
                        <EmojiButton emoji="😀" />
                        <EmojiButton emoji="😢" />
                        <EmojiButton emoji="😠" />
                        <EmojiButton emoji="😍" />
                        <EmojiButton emoji="👍" />
                    </View>
                </Card>
            ))}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: '100%',
        height: 200,
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
    // Additional styles...
});

export default ProfileScreen;
