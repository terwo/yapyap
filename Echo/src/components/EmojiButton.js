import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const EmojiButton = ({ emojiImage, count, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image source={emojiImage} style={styles.image} />
            <Text style={styles.count}>{count}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: 5,
    },
    image: {
        width: 30,
        height: 30,
    },
    count: {
        fontSize: 14,
        marginTop: 2,
    },
    // Add additional styling as needed
});

export default EmojiButton;
