import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { STORIES } from '@/constants/mock-data';

type StoryProps = {
    story: typeof STORIES[0];
};

export default function Story({ story }: StoryProps) {
    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.storyRing,
                    { borderColor: story.hasStory ? '#1DA1F2' : '#ccc' },
                ]}
            >
                <Image source={{ uri: story.image }} style={styles.image} />
            </View>
            <Text style={styles.username}>{story.username}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        alignItems: 'center',
    },
    storyRing: {
        borderWidth: 2,
        borderRadius: 40,
        padding: 2,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    username: {
        marginTop: 4,
        fontSize: 12,
        color: '#fff',
    },
});
